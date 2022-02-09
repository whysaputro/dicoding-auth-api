const LoginUser = require('../../Domains/users/entities/LoginUser');
const NewAuthentication = require('../../Domains/authentications/entities/NewAuthentication');

class LoginUserUseCase {
  constructor({
    userRepository, authenticationRepository, authenticationTokenManager, passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { username, password } = new LoginUser(useCasePayload);
    const hashedPassword = await this._userRepository.getPasswordByUsername(username);
    await this._passwordHash.compare(password, hashedPassword);
    const id = await this._userRepository.getIdByUsername(username);
    const accessToken = await this._authenticationTokenManager.generateAccessToken({ id });
    const refreshToken = await this._authenticationTokenManager.generateRefreshToken({ id });

    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addRefreshToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
