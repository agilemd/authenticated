var dot = require('dotmap').safe

var getUserId = dot('session.passport.user._id')

// connect middleware
// ensures a user is logged in & authenticated
// - if so, copies userId to `req.userId`
// - otherwise, redirects to login route
module.exports = authenticated()
module.exports.or401 = authenticated(fourOhOne)
module.exports.orElse = authenticated

function authenticated(otherwise) {
  otherwise = otherwise || redir

  return function (req, res, next) {
    var userId = getUserId(req)
    if (userId) {
      req.userId = userId
      return next()
    }

    // not logged in
    otherwise(req, res)
  }
}

function redir(req, res) {
  req.session.returnTo = req.url
  res.redirect('/login')
}

function fourOhOne(req, res) {
  res.statusCode = 401
  res.end()
}