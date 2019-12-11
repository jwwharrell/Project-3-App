import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AddNewInventoryItem extends Component {
    state = {
        newName: '',
        newProduct: '',
        newSize: '',
        newColor: ''
    }

    creatNewPiece = () => {
        const newPiece = {
            name: this.state.newName,
            product: this.state.newProduct,
            size: this.state.newSize,
            color: this.state.newColor
        }
        axios.post('/api/inventory', newPiece)
    }

    onNewNameChange = (event) => {
        const newName = event.target.value;
        this.setState({ newName })
    }

    onNewProductChange = (event) => {
        const newProduct = event.target.value;
        this.setState({ newProduct })
    }

    onNewSizeChange = (event) => {
        const newSize = event.target.value;
        this.setState({ newSize })
    }

    onNewColorChange = (event) => {
        const newColor = event.target.value;
        this.setState({ newColor })
    }

    render() {
        return (
            <div className="form-container">
                <h2>Add New Clothing Item</h2>
                <form>
                    <input
                        type='text'
                        placeholder='Name'
                        name="newName"
                        required="required"
                        onChange={this.onNewNameChange}
                        value={this.state.newName}
                    />
                    <input type='text'
                        placeholder='Product'
                        name="newProduct"
                        required="required"
                        onChange={this.onNewProductChange}
                        value={this.state.newProduct}
                    />
                    <input type='text'
                        placeholder='Size'
                        name="newSize"
                        required="required"
                        onChange={this.onNewSizeChange}
                        value={this.state.newSize}
                    />
                    <input type='text'
                        placeholder='Color'
                        name="newColor"
                        required="required"
                        onChange={this.onNewColorChange}
                        value={this.state.newColor}
                    />
                    <input
                        type='submit'
                        onClick={() => this.creatNewPiece()}
                    />
                </form>
                <br />
                <br />
                <Link to='/'>Home</Link>
            </div>
        )
    }
}