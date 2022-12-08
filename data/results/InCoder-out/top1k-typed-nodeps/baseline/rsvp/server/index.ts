module.exports = function(app: express.Application) {
  app.get('/', function(req: Request,  res: Response) {
    res.redirect('/test/');
  })
};