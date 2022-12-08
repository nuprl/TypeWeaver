export default function(app: Map) {
  app.get('/', function(req: Function, res: object) {
    res.redirect('/test/');
  })
};
