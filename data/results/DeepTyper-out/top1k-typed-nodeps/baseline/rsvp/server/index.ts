module.exports = function(app: any) {
  app.get('/', function(req: any, res: any) {
    res.redirect('/test/');
  })
};
