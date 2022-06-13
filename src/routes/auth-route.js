const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth-controller');
const { emailDoesNotRegistry } = require('../helpers/validation-db');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

/**
 * @swagger
 * /apirest/Acceso:
 *  post:
 *   summary: Login Idm
 *   tags: [Credential]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Credential'
 *   responses:
 *    200:
 *     description: Login Ok!
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         token:
 *          type: string
 *          description: Token generado
 *         expiration:
 *          type: string
 *          description: Fecha/Hora expiración del token
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.post(
	'/',
	[
		check('email', 'El campo del email es obligatorio!').not().isEmpty(),
		check('email', 'No es un formato de email válido').isEmail(),
		check('email').custom(emailDoesNotRegistry),
		check('password', 'El campo del password es obligatorio!').not().isEmpty(),
		validateFields,
	],
	login
);

module.exports = router;
