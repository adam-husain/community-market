const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const fs = require('fs');

const https = require('https');
const privateKey = fs.readFileSync('cert/private.key', 'utf8');
const certificate = fs.readFileSync('cert/certificate.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());         // to support JSON-encoded bodies
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
const chatRouter = require('./routes/chat');
const residenceRouter = require('./routes/residence');
const SqlParser = require("./routes/sqlParser");

app.use('/api/v1/account', accountRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/residence', residenceRouter);

app.use('/parse/sql', SqlParser);

app.get('/public/profile/:file',
	(req, res) => {
		let file = path.join(__dirname, 'public/profile/', req.params.file);
		if (!fs.existsSync(file)) {
			file = path.join(__dirname, 'public/profile/', 'default.jpg');
		}
		res.sendFile(file)
	});
app.get('/public/product/:file',
	(req, res) => {
		let file = path.join(__dirname, 'public/product/', req.params.file);
		if (!fs.existsSync(file)) {
			file = path.join(__dirname, 'public/product/', 'default.jpg');
		}
		res.sendFile(path.join(file))
	});

const server = https.createServer(credentials, app);

server.listen(port, () => {
	console.log("server starting on port : " + port)
});