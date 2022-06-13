const jwt = require('jsonwebtoken');

const generateJWT = (uid = '', email = '') => {
	return new Promise((resolve, reject) => {
		const payload = { uid, email };
		jwt.sign(
			payload,
			process.env.SECRETEORPRIVATEKEY,
			{
				expiresIn: 240,
			},
			(error, token) => {
				if (error) {
					console.log(error);
					reject('No se puedo generar Token!');
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generateJWT,
};
