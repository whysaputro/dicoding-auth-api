const AuthenticationTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthenticationRepositoryPostgres = require('../AuthenticationRepositoryPostgres');
const pool = require('../../database/postgres/pool');

describe('AuthenticationRepositoryPostgres', () => {
  afterEach(async () => {
    await AuthenticationTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addRefreshToken function', () => {
    it('should add refresh token to database', async () => {
      // Arrange
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);
      const refreshToken = 'refresh_token';

      // Action
      await authenticationRepositoryPostgres.addRefreshToken(refreshToken);

      // Assert
      const token = await AuthenticationTableTestHelper.findToken(refreshToken);
      expect(token).toHaveLength(1);
      expect(token[0].token).toEqual(refreshToken);
    });
  });
});
