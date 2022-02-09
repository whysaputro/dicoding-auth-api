const AuthenticationTokenManager = require('../AuthenticationTokenManager');

describe('AuthenticationTokenManager interface', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const authenticationTokenManager = new AuthenticationTokenManager();

    // Action and assert
    await expect(authenticationTokenManager.generateAccessToken({})).rejects
      .toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationTokenManager.generateRefreshToken({})).rejects
      .toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationTokenManager.verifyRefreshToken('refresh_token')).rejects
      .toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});
