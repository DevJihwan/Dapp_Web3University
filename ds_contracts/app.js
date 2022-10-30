const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const web3Router = require('./routes/web3');

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true
  })
);

app.get('/', function(req, res, next) {
  res.status(200).send({"message": "web3 server is starting..."});
});
app.use('/web3', web3Router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
      errors: {
          message: err.message,
      },
  });
});

app.listen(port, () => {
  console.log(`
  ################################################
  🟣  web3 is listening on port: ${port} 🟣
  http://localhost:${port}
  ################################################
  `);
});

module.exports = app;