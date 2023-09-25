const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const databased = require('./sqlconn/sqlconn')
const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
databased.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
// http://localhost:80/
app.get('/', function(request, response) {
	if (request.session.loggedin) {
		response.redirect('/home');
	}
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});
// http://localhost:80/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		let query = `SELECT * FROM accounts WHERE username = '${(username)}' AND password = '${(password)}' AND id > 1`;
		// let query = `SELECT * FROM accounts WHERE username = '${(username)}'`;
		console.log(query)
		try{
			connection.query(query, function(error, results, fields) {
				// If there is an issue with the query, output the error
				if (error) {response.send('bad query!');};
				// If the account exists
				if (results.length > 0) {
					// Authenticate the user
					request.session.loggedin = true;
					request.session.username = username;
					// Redirect to home page
					response.redirect('/home');
				} else {
					response.send('Incorrect Username and/or Password!');
				}
				response.end();
			});
		}catch(e){}
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.get('/register', function(request, response) {
	if (request.session.loggedin) {
		response.redirect('/home');
	}
	if(request.body.username && request.body.password){

	}
	// Render login template
	response.sendFile(path.join(__dirname + '/register.html'));
});
// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.sendFile('home.html', { root: __dirname });
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
});

app.get('/api/users/?', function (req, res) {
	let query = `SELECT * FROM accounts WHERE username = '*'`;
	connection.query(query, function(error, results, fields) {
		console.log(results);
		// If there is an issue with the query, output the error
		if (error){
			res.status(400).send(`Error! ${error}`)
		}
		// If the account exists
		if (results.length > 0) {
			res.status(200).send(JSON.stringify(results))
		}
		else{
			res.status(418).send("I came here to get some coffee")
		}
	});
});

app.get('/api/users/all', function (req, res) {
	let query = `SELECT * FROM accounts`;
	connection.query(query, function(error, results, fields) {
		console.log(results)

		if (error){
			res.status(400).send(`Error! ${error}`)
		}

		if (results.length > 0) {
			res.status(200).send(JSON.stringify(results))
		}
		else{
			res.status(418).send("I came here to get some coffee")
		}
	});
});


app.get('/api/users/:username', function (req, res) {
	let query = `SELECT * FROM accounts WHERE username = '${username}'`;
	connection.query(query, function(error, results, fields) {
		// If there is an issue with the query, output the error
		if (error){
			response.status(400).send(`Error! ${error}`)
		}
		// If the account exists
		if (results.length > 0) {
			response.status(200).send(JSON.stringify(results))
		}
		else{
			res.status(418).send("I came here to get some coffee")
		}
	});
});

app.get('/api/session', function (req, res) {
	if (request.session.loggedin) {
		res.send({
		authenticated: true,
		user: request.session.loggedin
		});
	}
	else {
		res.send({
		authenticated: false
		});
	}
});

app.post('/api/session/authenticate', function (req, res) {
	var failureResult = {
		error: true,
		message: 'Authentication failed, Incorrect "username" and "password" fields provided'
	};

	if (!req.body.username || !req.body.password) {
		res.send(failureResult);
		return;
	}
	let query = `SELECT * FROM accounts WHERE username = '${(req.body.username)}' AND password = '${(req.body.username)}'`;
		// let query = `SELECT * FROM accounts WHERE username = '${(username)}'`;
		// console.log(query)
	try{
		connection.query(query, function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.send('Authentication Success!');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	}catch(e){}
});

app.get('/api/admin/backup', function (req, res) {
	res.status(501).send('Not Implemented Yet!')
});

app.listen(3000);