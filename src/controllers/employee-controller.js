const { request, response } = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEmployee = async (req = request, res = response) => {
	const { fullName, documentType, document, department, contractExpirationDate, position, email } = req.body;
	const result = await prisma.employee.create({
		data: {
			full_name: fullName,
			document_type: documentType,
			document,
			department,
			contract_expiration_date: new Date(
				Date.UTC(contractExpirationDate.split('-')[0], contractExpirationDate.split('-')[1], contractExpirationDate.split('-')[2], 0, 0, 0)
			),
			position,
			email,
		},
	});
	res.json({
		msg: 'Empleado creado exitosamente!',
	});
	console.log(result);
};

const updateEmplyee = async (req = request, res = response) => {
	const document = req.params.document;
	const { ...toUpdate } = req.body;
	const result = await prisma.employee.update({
		where: {
			document,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Empleado actualizado exitosamente!',
	});
	console.log(result);
};

const getEmployee = async (req = request, res = response) => {
	const document = req.params.document;
	const employeeDB = await prisma.employee.findUnique({
		where: {
			document,
		},
	});
	res.json({
		employeeDB,
	});
};

const patchEmployee = async (req = request, res = response) => {
	const document = req.params.document;
	const departureDate = req.params.departureDate;
	const employeeDB = await prisma.employee.update({
		where: {
			document,
		},
		data: {
			contract_expiration_date: new Date(Date.UTC(departureDate.split('-')[0], departureDate.split('-')[1], departureDate.split('-')[2], 0, 0, 0)),
			state: 'B',
		},
	});
	res.json({
		msg: 'Empleado desactivado exitosamente!',
		state: employeeDB.state,
	});
	console.log(document);
};

module.exports = {
	createEmployee,
	updateEmplyee,
	getEmployee,
	patchEmployee,
	prisma,
};
