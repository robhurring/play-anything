exports.stats =(req, res) => {
  const db = req.app.get("db");

  const numClients = db.numActiveClients();

  Promise.all([numClients]).then(([numClients]) => {
    res.status(200).json({
      id: req.session.id,
      clients: numClients
    });
  });
}
