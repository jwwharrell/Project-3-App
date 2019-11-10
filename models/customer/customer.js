const mongoose = require('../connection.js')

const CustomerSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  styleProfile: String
})

const CustomerCollection = mongoose.model('Customer', CustomerSchema)

const getAllCustomers = () => {
  return CustomerCollection.find({})
}

const getCustomerById = (customerId) => {
  return CustomerCollection.findById(customerId)
}

const addNewCustomer = (newCustomer) => {
  return CustomerCollection.create(newCustomer)
}


const updateCurrentCustomer = (customerId, updatedCustomer) => {
  return CustomerCollection.updateOne({ _id: customerId }, updatedCustomer)
}

const deleteCurrentCustomer = (customerId) => {
  return CustomerCollection.deleteOne({ _id: customerId })
}


module.exports = {
  getAllCustomers,
  getCustomerById,
  addNewCustomer,
  updateCurrentCustomer,
  deleteCurrentCustomer
}
