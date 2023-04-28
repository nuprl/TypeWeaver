export default function(app: any) {
  app.get('/', function(req: Request, res: Response) {
    res.redirect('/test/');
  })
};