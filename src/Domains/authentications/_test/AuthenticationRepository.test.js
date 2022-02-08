const AuthenticationRepository = require('../AuthenticationRepository');

describe('AuthenticationRepository interface', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const authenticationRepository = new AuthenticationRepository();

    // Action and assert
    await expect(() => authenticationRepository.addRefreshToken({})).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => authenticationRepository.verifyRefreshToken({})).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => authenticationRepository.deleteRefreshToken({})).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
