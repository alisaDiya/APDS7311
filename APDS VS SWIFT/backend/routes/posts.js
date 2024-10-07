const express = require('express');
const router = express.Router();

//post routes
router.get('/', (req, res) => {
  res.json({ message: 'Posts API is working' });
});


router.post('/', (req, res) => {
  const { title, content } = req.body;
  // Simulate saving post to database
  res.status(201).json({ message: 'Post created', post: { title, content } });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  res.json({ message: `Post with ID ${id} updated`, post: { title, content } });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({ message: `Post with ID ${id} deleted` });
});

module.exports = router;
