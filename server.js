const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const server = express();
server.use(cors());

const port = process.env.PORT || 8080;
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

server.use(express.static(path.resolve(__dirname, 'build')));

server.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

server.get('/recipes', (req, res) => {
	const item = req.query.item;
	fetch(
		`https://api.edamam.com/search?q=${item}&app_id=${app_id}&app_key=${app_key}`
	)
		.then((data) => data.json())
		.then((json) => res.send(json))
		.catch((err) => console.error(err.message));
});

server.listen(port, () => console.log(`http://localhost:${port}`));
