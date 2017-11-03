const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

// Create some blog posts
BlogPosts.create(
	'this is blog post 1', 
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu odio ultricies, lobortis metus ac, egestas sem. Pellentesque venenatis mauris.',
	'David',
	Date.now()
);
 
BlogPosts.create(
	'this is blog post 2', 
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu odio ultricies, lobortis metus ac, egestas sem. Pellentesque venenatis mauris.',
	'David',
	Date.now()
);

BlogPosts.create(
	'this is blog post 3', 
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu odio ultricies, lobortis metus ac, egestas sem. Pellentesque venenatis mauris.',
	'David',
	Date.now()
);


router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(500).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, Date.now());
  res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(500).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(500).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: Date.now()
  });
  res.status(204).end();
})

module.exports = router;