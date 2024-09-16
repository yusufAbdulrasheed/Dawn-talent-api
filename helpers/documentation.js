const swaggerDocumentation = {
  openapi: "3.0.0",

  info:{
    title: "Dawn Talent API",
    version: "1.0.0",
    description: "This is an API for Dawn Talent Project",
    contact:{
      name: "Abdulrasheed Adinoyi Yusuf",
      email: "yusufabdulrasheed200@gmail.com",
    }
  },

  servers: [
    {
      url: "http://localhost:5000/",
      description: "Local Server"
    },
    {
      url: "http://productions",
      description: "Production Server"
    }
  ],
  tags:[
    {
      name: "Authentication API",
      description: "These API handles the Authentication Routes"
    }
  ],
  paths:{
    "/api/register": {
      post:{
        tags:["Authentication API"],
        description: "Register User"
      }
    }
  }
}

module.exports= swaggerDocumentation