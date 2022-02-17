// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

/* global window */
import * as gax from 'google-gax';
import {Callback, CallOptions, Descriptors, ClientOptions, PaginationCallback, GaxCall} from 'google-gax';

import { Transform } from 'stream';
import { RequestType } from 'google-gax/build/src/apitypes';
import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v1/executions_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './executions_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Executions is used to start and manage running instances of
 *  {@link google.cloud.workflows.v1.Workflow|Workflows} called executions.
 * @class
 * @memberof v1
 */
export class ExecutionsClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _providedCustomServicePath: boolean;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  warn: (code: string, message: string, warnType?: string) => void;
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  executionsStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of ExecutionsClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean} [options.fallback] - Use HTTP fallback mode.
   *     In fallback mode, a special browser-compatible transport implementation is used
   *     instead of gRPC transport. In browser context (if the `window` object is defined)
   *     the fallback mode is enabled automatically; set `options.fallback` to `false`
   *     if you need to override this behavior.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof ExecutionsClient;
    const servicePath = opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    this._providedCustomServicePath = !!(opts?.servicePath || opts?.apiEndpoint);
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback = opts?.fallback ?? (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = (this._gaxGrpc.auth as gax.GoogleAuth);

    // Set useJWTAccessWithScope on the auth object.
    this.auth.useJWTAccessWithScope = true;

    // Set defaultServicePath on the auth object.
    this.auth.defaultServicePath = staticMembers.servicePath;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [
      `gax/${this._gaxModule.version}`,
      `gapic/${version}`,
    ];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else if (opts.fallback === 'rest' ) {
      clientHeader.push(`rest/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      executionPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}'
      ),
      workflowPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/workflows/{workflow}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this.descriptors.page = {
      listExecutions:
          new this._gaxModule.PageDescriptor('pageToken', 'nextPageToken', 'executions')
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
        'google.cloud.workflows.executions.v1.Executions', gapicConfig as gax.ClientConfig,
        opts.clientConfig || {}, {'x-goog-api-client': clientHeader.join(' ')});

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};

    // Add a warn function to the client constructor so it can be easily tested.
    this.warn = gax.warn;
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.executionsStub) {
      return this.executionsStub;
    }

    // Put together the "service stub" for
    // google.cloud.workflows.executions.v1.Executions.
    this.executionsStub = this._gaxGrpc.createStub(
        this._opts.fallback ?
          (this._protos as protobuf.Root).lookupService('google.cloud.workflows.executions.v1.Executions') :
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.workflows.executions.v1.Executions,
        this._opts, this._providedCustomServicePath) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const executionsStubMethods =
        ['listExecutions', 'createExecution', 'getExecution', 'cancelExecution'];
    for (const methodName of executionsStubMethods) {
      const callPromise = this.executionsStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error|null|undefined) => () => {
          throw err;
        });

      const descriptor =
        this.descriptors.page[methodName] ||
        undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.executionsStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'workflowexecutions.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'workflowexecutions.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform'
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(callback?: Callback<string, undefined, undefined>):
      Promise<string>|void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
/**
 * Creates a new execution using the latest revision of the given workflow.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. Name of the workflow for which an execution should be created.
 *   Format: projects/{project}/locations/{location}/workflows/{workflow}
 *   The latest revision of the workflow will be used.
 * @param {google.cloud.workflows.executions.v1.Execution} request.execution
 *   Required. Execution to be created.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Execution]{@link google.cloud.workflows.executions.v1.Execution}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1/executions.create_execution.js</caption>
 * region_tag:workflowexecutions_v1_generated_Executions_CreateExecution_async
 */
  createExecution(
      request?: protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.workflows.executions.v1.IExecution,
        protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest|undefined, {}|undefined
      ]>;
  createExecution(
      request: protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest|null|undefined,
          {}|null|undefined>): void;
  createExecution(
      request: protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest,
      callback: Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest|null|undefined,
          {}|null|undefined>): void;
  createExecution(
      request?: protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.workflows.executions.v1.IExecution,
        protos.google.cloud.workflows.executions.v1.ICreateExecutionRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.createExecution(request, options, callback);
  }
/**
 * Returns an execution of the given name.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.name
 *   Required. Name of the execution to be retrieved.
 *   Format:
 *   projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}
 * @param {google.cloud.workflows.executions.v1.ExecutionView} [request.view]
 *   Optional. A view defining which fields should be filled in the returned execution.
 *   The API will default to the FULL view.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Execution]{@link google.cloud.workflows.executions.v1.Execution}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1/executions.get_execution.js</caption>
 * region_tag:workflowexecutions_v1_generated_Executions_GetExecution_async
 */
  getExecution(
      request?: protos.google.cloud.workflows.executions.v1.IGetExecutionRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.workflows.executions.v1.IExecution,
        protos.google.cloud.workflows.executions.v1.IGetExecutionRequest|undefined, {}|undefined
      ]>;
  getExecution(
      request: protos.google.cloud.workflows.executions.v1.IGetExecutionRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.IGetExecutionRequest|null|undefined,
          {}|null|undefined>): void;
  getExecution(
      request: protos.google.cloud.workflows.executions.v1.IGetExecutionRequest,
      callback: Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.IGetExecutionRequest|null|undefined,
          {}|null|undefined>): void;
  getExecution(
      request?: protos.google.cloud.workflows.executions.v1.IGetExecutionRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.IGetExecutionRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.IGetExecutionRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.workflows.executions.v1.IExecution,
        protos.google.cloud.workflows.executions.v1.IGetExecutionRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'name': request.name || '',
    });
    this.initialize();
    return this.innerApiCalls.getExecution(request, options, callback);
  }
/**
 * Cancels an execution of the given name.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.name
 *   Required. Name of the execution to be cancelled.
 *   Format:
 *   projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Execution]{@link google.cloud.workflows.executions.v1.Execution}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1/executions.cancel_execution.js</caption>
 * region_tag:workflowexecutions_v1_generated_Executions_CancelExecution_async
 */
  cancelExecution(
      request?: protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.workflows.executions.v1.IExecution,
        protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest|undefined, {}|undefined
      ]>;
  cancelExecution(
      request: protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest|null|undefined,
          {}|null|undefined>): void;
  cancelExecution(
      request: protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest,
      callback: Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest|null|undefined,
          {}|null|undefined>): void;
  cancelExecution(
      request?: protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.workflows.executions.v1.IExecution,
          protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.workflows.executions.v1.IExecution,
        protos.google.cloud.workflows.executions.v1.ICancelExecutionRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'name': request.name || '',
    });
    this.initialize();
    return this.innerApiCalls.cancelExecution(request, options, callback);
  }

 /**
 * Returns a list of executions which belong to the workflow with
 * the given name. The method returns executions of all workflow
 * revisions. Returned executions are ordered by their start time (newest
 * first).
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. Name of the workflow for which the executions should be listed.
 *   Format: projects/{project}/locations/{location}/workflows/{workflow}
 * @param {number} request.pageSize
 *   Maximum number of executions to return per call.
 *   Max supported value depends on the selected Execution view: it's 10000 for
 *   BASIC and 100 for FULL. The default value used if the field is not
 *   specified is 100, regardless of the selected view. Values greater than
 *   the max value will be coerced down to it.
 * @param {string} request.pageToken
 *   A page token, received from a previous `ListExecutions` call.
 *   Provide this to retrieve the subsequent page.
 *
 *   When paginating, all other parameters provided to `ListExecutions` must
 *   match the call that provided the page token.
 * @param {google.cloud.workflows.executions.v1.ExecutionView} [request.view]
 *   Optional. A view defining which fields should be filled in the returned executions.
 *   The API will default to the BASIC view.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is Array of [Execution]{@link google.cloud.workflows.executions.v1.Execution}.
 *   The client library will perform auto-pagination by default: it will call the API as many
 *   times as needed and will merge results from all the pages into this array.
 *   Note that it can affect your quota.
 *   We recommend using `listExecutionsAsync()`
 *   method described below for async iteration which you can stop as needed.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
 *   for more details and examples.
 */
  listExecutions(
      request?: protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.workflows.executions.v1.IExecution[],
        protos.google.cloud.workflows.executions.v1.IListExecutionsRequest|null,
        protos.google.cloud.workflows.executions.v1.IListExecutionsResponse
      ]>;
  listExecutions(
      request: protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
      options: CallOptions,
      callback: PaginationCallback<
          protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
          protos.google.cloud.workflows.executions.v1.IListExecutionsResponse|null|undefined,
          protos.google.cloud.workflows.executions.v1.IExecution>): void;
  listExecutions(
      request: protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
      callback: PaginationCallback<
          protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
          protos.google.cloud.workflows.executions.v1.IListExecutionsResponse|null|undefined,
          protos.google.cloud.workflows.executions.v1.IExecution>): void;
  listExecutions(
      request?: protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
      optionsOrCallback?: CallOptions|PaginationCallback<
          protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
          protos.google.cloud.workflows.executions.v1.IListExecutionsResponse|null|undefined,
          protos.google.cloud.workflows.executions.v1.IExecution>,
      callback?: PaginationCallback<
          protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
          protos.google.cloud.workflows.executions.v1.IListExecutionsResponse|null|undefined,
          protos.google.cloud.workflows.executions.v1.IExecution>):
      Promise<[
        protos.google.cloud.workflows.executions.v1.IExecution[],
        protos.google.cloud.workflows.executions.v1.IListExecutionsRequest|null,
        protos.google.cloud.workflows.executions.v1.IListExecutionsResponse
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.listExecutions(request, options, callback);
  }

/**
 * Equivalent to `method.name.toCamelCase()`, but returns a NodeJS Stream object.
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. Name of the workflow for which the executions should be listed.
 *   Format: projects/{project}/locations/{location}/workflows/{workflow}
 * @param {number} request.pageSize
 *   Maximum number of executions to return per call.
 *   Max supported value depends on the selected Execution view: it's 10000 for
 *   BASIC and 100 for FULL. The default value used if the field is not
 *   specified is 100, regardless of the selected view. Values greater than
 *   the max value will be coerced down to it.
 * @param {string} request.pageToken
 *   A page token, received from a previous `ListExecutions` call.
 *   Provide this to retrieve the subsequent page.
 *
 *   When paginating, all other parameters provided to `ListExecutions` must
 *   match the call that provided the page token.
 * @param {google.cloud.workflows.executions.v1.ExecutionView} [request.view]
 *   Optional. A view defining which fields should be filled in the returned executions.
 *   The API will default to the BASIC view.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Stream}
 *   An object stream which emits an object representing [Execution]{@link google.cloud.workflows.executions.v1.Execution} on 'data' event.
 *   The client library will perform auto-pagination by default: it will call the API as many
 *   times as needed. Note that it can affect your quota.
 *   We recommend using `listExecutionsAsync()`
 *   method described below for async iteration which you can stop as needed.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
 *   for more details and examples.
 */
  listExecutionsStream(
      request?: protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
      options?: CallOptions):
    Transform{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    const defaultCallSettings = this._defaults['listExecutions'];
    const callSettings = defaultCallSettings.merge(options);
    this.initialize();
    return this.descriptors.page.listExecutions.createStream(
      this.innerApiCalls.listExecutions as gax.GaxCall,
      request,
      callSettings
    );
  }

/**
 * Equivalent to `listExecutions`, but returns an iterable object.
 *
 * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. Name of the workflow for which the executions should be listed.
 *   Format: projects/{project}/locations/{location}/workflows/{workflow}
 * @param {number} request.pageSize
 *   Maximum number of executions to return per call.
 *   Max supported value depends on the selected Execution view: it's 10000 for
 *   BASIC and 100 for FULL. The default value used if the field is not
 *   specified is 100, regardless of the selected view. Values greater than
 *   the max value will be coerced down to it.
 * @param {string} request.pageToken
 *   A page token, received from a previous `ListExecutions` call.
 *   Provide this to retrieve the subsequent page.
 *
 *   When paginating, all other parameters provided to `ListExecutions` must
 *   match the call that provided the page token.
 * @param {google.cloud.workflows.executions.v1.ExecutionView} [request.view]
 *   Optional. A view defining which fields should be filled in the returned executions.
 *   The API will default to the BASIC view.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Object}
 *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
 *   When you iterate the returned iterable, each element will be an object representing
 *   [Execution]{@link google.cloud.workflows.executions.v1.Execution}. The API will be called under the hood as needed, once per the page,
 *   so you can stop the iteration when you don't need more results.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1/executions.list_executions.js</caption>
 * region_tag:workflowexecutions_v1_generated_Executions_ListExecutions_async
 */
  listExecutionsAsync(
      request?: protos.google.cloud.workflows.executions.v1.IListExecutionsRequest,
      options?: CallOptions):
    AsyncIterable<protos.google.cloud.workflows.executions.v1.IExecution>{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    const defaultCallSettings = this._defaults['listExecutions'];
    const callSettings = defaultCallSettings.merge(options);
    this.initialize();
    return this.descriptors.page.listExecutions.asyncIterate(
      this.innerApiCalls['listExecutions'] as GaxCall,
      request as unknown as RequestType,
      callSettings
    ) as AsyncIterable<protos.google.cloud.workflows.executions.v1.IExecution>;
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified execution resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} workflow
   * @param {string} execution
   * @returns {string} Resource name string.
   */
  executionPath(project:string,location:string,workflow:string,execution:string) {
    return this.pathTemplates.executionPathTemplate.render({
      project: project,
      location: location,
      workflow: workflow,
      execution: execution,
    });
  }

  /**
   * Parse the project from Execution resource.
   *
   * @param {string} executionName
   *   A fully-qualified path representing Execution resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromExecutionName(executionName: string) {
    return this.pathTemplates.executionPathTemplate.match(executionName).project;
  }

  /**
   * Parse the location from Execution resource.
   *
   * @param {string} executionName
   *   A fully-qualified path representing Execution resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromExecutionName(executionName: string) {
    return this.pathTemplates.executionPathTemplate.match(executionName).location;
  }

  /**
   * Parse the workflow from Execution resource.
   *
   * @param {string} executionName
   *   A fully-qualified path representing Execution resource.
   * @returns {string} A string representing the workflow.
   */
  matchWorkflowFromExecutionName(executionName: string) {
    return this.pathTemplates.executionPathTemplate.match(executionName).workflow;
  }

  /**
   * Parse the execution from Execution resource.
   *
   * @param {string} executionName
   *   A fully-qualified path representing Execution resource.
   * @returns {string} A string representing the execution.
   */
  matchExecutionFromExecutionName(executionName: string) {
    return this.pathTemplates.executionPathTemplate.match(executionName).execution;
  }

  /**
   * Return a fully-qualified workflow resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} workflow
   * @returns {string} Resource name string.
   */
  workflowPath(project:string,location:string,workflow:string) {
    return this.pathTemplates.workflowPathTemplate.render({
      project: project,
      location: location,
      workflow: workflow,
    });
  }

  /**
   * Parse the project from Workflow resource.
   *
   * @param {string} workflowName
   *   A fully-qualified path representing Workflow resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromWorkflowName(workflowName: string) {
    return this.pathTemplates.workflowPathTemplate.match(workflowName).project;
  }

  /**
   * Parse the location from Workflow resource.
   *
   * @param {string} workflowName
   *   A fully-qualified path representing Workflow resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromWorkflowName(workflowName: string) {
    return this.pathTemplates.workflowPathTemplate.match(workflowName).location;
  }

  /**
   * Parse the workflow from Workflow resource.
   *
   * @param {string} workflowName
   *   A fully-qualified path representing Workflow resource.
   * @returns {string} A string representing the workflow.
   */
  matchWorkflowFromWorkflowName(workflowName: string) {
    return this.pathTemplates.workflowPathTemplate.match(workflowName).workflow;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    if (this.executionsStub && !this._terminated) {
      return this.executionsStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
