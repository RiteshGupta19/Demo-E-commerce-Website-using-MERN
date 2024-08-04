const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/auth-controller');
const {signupschema,loginschema} = require ('../validator/auth-validator')
const validate = require ('../middleware/validate-middleware')
const authmiddleware = require('../middleware/auth-middleware')

// router.get('/', (req, res) => {
//   res.status(200).send("Welcome to the authentication endpoint");
// });

router.route('/').get(authcontrollers.home);

router.route('/reg').post(validate(signupschema),authcontrollers.register);
router.route('/login').post(validate(loginschema),authcontrollers.login);
router.route('/user').get(authmiddleware, authcontrollers.user)

module.exports = router;
