const RefreshToken = require('../RefreshToken');

describe('RefreshToken entities', () => {
  it('should throw error when not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action and assert
    expect(() => new RefreshToken(payload)).toThrowError('REFRESH_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when did not meet data type specification', () => {
    // Arrange
    const payload = {
      refreshToken: [],
    };

    // Action and assert
    expect(() => new RefreshToken(payload)).toThrowError('REFRESH_TOKEN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create refreshToken object correctly', () => {
    // Arrange
    const payload = {
      refreshToken: 'refresh_token',
    };

    // Action
    const { refreshToken } = new RefreshToken(payload);

    // Assert
    expect(refreshToken).toStrictEqual(payload.refreshToken);
  });
});
