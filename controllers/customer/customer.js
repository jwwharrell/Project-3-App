const express = require('express')

const customerApi = require('../../models/customer/customer.js')

const inventoryApi = require('../../models/inventory/inventory.js')

const invoiceApi = require('../../models/invoice/invoice.js')

const customerRouter = express.Router()


//Get All
customerRouter.get('/', (req, res) => {
  customerApi.getAllCustomers()
    .then((allCustomers) => {
      res.json(allCustomers)
    })
})

//Get One
customerRouter.get('/:customerId', (req, res) => {
  customerApi.getCustomerById(req.params.customerId)
    .then((singleCustomer) => {
        // inventoryApi.getAllInventorysByCustomerId(req.params.customerId)
        //   .then((heldItem) => {
        //     invoiceApi.getAllInvoicesByCustomerId(req.params.customerId)
        //       .then((customerInvoice) => {
        //         res.json({singleCustomer, heldItem, customerInvoice})
        //       })
        //   })
        res.json(singleCustomer)
      })
})

//Create One
customerRouter.post('/', (req, res) => {
  customerApi.addNewCustomer(req.body) 
    .then((newCustomer) => {
      res.json(newCustomer)
    })
})

//Update One
customerRouter.put('/:customerId', (req, res) => {
  customerApi.updateCurrentCustomer(req.params.customerId, req.body)
    .then((oneCustomer) => {
      res.json(oneCustomer)
    }) 
})

//Delete One
customerRouter.delete('/:customerId', (req, res) => {
  customerApi.deleteCurrentCustomer(req.params.customerId)
    .then((deletedCustomer) => {
      res.json(deletedCustomer)
    })
})


module.exports = {
  customerRouter
}