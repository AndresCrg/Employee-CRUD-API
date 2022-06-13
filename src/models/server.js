require('dotenv').config();
const express = require('express');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Employee CRUD API',
			description: 'Crud para empleados de una empresa x.',
			contact: {
				name: 'Brayan Andrés Cárdenas Rodríguez',
				email: 'brayan.cardenas@uptc.edu.co',
			},
			version: '1.0.0',
		},
		servers: [
			{
				url: 'http://localhost:3006',
			},
		],
	},
	apis: ['./src/routes/*.js'],
};

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.SERVER_PORT;
		this.credentialPath = '/apirest/Credencial';
		this.authPath = '/apirest/Acceso';
		this.employeePath = '/apirest/Usuarios';
		this.swaggerDocPath = '/apirest/DocSwagger';
		this.middleware();
		this.routes();
	}

	middleware() {
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.credentialPath, require('../routes/credential-route'));
		this.app.use(this.authPath, require('../routes/auth-route'));
		this.app.use(this.employeePath, require('../routes/employee-route'));
		this.app.use(this.swaggerDocPath, swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	}
}

module.exports = Server;
