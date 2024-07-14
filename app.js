// app.js

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());
app.use('/users', userRouter);

module.exports = app;

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`started app on http://localhost:3000`);
  });
}
