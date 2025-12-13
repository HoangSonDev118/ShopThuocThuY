const express = require('express')
const routes = require('./routes')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express()
const port = process.env.PORT || 3001


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())
app.use(cookieParser())

app.use('/images', express.static('public/uploads/images'));

routes(app)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connect database success');
    })
    .catch((err) => {
        console.log(err);
    })


app.listen(port, () => {
    console.log('Server is runnig on port :', port);
}
)