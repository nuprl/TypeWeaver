module.exports = function(app: Express.Application) {
  app.get('/', function(req: any, res: any) {
    res.redirect('/test/');
  })
};