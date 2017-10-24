const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const blogPostRouter = require('./blogPostRouter');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
