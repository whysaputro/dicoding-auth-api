const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');

describe('BcryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptHashPassword = new BcryptPasswordHash(bcrypt);

      // Action
      const encryptedPassword = await bcryptHashPassword.hash('plain_password');

      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10); // 10 adalah nilai saltRound default untuk BcryptPasswordHash
    });
  });

  describe('compare function', () => {
    it('should throw AuthenticationError if password not match', async () => {
      // Arrange
      const bcryptHashPassword = new BcryptPasswordHash(bcrypt);

      // Action and assert
      await expect(bcryptHashPassword.compare('plain_password', 'hashed_password')).rejects.toThrow(AuthenticationError);
    });

    it('should not throw AuthenticationError if password match', async () => {
      // Arrange
      const bcryptHashPassword = new BcryptPasswordHash(bcrypt);
      const password = 'secret';
      const hashedPassword = await bcryptHashPassword.hash(password);

      // Action and assert
      await expect(bcryptHashPassword.compare(password, hashedPassword))
        .resolves.not.toThrow(AuthenticationError);
    });
  });
});
