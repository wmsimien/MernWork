const express = require('express');
const path = require('path');
const logger = require('morgan');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const app = require('./app');

dotenv.config({ path: './config.env' });

const cors = require('cors');

const defaultRouter = require('./Routers/defaultRoutes');
const adminRouter = require('./Routers/adminRoutes');
const userRouter = require('./Routers/userRoute');
const productRouter = require('./Routers/Product/productRoute');
const cartRouter = require('./Routers/Cart/cartRoute');
const recentOrdersRouter = require('./Routers/RecentOrders/recentOrdersRoute');
const reorderRouter = require('./Routers/Reorder/reorderRoute');
const reviewOrderItemRouter = require('./Routers/ReviewOrder/reviewOrderItemRoute');

// top-level function; creates an Express app server
const app = express(); // gives us the express class constructor; this calls/invokes the class;

// we can have one main and multiple other express apps at a place
const adminApp = express(); // a new express app to handle request mounted with admin in path
const userApp = express();
const productApp = express();
const cartApp = express();
const recentOrdersApp = express();
const reorderApp = express();
const reviewOrderItemApp = express();

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

// api path product => localhost:9000/product/api
app.use('/product', productApp);
productApp.use(productRouter);

// api path cart => localhost:9000/cart/api
app.use('/cart', cartApp);
cartApp.use(cartRouter);

// api path recentOrders => localhost:9000/recentOrders/api
app.use('/recentOrders', recentOrdersApp);
recentOrdersApp.use(recentOrdersRouter);

// api path reorder => localhost:9000/reorder/api
app.use('/reorder', reorderApp);
reorderApp.use(reorderRouter);

// api path reviewOrder => localhost:9000/reviewOrder/api
app.use('/reviewOrderItem', reviewOrderItemApp);
reviewOrderItemApp.use(reviewOrderItemRouter);

app.all('*', (req, res) => {
  res.status(404);
  throw new Error('Route not found.');
});

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
