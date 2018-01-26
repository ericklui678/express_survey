const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(session({ secret: 'some-secret-key' }));

app.get('/', (req, res) => res.render('index'));

app.post('/', (req, res) => res.redirect('/'));

app.post('/result', (req, res) => {
  req.session.formData = req.body;
  res.redirect('/result');
});

app.get('/result', (req, res) => {
  res.locals.formData = req.session.formData;
  res.render('result');
});

app.listen(port, () => console.log(`listening on ${port}`));
