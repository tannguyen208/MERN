/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata'

/* eslint-disable no-prototype-builtins */
export type AcceptedType =
  | null
  | void
  | BooleanConstructor
  | NumberConstructor
  | StringConstructor
  | ObjectConstructor
  | (new (...args: unknown[]) => object)
  // Extended deserialization
  | DateConstructor
  | SymbolConstructor // Add ArrayBufferConstructor, MapConstructor, RegExpConstructor and many others...

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRecursiveArray<T> extends Array<IRecursiveArray<T> | T> {}

export type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>

/**
 * Class how help you deserialize object to classes.
 *
 * @export
 * @class Serializable
 */
export class Serializable {
  /**
   * Deserialize object from static method.
   *
   * Example:
   * const obj: MyObject = MyObject.fromJSON({...data});
   *
   * @static
   * @param {object} json
   * @returns {object}
   * @memberof Serializable
   */
  public static fromJSON<T extends Serializable>(this: new () => T, json: object): T {
    return new this().fromJSON(json)
  }

  /**
   * Fill property of current model by data from json.
   *
   * Example:
   * const obj: MyObject = new MyObject().fromJSON({...data});
   *
   * @param {object} json
   * @returns {this}
   * @memberof Serializable
   */
  public fromJSON(json: object): this {
    const unknownJson: unknown = json

    if (unknownJson === null || Array.isArray(unknownJson) || typeof unknownJson !== 'object') {
      this.onWrongType(String(unknownJson), 'is not object', unknownJson)
      return this
    }

    // eslint-disable-next-line guard-for-in
    for (const thisProp in this) {
      // Naming strategy and jsonName decorator
      let jsonProp: string = this.getJsonPropertyName(thisProp)

      // For deep copy
      if (!unknownJson?.hasOwnProperty(jsonProp) && unknownJson?.hasOwnProperty(thisProp)) {
        jsonProp = thisProp
      }

      if (
        unknownJson?.hasOwnProperty(jsonProp) &&
        this.hasOwnProperty(thisProp) &&
        Reflect.hasMetadata('ts-serializable:jsonTypes', this.constructor.prototype, thisProp)
      ) {
        const acceptedTypes: AcceptedTypes[] = Reflect.getMetadata(
          'ts-serializable:jsonTypes',
          this.constructor.prototype,
          thisProp
        ) as []
        const jsonValue: unknown = Reflect.get(unknownJson, jsonProp) as unknown
        const extractedValue = this.deserializeProperty(thisProp, acceptedTypes, jsonValue)
        Reflect.set(this, thisProp, extractedValue)
      }
    }

    return this
  }

  /**
   * Process serialization for @jsonIgnore decorator
   *
   * @returns {object}
   * @memberof Serializable
   */
  public toJSON(): Record<string, unknown> {
    const fromJson: this = {...this}
    const toJson: Record<string, unknown> = {}

    for (const prop in fromJson) {
      // Json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
      if (fromJson.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {
        if (Reflect.getMetadata('ts-serializable:jsonIgnore', this.constructor.prototype, prop) !== true) {
          const toProp = this.getJsonPropertyName(prop)
          Reflect.set(toJson, toProp, Reflect.get(fromJson, prop))
        }
      }
    }

    return toJson
  }

  /**
   * Process exceptions from wrong types.
   * By default just print warning in console, but can by override for drop exception or logging to backend.
   *
   * @protected
   * @param {string} prop
   * @param {string} message
   * @param {(unknown)} jsonValue
   * @memberof Serializable
   */
  protected onWrongType(prop: string, message: string, jsonValue: unknown): void {
    // eslint-disable-next-line no-console
    console.error(`${this.constructor.name}.fromJSON: json.${prop} ${message}:`, jsonValue)
  }

  /**
   * //todo: write jsdoc
   *
   * @private
   * @param {object} object
   * @param {string} prop
   * @param {AcceptedTypes[]} acceptedTypes
   * @param {(unknown)} jsonValue
   * @returns {(Object | null | void)}
   * @memberof Serializable
   */
  protected deserializeProperty(prop: string, acceptedTypes: AcceptedTypes[], jsonValue: unknown): unknown {
    for (const acceptedType of acceptedTypes) {
      // Type Symbol is not a property
      if (
        // Null
        acceptedType === null &&
        jsonValue === null
      ) {
        return null
      } else if (
        // Void, for deep copy classes only, json don't have void type
        acceptedType === void 0 &&
        jsonValue === void 0
      ) {
        return void 0
      } else if (
        // Boolean, Boolean
        acceptedType === Boolean &&
        (typeof jsonValue === 'boolean' || jsonValue instanceof Boolean)
      ) {
        return Boolean(jsonValue)
      } else if (
        // Number, Number
        acceptedType === Number &&
        (typeof jsonValue === 'number' || jsonValue instanceof Number)
      ) {
        return Number(jsonValue)
      } else if (
        // String, String
        acceptedType === String &&
        (typeof jsonValue === 'string' || jsonValue instanceof String)
      ) {
        return String(jsonValue)
      } else if (
        // Object, Object
        acceptedType === Object &&
        typeof jsonValue === 'object'
      ) {
        return Object(jsonValue)
      } else if (
        // Date
        acceptedType === Date &&
        (typeof jsonValue === 'string' || jsonValue instanceof String || jsonValue instanceof Date)
      ) {
        // 0 year, 0 month, 0 days, 0 hours, 0 minutes, 0 seconds
        let unicodeTime: number = new Date('0000-01-01T00:00:00.000').getTime()

        if (typeof jsonValue === 'string') {
          unicodeTime = Date.parse(jsonValue)
        } else if (jsonValue instanceof String) {
          unicodeTime = Date.parse(String(jsonValue))
        } else if (jsonValue instanceof Date) {
          unicodeTime = jsonValue.getTime()
        }
        if (isNaN(unicodeTime)) {
          // Preserve invalid time
          this.onWrongType(prop, 'is invalid date', jsonValue)
        }

        return new Date(unicodeTime)
      } else if (
        // Array
        Array.isArray(acceptedType) &&
        Array.isArray(jsonValue)
      ) {
        if (acceptedType[0] === void 0) {
          this.onWrongType(prop, 'invalid type', jsonValue)
        }

        return jsonValue.map((arrayValue: unknown) => this.deserializeProperty(prop, acceptedType, arrayValue))
      } else if (
        // Serializable
        acceptedType !== null &&
        acceptedType !== void 0 &&
        !Array.isArray(acceptedType) &&
        ((acceptedType && acceptedType.prototype) instanceof Serializable ||
          Boolean(Reflect.getMetadata('ts-serializable:jsonObjectExtended', acceptedType as Object))) &&
        jsonValue !== null &&
        jsonValue !== void 0 &&
        typeof jsonValue === 'object' &&
        !Array.isArray(jsonValue)
      ) {
        const TypeConstructor: new () => Serializable = acceptedType as new () => Serializable

        return new TypeConstructor().fromJSON(jsonValue)
      } else if (
        // Instance any other class, not Serializable, for parse from other classes instance
        acceptedType instanceof Function &&
        jsonValue instanceof acceptedType
      ) {
        return jsonValue
      }
    }

    // Process wrong type and return default value
    this.onWrongType(prop, 'is invalid', jsonValue)

    return Reflect.get(this, prop)
  }

  protected getJsonPropertyName(thisProperty: string): string {
    if (Reflect.hasMetadata('ts-serializable:jsonName', this.constructor.prototype, thisProperty)) {
      return Reflect.getMetadata('ts-serializable:jsonName', this.constructor.prototype, thisProperty) as string
    }

    return thisProperty
  }
}
