class ServerError extends Error {
  constructor (paramName) {
    super('Internal Error')
    this.name = 'ServerError'
  }
}

module.exports = ServerError
