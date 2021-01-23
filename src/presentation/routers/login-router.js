const HttpResponse = require('../helpers/http-response')
class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      const accessToken = this.authUseCase.auth(email, password)
      if (!email) return HttpResponse.badRequest('email')
      if (!password) return HttpResponse.badRequest('password')
      if (!accessToken) return HttpResponse.unauthorizedError()
      return HttpResponse.ok({ accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}

module.exports = LoginRouter
