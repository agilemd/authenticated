var chai = require('chai')
chai.should()
var sinon = require('sinon')
chai.use(require('sinon-chai'))


describe('authenticated', function () {
  var authenticated = require('../')

  it('continues if authenticated', function () {
    var req = {session:{passport:{user:{_id: 'foo'}}}}
    var res = {}
    var next = sinon.spy()

    authenticated(req, res, next)

    req.userId.should.equal('foo')
    next.should.have.been.calledOnce
  })

  it('redirects if not authenticated', function () {
    var req = {session: {}, url: '/foo'}
    var res = {redirect: sinon.spy()}
    var next = sinon.spy()

    authenticated(req, res, next)

    next.should.not.have.been.called
    res.redirect.should.have.been.calledWithExactly('/login')
    req.session.returnTo.should.equal('/foo')
  })

  describe('.or401', function () {

    it('401s if not authenticated', function () {
      var req = {session: {}, url: '/foo'}
      var res = {end: sinon.spy()}
      var next = sinon.spy()

      authenticated.or401(req, res, next)

      next.should.not.have.been.called
      res.statusCode.should.equal(401)
      res.end.should.have.been.calledOnce
    })

  })

  describe('.orElse', function () {

    it('calls another server function if not authenticated', function () {
      var req = {}
      var res = {}
      var next = sinon.spy()
      var test = sinon.spy()

      authenticated.orElse(test)(req, res, next)

      next.should.not.have.been.called
      test.should.have.been.calledWithExactly(req, res)
    })

  })
})