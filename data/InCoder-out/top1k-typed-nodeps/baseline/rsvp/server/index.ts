module.exports = function(app: express.Application) {
  app.get('/', function(req: express.Request,  res: express.Response) {
    res.redirect('/test/');
  })
};