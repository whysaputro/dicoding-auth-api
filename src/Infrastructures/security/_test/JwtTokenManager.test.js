const Jwt = require('@hapi/jwt');
const JwtTokenManager = require('../JwtTokenManager');

describe('JwtTokenManager', () => {
  describe('generateAccessToken function', () => {
    it('should generate access token correctly', async () => {
      // Arrange
      const payload = {
        id: 'user-123',
      };

      const spyGenerateAccessToken = jest.spyOn(Jwt.token, 'generate');
      const jwtTokenManager = new JwtTokenManager(Jwt);

      // Action
      const accessToken = await jwtTokenManager.generateAccessToken(payload);

      // Assert
      expect(typeof accessToken).toEqual('string');
      expect(accessToken).not.toEqual(payload);
      expect(spyGenerateAccessToken).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
    });
  });

  describe('generateRefreshToken function', () => {
    it('should generate refresh token correctly', async () => {
      // Arrange
      const payload = {
        id: 'user-123',
      };

      const spyGenerateRefreshToken = jest.spyOn(Jwt.token, 'generate');
      const jwtTokenManager = new JwtTokenManager(Jwt);

      // Action
      const refreshToken = await jwtTokenManager.generateRefreshToken(payload);

      // Assert
      expect(typeof refreshToken).toEqual('string');
      expect(refreshToken).not.toEqual(payload);
      expect(spyGenerateRefreshToken).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
    });
  });
});
