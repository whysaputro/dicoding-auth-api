const PasswordHash = require('../PasswordHash');

describe('PasswordHash interface', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const passwordHash = new PasswordHash();

    // Action and assert
    await expect(passwordHash.hash('dummy_password')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });

  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const passwordHash = new PasswordHash();

    // Action and assert
    await expect(passwordHash.compare('dummy_hashed_password')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});
