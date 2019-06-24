const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const uploadRoutes = require('./api/routes/uploads');

const mongoose = require('mongoose');

const morgan = require('morgan')

const bodyParser = require('body-parser');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uploads', {

    useNewUrlParser: true,
    useCreateIndex: true
})
mongoose.promise = global.promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/img_uploads', uploadRoutes);


app.listen(port, () => {
    console.log(`Server starting at port ${port}`);
})