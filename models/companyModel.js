const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  recruiters: [{
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: 'Recruiter'
    },
    position: {
      type: String,
      required: true
    }
  }]
})

module.exports = mongoose.model('Company', companySchema)