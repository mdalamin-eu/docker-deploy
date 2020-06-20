const User= require('../models/User')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')
const AWS= require('aws-sdk')
const { registerUserEmail } = require('../helpers/emailSend')


AWS.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:'eu-central-1'
})

const ses = new AWS.SES({apiVersion:'2010-12-01'})



exports.registerAdd = async(req,res)=>{
const {
    firstname,
    lastname,
    email, 
    password,
   phone,
    address,
    birthdate
}=req.body

try{
    const existUser= await User.findOne({email})
    if(existUser){
        return res.status(400).send('user already exists')
    }


    const user = new User({
        firstname,
        lastname,
        email,
        password,
        address,
        phone,
        birthdate
    })

    const salt = await bcrypt.genSalt(10)
    user.password= await bcrypt.hash(password, salt)

    


    const hashpassword = user.password
    
    const payload ={
        firstname,
        lastname,
        email,
        hashpassword,
        phone,
        address,
        birthdate
    }
const token = jwt.sign(payload, process.env.JWT_SCREET,{expiresIn:'1h'})
const params = registerUserEmail(token,email)
console.log(params)
const  sendEmailonRegister = ses.sendEmail(params).promise();


sendEmailonRegister.then(data =>{
    res.status(200).send({
        'message':`Email has been sent to ${email}, Follow the instructions to compelete your registration`
    })
})
.catch(err => {
    console.log(err)
})

}
catch(err){
    console.log(err)
}
}


//register
exports.registeractivate = async(req, res)=>{
    const {token}= req.body
    if(!token) 
    res.status(400).send({
        'message':'sorry token is missing'
    })

jwt.verify(token,process.env.JWT_SCREET, async(err, decode) => {
    if(err){
        res.status(404).send({
            'message': 'Invalid token'
        })
    }
    const { firstname, lastname, email, hashpassword, birthdate, address, phone} = jwt.decode(token)
    try{
        const existUser =await User.findOne({email})
        if(existUser){
            return res.status(400).send({
                'message':'User token allready taken'
            })
        }
        const user = new User({
            firstname, lastname, hashpassword, email, address, phone, birthdate
        })
        user.save((err, newUser=>{
            if(err){
                console.log(err)
            }
            return res.status(200).send({
                'message':'You are registerd'
            })
        }))
    }
    catch(error){
        console.log(error)
    }
})
}

//Login Form

exports.Login = async(req, res) => {
    const {email, password } = req.body

    try {
        
        const findUser = await User.findOne({email})
        
        if(!findUser){
            res.status(404).send({
                'message':"Sorry user not found register first"
            })
        }

        const isMatch = await bcrypt.compare(password,findUser. hashpassword)
        if(!isMatch){
            res.status(400).send({
                'message':'Sorry password did not matched'
            })
        }
        
        //token create
        const user = {id:findUser.id, lastname:findUser.lastname, email:findUser.email, loggedin:true}

        jwt.sign(user, process.env.JWT_SCREET,{expiresIn:'1h'},(err,token) =>{
            if(err){
                res.status(500).send({
                    'message':"Something went wrong"
                })
            }
            res.status(200).send({
                user,
                token
            })
        })

    } catch (error) {
        
    }
}

exports.getUserList=(req, res) =>{
    User.find({}).exec((err, results)=>{
        if(err){
            return res.json(err)
        }
        return res.json(results)
    })
}