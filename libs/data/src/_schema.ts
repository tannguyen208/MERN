import {Serializable} from './_serialization'

export class Schema<T> extends Serializable {
  _namespace!: string
  _value!: Partial<T>

  constructor(schemaValue: Partial<T>, classNamespace?: string) {
    super()

    this._value = schemaValue
    this._namespace = classNamespace || 'Schema<T>'
  }

  /**
   * Returns a map of all sObject names (keys) to sObject tokens (values) for the standard and custom objects defined in your organization.
   *
   * @return
   */
  getGlobalDescribe() {
    //
  }

  /**
   * Returns a list of the category groups associated with the specified objects.
   *
   * @param sObjectNames
   * @return
   */
  describeDataCategoryGroups(sObjectNames: any) {
    //
  }

  /**
   * Describes metadata (field list and object properties) for the specified sObject or array of sObjects.
   * Describes metadata such as field list and object properties for the specified list of SObjects.The default describe option for this method is SObjectDescribeOptions.DEFERRED, which indicates lazy initialization of describe attributes on first use.
   *
   * @param sObjectTypes
   * @param sObjectDescribeOptions
   * @return
   */
  describeSObjects(sObjectTypes: any, sObjectDescribeOptions: any) {
    //
  }

  /**
   * Returns information about the standard and custom apps available to the running user.
   */
  describeTabs() {
    //
  }

  /**
   * Returns available category groups along with their data category structure for objects specified in the request.
   *
   * @param pairs
   * @param topCategoriesOnly
   * @return
   */
  describeDataCategoryGroupStructures(pairs: any, topCategoriesOnly: any) {
    //
  }
}
