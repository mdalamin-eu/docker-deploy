const {check} = require('express-validator')

exports.UserValidator=[
    check('firstname')
    .not()
    .isEmpty()
    .withMessage('First name is required'),

    check('lastname')
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters give in Lastname'),
    

    check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required'),

    check('password')
    .not()
    .isEmpty()
    .withMessage('Password should not be empty')
    .isLength({ min: 8 })
    .withMessage('minimum eight characters ')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/,"i")
    .withMessage('at least one letter, one number and one special character'),

    check('phone')
    .not()
    .isEmpty()
    .withMessage('Phone no is required')
    .isNumeric()
    .withMessage('You have to put must be number in Phone-number')
    .isLength({ min: 10 })
    .withMessage('Must be phone no at least 10 number '),

    check('address')
    .not()
    .isEmpty()
    .withMessage('Address is required')
    .isLength({min:10})
    .withMessage('Minimum 10 characters give in address'),

    check('birthdate')
    .not()
    .isEmpty()
    .withMessage('Birthdate is required')
    

]