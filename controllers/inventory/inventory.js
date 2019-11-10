const express = require('express')

const inventoryApi = require('../../models/inventory/inventory.js')

const inventoryRouter = express.Router()


//Get All
inventoryRouter.get('/', (req, res) => {
  inventoryApi.getAllInventory()
    .then((allInventory) => {
      res.json(allInventory)
    })
})

//Get One
inventoryRouter.get('/:inventoryId', (req, res) => {
  inventoryApi.getInventoryById(req.params.inventoryId)
    .then((singleInventory) => {
      res.json(singleInventory)
    })
})

//Create One
inventoryRouter.post('/', (req, res) => {
  inventoryApi.addNewInventory(req.body)
    .then((newPiece) => {
      res.json(newPiece)
    })
})

//Update One
inventoryRouter.put('/:inventoryId', (req, res) => {
  inventoryApi.updateCurrentInventory(req.params.inventoryId, req.body)
    .then((oneInventory) => {
      res.json(oneInventory)
    })
})

//Delete One
inventoryRouter.delete('/:inventoryId', (req, res) => {
  inventoryApi.deleteCurrentInventory(req.params.inventoryId)
    .then((deletedInventory) => {
      res.json(deletedInventory)
    })
})


module.exports = {
  inventoryRouter
}