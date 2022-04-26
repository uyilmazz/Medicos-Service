const express = require('express');
const app = express();

const mongoose = require('mongoose');
// const path = require('path');

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/medicos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log('Database connection'))
    .catch(err => console.log('Database connection error' + err));

const authRouter = require('./routers/auth_router');
const productRouter = require('./routers/product_router');
const categoryRouter = require('./routers/category_router');
const departmentRouter = require('./routers/department_router');
const doctorRouter = require('./routers/doctor_router');

app.use('/users', authRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/departmens', departmentRouter);
app.use('/doctors', doctorRouter);

app.listen(3000, () => {
    console.log('App listening from 3000 port');
})