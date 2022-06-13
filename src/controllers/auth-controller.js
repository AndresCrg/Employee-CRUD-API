const bcryptjs = require('bcryptjs');
const { prisma } = require('./employee-controller');
const { generateJWT } = require('../helpers/generate-jwt');
const { expirationFormatToken } = require('../helpers/validate-expiration');

const login = async (req, res) => {
	const { email, password } = req.body;
	const idmUser = await prisma.crendential.findFirst({
		where: { email },
	});

	if (!idmUser) {
		return res.status(404).json({
			msg: 'Correo o contraseña incorrectas - correo',
		});
	}

	const validatePassword = bcryptjs.compareSync(password, idmUser.password);
	if (!validatePassword) {
		return res.status(404).json({
			msg: 'Correo o contraseña incorrectas! - password',
		});
	}

	const token = await generateJWT(idmUser.id, idmUser.email);

	const expiration = await expirationFormatToken(token);

	const result = await prisma.token.create({
		data: {
			token,
			expiration,
		},
	});

	console.log('Token Info: ', result);

	res.json({
		token,
		expiration,
	});
};

module.exports = {
	login,
};
