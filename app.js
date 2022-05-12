const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
// const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/medicos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log('Database connection'))
    .catch(err => console.log('Database connection error' + err));

app.use(express.static(path.join(__dirname, 'public')))

const authRouter = require('./routers/user_router');
const productRouter = require('./routers/product_router');
const categoryRouter = require('./routers/category_router');
const departmentRouter = require('./routers/department_router');
const doctorRouter = require('./routers/doctor_router');
const orderRouter = require('./routers/order_router');
const appointmentRouter = require('./routers/appointment_router');

app.use('/users', authRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/departments', departmentRouter);
app.use('/doctors', doctorRouter);
app.use('/orders', orderRouter);
app.use('/appointments', appointmentRouter);

app.listen(3000, () => {
    console.log('App listening from 3000 port');
})