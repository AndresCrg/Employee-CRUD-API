const bcryptjs = require('bcryptjs');
const { prisma } = require('./employee-controller');

const createCredential = async (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);

	/**
	 * Encripta la contraseña
	 */
	const salt = bcryptjs.genSaltSync();
	let passwordEncrypt = bcryptjs.hashSync(password, salt);

	const result = await prisma.crendential.create({
		data: {
			email,
			password: passwordEncrypt,
		},
	});

	res.json({
		msg: 'Credencial creada exitosamente!',
		result,
	});
};

module.exports = {
	createCredential,
};
