const express = require('express');
const path = require('path');
const logger = require('morgan');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const cors = require('cors');

const defaultRouter = require('./Routers/defaultRoutes');
const adminRouter = require('./Routers/adminRoutes');
const userRouter = require('./Routers/userRoute');
const productRouter = require('./Routers/Product/productRoute');
const cartRouter = require('./Routers/Cart/cartRoute');

// top-level function; creates an Express app server
const app = express(); // gives us the express class constructor; this calls/invokes the class;

// we can have one main and multiple other express apps at a place
const adminApp = express(); // a new express app to handle request mounted with admin in path
const userApp = express();
const studentApp = express();
const hobbyApp = express();
const productApp = express();
const cartApp = express();

app.use(cors()); //enabling cross origin resource sharing at root level

app.use('/static', express.static('public'));

//json middle-ware for setting request content type to json in body
app.use(express.json({ limit: '2mb', extended: false }));

const port = 9000;

// third-party middleware
app.use(logger('dev'));

app.use('/', defaultRouter);

// path mounting to oter express app
app.use('/admin', adminApp);
adminApp.use(adminRouter);

// api path signinup => localhost:9000/user/api/signinup
app.use('/user', userApp);
userApp.use(userRouter);

// api path product => localhost:9000/user/api/product
app.use('/product', productApp);
productApp.use(productRouter);

// api path product => localhost:9000/user/api/cart
app.use('/cart', cartApp);
cartApp.use(cartRouter);

app.all('*', (req, res) => {
  res.status(404);
  throw new Error('Route not found.');
});

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
