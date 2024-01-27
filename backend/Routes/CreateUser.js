const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = 'MyNameIsKhushalGarg'

router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



router.post('/createuser',[
    body('email','incorrect email').isEmail(),
    body('name','incorrect name').isLength({min:5}),
    body('password','incorrect password').isLength({min:5})],
    async(req,resp)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return resp.status(400).json({errors: errors.array()})
    }

    const salt =await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password,salt)

    try{
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })

        resp.json({success:true})
    }catch(err){
        console.log(err)
        resp.json({success:false})

    }
})

router.post('/loginuser',[
    body('email','incorrect email').isEmail(),
    body('password','incorrect password').isLength({min:5})], 
    async(req,resp)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return resp.status(400).json({errors: errors.array()})
    }

    let email = req.body.email
    try{
        let userData = await User.findOne({email})
        if(!userData){
            return resp.status(400).json({errors: "try logging with correct credentials"})
        }
        // comparing the login password with the password stored using bycrpt 
        const pwdCompare =await bcrypt.compare(req.body.password, userData.password)
        if(!pwdCompare ){
            return resp.status(400).json({errors: "try logging with correct credentials"})
        }

        const data ={
            user:{
                id: userData.id,
            }
        }
        const authToken= jwt.sign(data,jwtSecret)

        resp.json({success:true,authToken:authToken})
    }catch(err){
        console.log(err)
        resp.json({success:false})

    }
})

module.exports = router