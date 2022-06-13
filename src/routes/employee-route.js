const { Router } = require('express');
const { check } = require('express-validator');
const { createEmployee, updateEmplyee, getEmployee, patchEmployee } = require('../controllers/employee-controller');
const { emailExist, documentExist, documentExistById } = require('../helpers/validation-db');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Employee:
 *    type: object
 *    properties:
 *     fullName:
 *      type: string
 *      description: The full name of employee
 *     documentType:
 *      type: string
 *      description: Can be CC, CE, PA, TI
 *     document:
 *      type: string
 *      description: Document of employee
 *     department:
 *      type: string
 *      description: Department of the company to which it belongs
 *     contractExpirationDate:
 *      type: string
 *      description: The date in that expire the contract
 *     position:
 *      type: string
 *      description: Profession performed in the company
 *     email:
 *      type: string
 *      description: Email of employee
 *     state:
 *      type: string
 *      description: Exist 3 states A(Actvate)|B(Block)|D(Delete). By Default is A
 *    required:
 *     - fullName
 *     - documentType
 *     - document
 *     - department
 *     - contractExpirationDate
 *     - position
 *     - email
 */

/**
 * @swagger
 * /apirest/Usuarios:
 *  post:
 *   summary: Crear nuevo empleado
 *   tags: [Employee]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Employee'
 *   responses:
 *    200:
 *     description: Empleado creado exitosamente!
 *    401:
 *     description: No se encontró token válido
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.post(
	'/',
	[
		validateJWT,
		check('fullName', 'El nombre es obligatorio!').not().isEmpty(),
		check('documentType', 'No es un tipo de documento valido!').not().isEmpty().isIn(['CC', 'TI', 'CE', 'PA']),
		check('document', 'El documento es obligatorio!').not().isEmpty().custom(documentExist),
		check('department', 'El nombre del departamento es obligatorio!').not().isEmpty(),
		check('contractExpirationDate', 'Debe ingresar una fecha válida!').not().isEmpty().isDate(),
		check('position', 'El cargo es obligatorio!').not().isEmpty(),
		check('email', 'el email es obligatorio').not().isEmpty().isEmail().custom(emailExist),
		validateFields,
	],
	createEmployee
);

/**
 * @swagger
 * /apirest/Usuarios/{document}:
 *  put:
 *   summary: Actualizar empleado
 *   tags: [Employee]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: document
 *      required: true
 *      description: Documento del empleado
 *      schema:
 *       type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Employee'
 *   responses:
 *    200:
 *     description: Empleado actualizado exitosamente!
 *    401:
 *     description: No se encontró token válido
 *    404:
 *     description: Datos ingresados de forma incorrecta
 *
 */
router.put(
	'/:document',
	[validateJWT, check('document', 'El documento es obligatorio!').not().isEmpty().custom(documentExistById), validateFields],
	updateEmplyee
);

/**
 * @swagger
 * /apirest/Usuarios/{document}:
 *  get:
 *   summary: Obtener empleado
 *   tags: [Employee]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: document
 *      required: true
 *      description: Documento del empleado
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Empleado actualizado exitosamente!
 *    401:
 *     description: No se encontró token válido
 *    404:
 *     description: Datos ingresados de forma incorrecta
 *
 */
router.get('/:document', [validateJWT, check('document').custom(documentExistById), validateFields], getEmployee);

/**
 * @swagger
 * /apirest/Usuarios/{document}/{departureDate}:
 *  patch:
 *   summary: Borrar empleado
 *   tags: [Employee]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: document
 *      required: true
 *      description: Documento del empleado
 *      schema:
 *       type: string
 *    - in: path
 *      name: departureDate
 *      required: true
 *      description: Fecha de retiro del empleado
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Empleado actualizado exitosamente!
 *    401:
 *     description: No se encontró token válido
 *    404:
 *     description: Datos ingresados de forma incorrecta
 *
 */
router.patch('/:document/:departureDate', [validateJWT, check('document').custom(documentExistById), validateFields], patchEmployee);

module.exports = router;
