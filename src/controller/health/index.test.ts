import { request, response } from 'express';
import { mocked } from 'ts-jest/utils';

import health from './index';

describe('Given Health controller', () => {
  const mockRequest = mocked(request, true);
  const mockResponse = mocked(response, true);

  it('Should return that app is alive', (()=> {
    health(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith('alive 🚀');
  }));
});
