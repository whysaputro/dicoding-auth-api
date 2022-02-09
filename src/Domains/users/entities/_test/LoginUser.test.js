const LoginUser = require('../LoginUser');

describe('a UserLogin entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'abc',
    };

    // Action and assert
    expect(() => new LoginUser(payload)).toThrowError('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet type data specification', () => {
    // Arrange
    const payload = {
      username: 'abc',
      password: ['true'],
    };

    expect(() => new LoginUser(payload)).toThrowError('LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create LoginUser object correctly', () => {
    const payload = {
      username: 'abc',
      password: 'secret',
    };

    const { username, password } = new LoginUser(payload);

    expect(username).toStrictEqual(payload.username);
    expect(password).toStrictEqual(payload.password);
  });
});
