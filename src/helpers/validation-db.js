const { prisma } = require('../controllers/employee-controller');

/**
 *
 * Employees
 */

const documentExist = async (document = '') => {
	const existDocument = await prisma.employee.findFirst({ where: { document } });
	if (existDocument) {
		throw new Error(`El documento: ${document}, ya está registrado!`);
	}
};

const documentExistById = async (document = '') => {
	const existDocument = await prisma.employee.findUnique({
		where: { document },
	});
	if (!existDocument) {
		throw new Error(`El documento ${document} no esta registrado!`);
	}
};

const emailExist = async (email = '') => {
	const existEmail = await prisma.employee.findFirst({ where: { email } });
	if (existEmail) {
		throw new Error(`El correo: ${email}, ya está registrado!`);
	}
};

/**
 *
 * Credential
 */

const emailExistCredential = async (email = '') => {
	const existEmail = await prisma.crendential.findFirst({ where: { email } });
	if (existEmail) {
		throw new Error(`El correo: ${email}, ya está registrado!`);
	}
};

const emailDoesNotRegistry = async (email = '') => {
	const existEmail = await prisma.crendential.findFirst({
		where: { email },
	});
	if (!existEmail) {
		throw new Error(`Correo o contraseña incorrectas - Correo`);
	}
};

module.exports = {
	documentExist,
	emailExist,
	documentExistById,
	emailDoesNotRegistry,
	emailExistCredential,
};
