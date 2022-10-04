export interface IResponse<T = unknown> {
  success: boolean // With true=success, false=failure
  payload?: T //	Json results of the request. For a GET request will include the results. For a POST or PUT will include the unique id of the object.
  message?: string // Plain-text description of the result
  error?: unknown // Json element with any error messages or warnings
  _id?: string // ID of newly created object on POST
}
