const RefreshToken = require('../../Domains/authentications/entities/RefreshToken');

class DeleteAuthenticationUseCase {
  constructor({ authenticationRepository }) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(useCasePayload) {
    const { refreshToken } = new RefreshToken(useCasePayload);
    await this._authenticationRepository.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.deleteRefreshToken(refreshToken);
  }
}

module.exports = DeleteAuthenticationUseCase;
