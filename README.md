# authenticated
ensure a request is authenticated


## example usage

Default behavior is to redirect to login:

    var authenticated = require('authenticated')

    app.get('/secret-recipe',
      authenticated,
      function (req, res) {
        // note, you still might want to do
        // some sort of authorization, which
        // is out of this module's scope
        res.send(secrets)
      })

Respond with 401:

    app.get('/secret-recipe',
      authenticated.or401,
      function (req, res) {
        res.send(secrets)
      })

Override custom behavior for unauthenticated requests:

    app.get('/secret-recipe',
      authenticated.orElse(function (req, res) {
          // some other behavior
          res.send('decoy recipe')
      }),
      function (req, res) {
        res.send(secrets)
      })


## note

We currently check for authenticated requests by looking for
`req.session.passport.user._id`, which happens to work in our
particular use case. This is super inflexible. Please open a GitHub
thread with your use case or suggestion for making this check
better.

## installation

    $ npm install authenticated


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

jden <jason@denizac.org>


## license
MIT. (c) 2013 Agile Diagnosis <hello@agilediagnosis.com>. See LICENSE.md