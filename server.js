const fs = require('fs');
const path = require('path');

const express = require('express');
const moongoose = require('mongoose');

const setHeaders = require('./middlerware/set-headers');
const HttpError = require('./models/http-error');

const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post-routes');
const messageRoutes = require('./routes/message-routes');
const io = require('./socket');

const PORT = process.env.PORT || 5000;
const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hfbiv.mongodb.net/${process.env.MONGO_NAME}`;

const app = express();

app.use(express.json());

app.use(
  '/images/uploads',
  express.static(path.join(__dirname, 'images', 'uploads'))
);

app.use(setHeaders);

app.use('/api/users', userRoutes);

app.use('/api/posts', postRoutes);

app.use('/api/messages', messageRoutes);

app.use((req, res, next) => {
  throw new HttpError("Couldn't find this route.", 404);
});

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(err);
  }

  res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'an unexpexted error occured' });
});

moongoose
  .connect(URI)
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server listening at ${PORT}`);
    });
    io.init(server);
  })
  .catch((err) => {
    console.log(err);
  });
