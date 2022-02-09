const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const RefreshToken = require('../../../Domains/authentications/entities/RefreshToken');

describe('RefreshAuthenticationUseCase', () => {
  it('should orchestrating refresh authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 'refresh_token',
    };
    const { refreshToken } = new RefreshToken(useCasePayload);

    /** creating depedency of use case */
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    /** mocking needed function */
    mockAuthenticationRepository.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: 'user-123' }));
    mockAuthenticationTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('access_token'));

    /** creating use case instance */
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const accessToken = await refreshAuthenticationUseCase.execute(useCasePayload);

    // Assert
    expect(mockAuthenticationRepository.verifyRefreshToken)
      .toBeCalledWith(refreshToken);
    expect(mockAuthenticationTokenManager.verifyRefreshToken)
      .toBeCalledWith(refreshToken);
    expect(mockAuthenticationTokenManager.generateAccessToken)
      .toBeCalledWith({ id: 'user-123' });
    expect(accessToken).toStrictEqual('access_token');
  });
});
