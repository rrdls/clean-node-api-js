const HttpResponse = require('../helpers/http-response')
const { InvalidParamError, MissingParamError } = require('../../utils/errors')

class LoginRouter {
  constructor(authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body
      const accessToken = await this.authUseCase.auth(email, password)
      if (!email) return HttpResponse.badRequest(new MissingParamError('email'))
      if (!this.emailValidator.isValid(email))
        return HttpResponse.badRequest(new InvalidParamError('email'))
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
