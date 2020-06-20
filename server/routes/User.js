const express=require('express')
const router = express.Router()
const User = require('../controllers/User')
const {UserValidator} = require('../validator/User')
const {runValidation} = require('../validator/index')

router.post('/add',  UserValidator, runValidation, User.registerAdd)
router.post('/activate', User.registeractivate)
router.post('/login', User.Login)
router.get('/lists',User.getUserList)




module.exports= router
