import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleInventoryItem extends Component {
    state = {
        updatedItem: {
            name: '',
            product: '',
            size: '',
            color: '',
            customerId: ''
        },
        allCostumers: [],
        holderOfPiece: ''

    }


    componentDidMount() {
        this.refreshItem()
        this.getAllCostumersForDropDown()
    }

    refreshItem = () => {
        const item = this.props.match.params.inventoryId
        axios.get(`/api/inventory/${item}`)
            .then((res) => {
                this.setState({ updatedItem: res.data })
            })

    }

    getAllCostumersForDropDown = () => {
        axios.get('/api/customer')
            .then((res) => {
                this.setState({ allCostumers: res.data })
            })
    }

    onUpdateItem = (event) => {
        event.preventDefault()
        const itemId = this.state.updatedItem._id
        axios.put(`/api/inventory/${itemId}`, this.state.updatedItem)
    }

    onNewItemNameChange = (event) => {
        const newItemName = event.target.value
        const previousState = { ...this.state }
        previousState.updatedItem.name = newItemName
        this.setState(previousState)
    }

    onNewItemProductChange = (event) => {
        const newItemProduct = event.target.value
        const previousState = { ...this.state }
        previousState.updatedItem.product = newItemProduct
        this.setState(previousState)
    }

    onNewItemSizeChange = (event) => {
        const newItemSize = event.target.value
        const previousState = { ...this.state }
        previousState.updatedItem.size = newItemSize
        this.setState(previousState)
    }

    onNewItemColorChange = (event) => {
        const newItemColor = event.target.value
        const previousState = { ...this.state }
        previousState.updatedItem.color = newItemColor
        this.setState(previousState)
    }

    onNewCustomerHoldChange = (event) => {
        const newCustomerHold = event.target.value
        const previousState = { ...this.state }
        if (newCustomerHold === '--Assign To Client--') {
            previousState.holderOfPiece = ''
            this.setState(previousState)
        } else {
            previousState.updatedItem.customerId = newCustomerHold
            this.setState(previousState)
            const customerId = this.state.updatedItem.customerId
            axios.get(`/api/customer/${customerId}`)
                .then((res) => {
                    this.setState({ holderOfPiece: res.data.singleCustomer })
                })
        }
    }

    render() {
        const selectedItem = this.state.updatedItem
        const customer = this.state.holderOfPiece
        return (
            <div>
                <h1>{selectedItem.name}</h1>
                <h3>Product: {selectedItem.product}</h3>
                <h3>Size: {selectedItem.size}</h3>
                <h3>Color: {selectedItem.color}</h3>
                <h3>Current Holder of Piece: {customer.firstName} {customer.lastName}</h3>
                <div className="form-container">
                    <form onSubmit={this.onUpdateItem}>
                        <input
                            type='text'
                            name="newItemName"
                            required="required"
                            onChange={this.onNewItemNameChange}
                            value={this.state.updatedItem.name}
                        />
                        <input
                            type='text'
                            name="newItemProduct"
                            required="required"
                            onChange={this.onNewItemProductChange}
                            value={this.state.updatedItem.product}
                        />
                        <input
                            type='text'
                            name="newItemSize"
                            required="required"
                            onChange={this.onNewItemSizeChange}
                            value={this.state.updatedItem.size}
                        />
                        <input
                            type='text'
                            name="newItemColor"
                            required="required"
                            onChange={this.onNewItemColorChange}
                            value={this.state.updatedItem.color}
                        />
                        <select
                            onChange={this.onNewCustomerHoldChange}
                        >
                            <option
                            >--Assign To Client--</option>

                            {this.state.allCostumers.map((customer) => {
                                return (
                                    <option
                                        key={customer._id}
                                        value={customer._id}
                                    >{customer.firstName} {customer.lastName}</option>
                                )
                            })}
                        </select>
                        <input
                            type='submit'
                            value="update"
                        />
                    </form>
                </div>
            </div>
        )
    }
}