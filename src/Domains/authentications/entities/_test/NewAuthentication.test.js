const NewAuthentication = require('../NewAuthentication');

describe('a NewAuthentication entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      accessToken: 'abc',
    };

    // Action and assert
    expect(() => new NewAuthentication(payload)).toThrowError('NEW_AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet type data specification', () => {
    // Arrange
    const payload = {
      accessToken: true,
      refreshToken: ['abc'],
    };

    // Action and assert
    expect(() => new NewAuthentication(payload)).toThrowError('NEW_AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newAuthentication object correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'abc',
      refreshToken: 'abc',
    };

    // Action
    const { accessToken, refreshToken } = new NewAuthentication(payload);

    // Assert
    expect(accessToken).toStrictEqual(payload.accessToken);
    expect(refreshToken).toStrictEqual(payload.refreshToken);
  });
});
