const jwt = require('jsonwebtoken');

const expirationFormatToken = (token = '') => {
	return new Promise((resolve, reject) => {
		const { exp } = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);
		if (!exp) {
			reject('Error, fecha de expiración no encontrada!');
		} else {
			const expirationDate = new Date();
			expirationDate.setTime(exp * 1000);
			expirationDate.setUTCHours(expirationDate.getUTCHours() - 5);
			resolve(expirationDate);
		}
	});
};

module.exports = {
	expirationFormatToken,
};
