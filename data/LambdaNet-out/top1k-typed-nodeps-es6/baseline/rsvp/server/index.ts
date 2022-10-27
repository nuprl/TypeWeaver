export default function(app: Map) {
  app.get('/', function(req: Function, res: Object) {
    res.redirect('/test/');
  })
};
