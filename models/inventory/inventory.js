const mongoose = require('../connection.js')

const InventorySchema = new mongoose.Schema({
    name: String,
    product: String,
    size: String,
    color: String,
    customerId: mongoose.Types.ObjectId
})


const InventoryCollection = mongoose.model('Inventory', InventorySchema)

const getAllInventory = () => {
    return InventoryCollection.find({})
}

const getInventoryById = (inventoryId) => {
    return InventoryCollection.findById(inventoryId)
}

const getAllInventoryByCustomerId = (customerId) => {
    return InventoryCollection.find({ customerId: customerId })
}

const addNewInventory = (newInventory) => {
    return InventoryCollection.create(newInventory)
}


const updateCurrentInventory = (inventoryId, updatedInventory) => {
    return InventoryCollection.updateOne({ _id: inventoryId }, updatedInventory)
}

const deleteCurrentInventory = (inventoryId) => {
    return InventoryCollection.deleteOne({ _id: inventoryId })
}


module.exports = {
    getAllInventory,
    getInventoryById,
    getAllInventoryByCustomerId,
    addNewInventory,
    updateCurrentInventory,
    deleteCurrentInventory
}
