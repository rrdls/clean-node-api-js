const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body
      const accessToken = await this.authUseCase.auth(email, password)
      if (!email) return HttpResponse.badRequest(new MissingParamError('email'))
      if (!password)
        return HttpResponse.badRequest(new MissingParamError('password'))
      if (!accessToken) return HttpResponse.unauthorizedError()
      return HttpResponse.ok({ accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}

module.exports = LoginRouter
