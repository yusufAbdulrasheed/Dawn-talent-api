const User = require('../models/userModel').User
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const registerUser = async(req, res)=>{
  try{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status( 401).json({
        success:false,
        msg: 'Errors',
        errors: errors.array()
      })
    }

    const { name, email, password, role} = req.body

    // console.log(User)
    const isExistUser = await User.findOne({ email })
    if(isExistUser){
      return res.status(401).json({
        success: false,
        msg: "Email already exist"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 15)

    const user = new User({
      name,
      email,
      password:hashedPassword,
      role
    })

    const userData = await user.save()

    return res.status(201).json({
      success: true,
      msg: "User Registered Successfully",
      data: userData
    })

  }
  catch(error){
      return res.status(400).json({
        success: false,
        msg: error.message
      })
  }
}


const generateAccessToken = async(user) =>{
  const token =jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {expiresIn: "1h"})
  return token
}

const loginUser = async(req, res)=>{
  try{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status( 401).json({
        success:false,
        msg: 'Errors',
        errors: errors.array()
      })
    }
    const { email, password} = req.body
    const userData = await User.findOne({ email })

    if(!userData){
      return res.status(401).json({
        success: false,
        msg: 'incorrect Email & Password'
      })
    }

    const isPassword = await bcrypt.compare(password, userData.password)

    if(!isPassword){
      return res.status(401).json({
        success: false,
        msg: 'Incorrect password'
      })

    }
    const accessToken = await generateAccessToken({ user: userData })
    return res.status(201).json({
      success: true,
      msg: 'Login Successfully ',
      accessToken: accessToken,
      tokenType: "Bearer",
      data: userData
    })
    

  }
  catch(error){
      return res.status(400).json({
        success: false,
        msg: error.message
      })
  }
}

module.exports = {
  registerUser,
  loginUser
}