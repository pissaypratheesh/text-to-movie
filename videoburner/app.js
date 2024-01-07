const express = require('express');
const app = express();
const port = 3000;

app.get('/dummy', (req, res) => {
  res.send('This is a dummy route');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
