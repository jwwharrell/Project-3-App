import React, { Component } from 'react'
import axios from 'axios'

export default class SingleInventoryItem extends Component {
    state = {
        updatedItem: {
            name: '',
            product: '',
            size: '',
            color: ''
        }

    }

    
    componentDidMount() {
        this.refreshItem()
    }

    refreshItem = () => {
        const item = this.props.match.params.inventoryId
        axios.get(`/api/inventory/${item}`)
            .then((res) => {
                this.setState({ updatedItem: res.data })
            })
    }

    onUpdateItem = (event) => {
        event.preventDefault()
        const itemId = this.state.updatedItem._id
        axios.put(`/api/inventory/${itemId}`, this.state.updatedItem)
    }

    onNewItemNameChange = (event) => {
        const newItemName = event.target.value
        const previousState = {...this.state}
        previousState.updatedItem.name = newItemName
        this.setState(previousState)
    }

    onNewItemProductChange = (event) => {
        const newItemProduct = event.target.value
        const previousState = {...this.state}
        previousState.updatedItem.product = newItemProduct
        this.setState(previousState)
    }

    onNewItemSizeChange = (event) => {
        const newItemSize = event.target.value
        const previousState = {...this.state}
        previousState.updatedItem.size = newItemSize
        this.setState(previousState)
    }

    onNewItemColorChange = (event) => {
        const newItemColor = event.target.value
        const previousState = {...this.state}
        previousState.updatedItem.color = newItemColor
        this.setState(previousState)
    }
    

    render() {
        const selectedItem = this.state.updatedItem
        return (
            <div>
                <h1>{selectedItem.name}</h1>
                <h3>Product: {selectedItem.product}</h3>
                <h3>Size: {selectedItem.size}</h3>
                <h3>Color: {selectedItem.color}</h3>
                <h3>Current Holder of Piece:</h3>
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
                    <input
                        type='submit'
                        value="update"
                    />
                </form>
            </div>
        )
    }
}