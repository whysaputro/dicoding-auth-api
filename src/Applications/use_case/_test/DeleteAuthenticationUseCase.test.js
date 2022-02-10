const DeleteAuthenticationUseCase = require('../DeleteAuthenticationUseCase');
const RefreshToken = require('../../../Domains/authentications/entities/RefreshToken');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');

describe('DeleteAuthenticationUseCase', () => {
  it('should orchestrating delete authentication action correctly', async () => {
    // Arrange
    const requestPayload = {
      refreshToken: 'refresh_token',
    };

    const { refreshToken } = new RefreshToken(requestPayload);

    /** creating depedency of use case */
    const mockAuthenticationRepository = new AuthenticationRepository();

    /** mocking needed function */
    mockAuthenticationRepository.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.deleteRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const deleteAuthenticationUseCase = new DeleteAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    // Action
    await deleteAuthenticationUseCase.execute(requestPayload);

    // Assert
    expect(mockAuthenticationRepository.verifyRefreshToken)
      .toBeCalledWith(refreshToken);
    expect(mockAuthenticationRepository.deleteRefreshToken)
      .toBeCalledWith(refreshToken);
  });
});
