const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const forms = multer();

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(forms.array());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


const accountRouter = require('./routes/account');
const productRouter = require('./routes/product');
const residenceRouter = require('./routes/residence');

app.use('/api/v1/account', accountRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/residence', residenceRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});