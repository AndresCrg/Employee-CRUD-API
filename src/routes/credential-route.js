const { Router } = require('express');
const { check } = require('express-validator');
const { createCredential } = require('../controllers/credential-controller');
const { emailExistCredential } = require('../helpers/validation-db');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Credential:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: Email del Idm
 *     password:
 *      type: string
 *      description: Contraseña del Idm
 *    required:
 *     - email
 *     - password
 */

/**
 * @swagger
 * /apirest/Credential:
 *  post:
 *   summary: Crear nuevo Idm
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
 *     description: Idm creado exitosamente!
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.post(
	'/',
	[
		check('email', 'El campo del email es obligatorio!').not().isEmpty(),
		check('email', 'No es un formato de email válido').isEmail(),
		check('email').custom(emailExistCredential),
		check('password', 'El campo del password es obligatorio!').not().isEmpty(),
		validateFields,
	],
	createCredential
);

module.exports = router;
