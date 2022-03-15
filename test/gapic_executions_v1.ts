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

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import {describe, it} from 'mocha';
import * as executionsModule from '../src';

import {PassThrough} from 'stream';

import {protobuf} from 'google-gax';

function generateSampleMessage<T extends object>(instance: T) {
  const filledObject = (
    instance.constructor as typeof protobuf.Message
  ).toObject(instance as protobuf.Message<T>, {defaults: true});
  return (instance.constructor as typeof protobuf.Message).fromObject(
    filledObject
  ) as T;
}

function stubSimpleCall<ResponseType>(response?: ResponseType, error?: Error) {
  return error
    ? sinon.stub().rejects(error)
    : sinon.stub().resolves([response]);
}

function stubSimpleCallWithCallback<ResponseType>(
  response?: ResponseType,
  error?: Error
) {
  return error
    ? sinon.stub().callsArgWith(2, error)
    : sinon.stub().callsArgWith(2, null, response);
}

function stubPageStreamingCall<ResponseType>(
  responses?: ResponseType[],
  error?: Error
) {
  const pagingStub = sinon.stub();
  if (responses) {
    for (let i = 0; i < responses.length; ++i) {
      pagingStub.onCall(i).callsArgWith(2, null, responses[i]);
    }
  }
  const transformStub = error
    ? sinon.stub().callsArgWith(2, error)
    : pagingStub;
  const mockStream = new PassThrough({
    objectMode: true,
    transform: transformStub,
  });
  // trigger as many responses as needed
  if (responses) {
    for (let i = 0; i < responses.length; ++i) {
      setImmediate(() => {
        mockStream.write({});
      });
    }
    setImmediate(() => {
      mockStream.end();
    });
  } else {
    setImmediate(() => {
      mockStream.write({});
    });
    setImmediate(() => {
      mockStream.end();
    });
  }
  return sinon.stub().returns(mockStream);
}

function stubAsyncIterationCall<ResponseType>(
  responses?: ResponseType[],
  error?: Error
) {
  let counter = 0;
  const asyncIterable = {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          if (error) {
            return Promise.reject(error);
          }
          if (counter >= responses!.length) {
            return Promise.resolve({done: true, value: undefined});
          }
          return Promise.resolve({done: false, value: responses![counter++]});
        },
      };
    },
  };
  return sinon.stub().returns(asyncIterable);
}

describe('v1.ExecutionsClient', () => {
  it('has servicePath', () => {
    const servicePath = executionsModule.v1.ExecutionsClient.servicePath;
    assert(servicePath);
  });

  it('has apiEndpoint', () => {
    const apiEndpoint = executionsModule.v1.ExecutionsClient.apiEndpoint;
    assert(apiEndpoint);
  });

  it('has port', () => {
    const port = executionsModule.v1.ExecutionsClient.port;
    assert(port);
    assert(typeof port === 'number');
  });

  it('should create a client with no option', () => {
    const client = new executionsModule.v1.ExecutionsClient();
    assert(client);
  });

  it('should create a client with gRPC fallback', () => {
    const client = new executionsModule.v1.ExecutionsClient({
      fallback: true,
    });
    assert(client);
  });

  it('has initialize method and supports deferred initialization', async () => {
    const client = new executionsModule.v1.ExecutionsClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    assert.strictEqual(client.executionsStub, undefined);
    await client.initialize();
    assert(client.executionsStub);
  });

  it('has close method for the initialized client', (done) => {
    const client = new executionsModule.v1.ExecutionsClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.initialize();
    assert(client.executionsStub);
    client.close().then(() => {
      done();
    });
  });

  it('has close method for the non-initialized client', (done) => {
    const client = new executionsModule.v1.ExecutionsClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    assert.strictEqual(client.executionsStub, undefined);
    client.close().then(() => {
      done();
    });
  });

  it('has getProjectId method', async () => {
    const fakeProjectId = 'fake-project-id';
    const client = new executionsModule.v1.ExecutionsClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.auth.getProjectId = sinon.stub().resolves(fakeProjectId);
    const result = await client.getProjectId();
    assert.strictEqual(result, fakeProjectId);
    assert((client.auth.getProjectId as SinonStub).calledWithExactly());
  });

  it('has getProjectId method with callback', async () => {
    const fakeProjectId = 'fake-project-id';
    const client = new executionsModule.v1.ExecutionsClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.auth.getProjectId = sinon
      .stub()
      .callsArgWith(0, null, fakeProjectId);
    const promise = new Promise((resolve, reject) => {
      client.getProjectId((err?: Error | null, projectId?: string | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(projectId);
        }
      });
    });
    const result = await promise;
    assert.strictEqual(result, fakeProjectId);
  });

  describe('createExecution', () => {
    it('invokes createExecution without error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.CreateExecutionRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.Execution()
      );
      client.innerApiCalls.createExecution = stubSimpleCall(expectedResponse);
      const [response] = await client.createExecution(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.createExecution as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes createExecution without error using callback', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.CreateExecutionRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.Execution()
      );
      client.innerApiCalls.createExecution =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.createExecution(
          request,
          (
            err?: Error | null,
            result?: protos.google.cloud.workflows.executions.v1.IExecution | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.createExecution as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes createExecution with error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.CreateExecutionRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.createExecution = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.createExecution(request), expectedError);
      assert(
        (client.innerApiCalls.createExecution as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes createExecution with closed client', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.CreateExecutionRequest()
      );
      request.parent = '';
      const expectedError = new Error('The client has already been closed.');
      client.close();
      await assert.rejects(client.createExecution(request), expectedError);
    });
  });

  describe('getExecution', () => {
    it('invokes getExecution without error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.GetExecutionRequest()
      );
      request.name = '';
      const expectedHeaderRequestParams = 'name=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.Execution()
      );
      client.innerApiCalls.getExecution = stubSimpleCall(expectedResponse);
      const [response] = await client.getExecution(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.getExecution as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes getExecution without error using callback', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.GetExecutionRequest()
      );
      request.name = '';
      const expectedHeaderRequestParams = 'name=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.Execution()
      );
      client.innerApiCalls.getExecution =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.getExecution(
          request,
          (
            err?: Error | null,
            result?: protos.google.cloud.workflows.executions.v1.IExecution | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.getExecution as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes getExecution with error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.GetExecutionRequest()
      );
      request.name = '';
      const expectedHeaderRequestParams = 'name=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.getExecution = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.getExecution(request), expectedError);
      assert(
        (client.innerApiCalls.getExecution as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes getExecution with closed client', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.GetExecutionRequest()
      );
      request.name = '';
      const expectedError = new Error('The client has already been closed.');
      client.close();
      await assert.rejects(client.getExecution(request), expectedError);
    });
  });

  describe('cancelExecution', () => {
    it('invokes cancelExecution without error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.CancelExecutionRequest()
      );
      request.name = '';
      const expectedHeaderRequestParams = 'name=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.Execution()
      );
      client.innerApiCalls.cancelExecution = stubSimpleCall(expectedResponse);
      const [response] = await client.cancelExecution(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.cancelExecution as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes cancelExecution without error using callback', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.CancelExecutionRequest()
      );
      request.name = '';
      const expectedHeaderRequestParams = 'name=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.Execution()
      );
      client.innerApiCalls.cancelExecution =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.cancelExecution(
          request,
          (
            err?: Error | null,
            result?: protos.google.cloud.workflows.executions.v1.IExecution | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.cancelExecution as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes cancelExecution with error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.CancelExecutionRequest()
      );
      request.name = '';
      const expectedHeaderRequestParams = 'name=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.cancelExecution = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.cancelExecution(request), expectedError);
      assert(
        (client.innerApiCalls.cancelExecution as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes cancelExecution with closed client', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.CancelExecutionRequest()
      );
      request.name = '';
      const expectedError = new Error('The client has already been closed.');
      client.close();
      await assert.rejects(client.cancelExecution(request), expectedError);
    });
  });

  describe('listExecutions', () => {
    it('invokes listExecutions without error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.ListExecutionsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = [
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
      ];
      client.innerApiCalls.listExecutions = stubSimpleCall(expectedResponse);
      const [response] = await client.listExecutions(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.listExecutions as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes listExecutions without error using callback', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.ListExecutionsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = [
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
      ];
      client.innerApiCalls.listExecutions =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.listExecutions(
          request,
          (
            err?: Error | null,
            result?:
              | protos.google.cloud.workflows.executions.v1.IExecution[]
              | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.listExecutions as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes listExecutions with error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.ListExecutionsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.listExecutions = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.listExecutions(request), expectedError);
      assert(
        (client.innerApiCalls.listExecutions as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes listExecutionsStream without error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.ListExecutionsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedResponse = [
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
      ];
      client.descriptors.page.listExecutions.createStream =
        stubPageStreamingCall(expectedResponse);
      const stream = client.listExecutionsStream(request);
      const promise = new Promise((resolve, reject) => {
        const responses: protos.google.cloud.workflows.executions.v1.Execution[] =
          [];
        stream.on(
          'data',
          (response: protos.google.cloud.workflows.executions.v1.Execution) => {
            responses.push(response);
          }
        );
        stream.on('end', () => {
          resolve(responses);
        });
        stream.on('error', (err: Error) => {
          reject(err);
        });
      });
      const responses = await promise;
      assert.deepStrictEqual(responses, expectedResponse);
      assert(
        (client.descriptors.page.listExecutions.createStream as SinonStub)
          .getCall(0)
          .calledWith(client.innerApiCalls.listExecutions, request)
      );
      assert.strictEqual(
        (
          client.descriptors.page.listExecutions.createStream as SinonStub
        ).getCall(0).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });

    it('invokes listExecutionsStream with error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.ListExecutionsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedError = new Error('expected');
      client.descriptors.page.listExecutions.createStream =
        stubPageStreamingCall(undefined, expectedError);
      const stream = client.listExecutionsStream(request);
      const promise = new Promise((resolve, reject) => {
        const responses: protos.google.cloud.workflows.executions.v1.Execution[] =
          [];
        stream.on(
          'data',
          (response: protos.google.cloud.workflows.executions.v1.Execution) => {
            responses.push(response);
          }
        );
        stream.on('end', () => {
          resolve(responses);
        });
        stream.on('error', (err: Error) => {
          reject(err);
        });
      });
      await assert.rejects(promise, expectedError);
      assert(
        (client.descriptors.page.listExecutions.createStream as SinonStub)
          .getCall(0)
          .calledWith(client.innerApiCalls.listExecutions, request)
      );
      assert.strictEqual(
        (
          client.descriptors.page.listExecutions.createStream as SinonStub
        ).getCall(0).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });

    it('uses async iteration with listExecutions without error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.ListExecutionsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedResponse = [
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
        generateSampleMessage(
          new protos.google.cloud.workflows.executions.v1.Execution()
        ),
      ];
      client.descriptors.page.listExecutions.asyncIterate =
        stubAsyncIterationCall(expectedResponse);
      const responses: protos.google.cloud.workflows.executions.v1.IExecution[] =
        [];
      const iterable = client.listExecutionsAsync(request);
      for await (const resource of iterable) {
        responses.push(resource!);
      }
      assert.deepStrictEqual(responses, expectedResponse);
      assert.deepStrictEqual(
        (
          client.descriptors.page.listExecutions.asyncIterate as SinonStub
        ).getCall(0).args[1],
        request
      );
      assert.strictEqual(
        (
          client.descriptors.page.listExecutions.asyncIterate as SinonStub
        ).getCall(0).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });

    it('uses async iteration with listExecutions with error', async () => {
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.workflows.executions.v1.ListExecutionsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedError = new Error('expected');
      client.descriptors.page.listExecutions.asyncIterate =
        stubAsyncIterationCall(undefined, expectedError);
      const iterable = client.listExecutionsAsync(request);
      await assert.rejects(async () => {
        const responses: protos.google.cloud.workflows.executions.v1.IExecution[] =
          [];
        for await (const resource of iterable) {
          responses.push(resource!);
        }
      });
      assert.deepStrictEqual(
        (
          client.descriptors.page.listExecutions.asyncIterate as SinonStub
        ).getCall(0).args[1],
        request
      );
      assert.strictEqual(
        (
          client.descriptors.page.listExecutions.asyncIterate as SinonStub
        ).getCall(0).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });
  });

  describe('Path templates', () => {
    describe('execution', () => {
      const fakePath = '/rendered/path/execution';
      const expectedParameters = {
        project: 'projectValue',
        location: 'locationValue',
        workflow: 'workflowValue',
        execution: 'executionValue',
      };
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      client.pathTemplates.executionPathTemplate.render = sinon
        .stub()
        .returns(fakePath);
      client.pathTemplates.executionPathTemplate.match = sinon
        .stub()
        .returns(expectedParameters);

      it('executionPath', () => {
        const result = client.executionPath(
          'projectValue',
          'locationValue',
          'workflowValue',
          'executionValue'
        );
        assert.strictEqual(result, fakePath);
        assert(
          (client.pathTemplates.executionPathTemplate.render as SinonStub)
            .getCall(-1)
            .calledWith(expectedParameters)
        );
      });

      it('matchProjectFromExecutionName', () => {
        const result = client.matchProjectFromExecutionName(fakePath);
        assert.strictEqual(result, 'projectValue');
        assert(
          (client.pathTemplates.executionPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchLocationFromExecutionName', () => {
        const result = client.matchLocationFromExecutionName(fakePath);
        assert.strictEqual(result, 'locationValue');
        assert(
          (client.pathTemplates.executionPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchWorkflowFromExecutionName', () => {
        const result = client.matchWorkflowFromExecutionName(fakePath);
        assert.strictEqual(result, 'workflowValue');
        assert(
          (client.pathTemplates.executionPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchExecutionFromExecutionName', () => {
        const result = client.matchExecutionFromExecutionName(fakePath);
        assert.strictEqual(result, 'executionValue');
        assert(
          (client.pathTemplates.executionPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });
    });

    describe('workflow', () => {
      const fakePath = '/rendered/path/workflow';
      const expectedParameters = {
        project: 'projectValue',
        location: 'locationValue',
        workflow: 'workflowValue',
      };
      const client = new executionsModule.v1.ExecutionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      client.pathTemplates.workflowPathTemplate.render = sinon
        .stub()
        .returns(fakePath);
      client.pathTemplates.workflowPathTemplate.match = sinon
        .stub()
        .returns(expectedParameters);

      it('workflowPath', () => {
        const result = client.workflowPath(
          'projectValue',
          'locationValue',
          'workflowValue'
        );
        assert.strictEqual(result, fakePath);
        assert(
          (client.pathTemplates.workflowPathTemplate.render as SinonStub)
            .getCall(-1)
            .calledWith(expectedParameters)
        );
      });

      it('matchProjectFromWorkflowName', () => {
        const result = client.matchProjectFromWorkflowName(fakePath);
        assert.strictEqual(result, 'projectValue');
        assert(
          (client.pathTemplates.workflowPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchLocationFromWorkflowName', () => {
        const result = client.matchLocationFromWorkflowName(fakePath);
        assert.strictEqual(result, 'locationValue');
        assert(
          (client.pathTemplates.workflowPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchWorkflowFromWorkflowName', () => {
        const result = client.matchWorkflowFromWorkflowName(fakePath);
        assert.strictEqual(result, 'workflowValue');
        assert(
          (client.pathTemplates.workflowPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });
    });
  });
});
