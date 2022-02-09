const RefreshToken = require('../../Domains/authentications/entities/RefreshToken');

class RefreshAuthenticationUseCase {
  constructor({ authenticationTokenManager, authenticationRepository }) {
    this._authenticationTokenManager = authenticationTokenManager;
    this._authenticationRepository = authenticationRepository;
  }

  async execute(useCasePayload) {
    const { refreshToken } = new RefreshToken(useCasePayload);
    await this._authenticationRepository.verifyRefreshToken(refreshToken);
    const { id } = await this._authenticationTokenManager.verifyRefreshToken(refreshToken);
    const accessToken = await this._authenticationTokenManager.generateAccessToken({ id });

    return accessToken;
  }
}

module.exports = RefreshAuthenticationUseCase;
