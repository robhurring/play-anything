exports.passwordProtected = (req, res, next) => {
  const password = req.app.get("password")
  const authorization = req.headers.authorization;

  const fail = (message = 'Unauthorized') => {
    res.status(401).json({
      error: message
    })
  }

  if (!authorization) {
    return fail()
  }

  const token = authorization.replace(/^Token\s*/, '')
  if (token === password) {
    next()
  } else {
    fail('Incorrect password')
  }
}

exports.offlineMiddleware = (req, res, next) => {
  const db = req.app.get("db");
  const defaultOnlineStatus = req.app.get("online by default");

  db.getStatus().then(
    data => {
      let online = data

      if (online === null) {
        db.setStatus(defaultOnlineStatus)
        online = defaultOnlineStatus
      }

      if (online) {
        next()
      } else {
        res.status(410).json({
          error: 'Offline'
        })
      }
    },
    err => {
      console.error('status err', err);
      next();
    }
  );
};

exports.stats =(req, res) => {
  const db = req.app.get("db");

}

const status = exports.status = (req, res) => {
  const db = req.app.get("db");

  Promise.all([db.numActiveClients(), db.getStatus()]).then(([numClients, status]) => {
    res.status(200).json({
      id: req.session.id,
      clients: numClients,
      online: status
    });
  });
}

exports.state = state => (req, res) => {
  const db = req.app.get("db");
  const online = state === "online";

  db.setStatus(online);
  status(req, res)
};
