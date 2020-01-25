import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import InventoryCard from '../cards/InventoryCard.js'
import TextField from '@material-ui/core/TextField'


export default class EntireInventory extends Component {
    state = {
        inventoryList: [],
        filteredList: []
    }

    componentDidMount() {
        this.refreshInventory()
    }

    refreshInventory = () => {
        axios.get('/api/inventory')
            .then((res) => {
                this.setState({ inventoryList: res.data, filteredList: res.data })
            })
    }

    onPieceDeleteClick = (inventoryId) => {
        axios.delete(`/api/inventory/${inventoryId}`)
            .then(() => {
                this.refreshInventory()
            })
    }

    handleChange = (e) => {
        let currentList = []
        let newList = []
        if (e.target.value !== '') {
            currentList = this.state.inventoryList
            newList = currentList.filter((item) => {
                const lowerCaseIncomingItem = item.name.toLowerCase()
                const lowerCaseTextField = e.target.value.toLowerCase()
                return lowerCaseIncomingItem.includes(lowerCaseTextField)
            })
        } else {
            newList = this.state.inventoryList
        }
        this.setState({filteredList: newList})
    }

    render() {
        return (
            <div className='allCards'>
                <form>
                    <TextField
                        id='standard-basic'
                        label='Search By Item Name'
                        onChange={this.handleChange}
                        />
                </form>
                <br />
                <Link to="/inventory/new-piece">Add New Piece To Inventory</Link>
                <br />
                {this.state.filteredList.map((piece) => {
                    const pieceLinkId = `/inventory/${piece._id}`
                    const pieceId = piece._id
                    return (
                        <div
                            key={piece._id}>
                            <InventoryCard
                                name={piece.name}
                                product={piece.product}
                                itemLink={pieceLinkId}
                                deleteItem={() => this.onPieceDeleteClick(pieceId)}
                            />
                            <br />
                        </div>
                    )
                })}
                <br />
                <br />
            </div>
        )
    }
}