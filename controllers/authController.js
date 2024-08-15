const User = require('../models/userModel').User
const { validationResult } = require('express-validator')

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

module.exports = {
  registerUser
}