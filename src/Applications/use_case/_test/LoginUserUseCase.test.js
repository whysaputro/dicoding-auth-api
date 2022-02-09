const LoginUserUseCase = require('../LoginUserUseCase');
const LoginUser = require('../../../Domains/users/entities/LoginUser');
const NewAuthentication = require('../../../Domains/authentications/entities/NewAuthentication');
const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const PasswordHash = require('../../security/PasswordHash');

describe('LoginUserUseCase', () => {
  it('should orchestrating login user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
    };

    const { username, password } = new LoginUser(useCasePayload);

    const expectedNewAuthentication = new NewAuthentication({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });

    /** creating depedency of use case */
    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    /** mocking needed function */
    mockUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockPasswordHash.compare = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));
    mockAuthenticationTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedNewAuthentication.accessToken));
    mockAuthenticationTokenManager.generateRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedNewAuthentication.refreshToken));
    mockAuthenticationRepository.addRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const authenticated = await loginUserUseCase.execute(useCasePayload);

    // Assert
    expect(authenticated)
      .toStrictEqual(expectedNewAuthentication);
    expect(mockUserRepository.getPasswordByUsername)
      .toBeCalledWith(username);
    expect(mockPasswordHash.compare)
      .toBeCalledWith(password, 'encrypted_password');
    expect(mockAuthenticationTokenManager.generateAccessToken)
      .toBeCalledWith({ id: 'user-123' });
    expect(mockAuthenticationTokenManager.generateRefreshToken)
      .toBeCalledWith({ id: 'user-123' });
    expect(mockAuthenticationRepository.addRefreshToken)
      .toBeCalledWith(expectedNewAuthentication.refreshToken);
  });
});
