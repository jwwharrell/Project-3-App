import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import InventoryCard from '../cards/InventoryCard.js'


export default class EntireInventory extends Component {
    state = {
        inventoryList: []
    }

    componentDidMount() {
        this.refreshInventory()
    }

    refreshInventory = () => {
        axios.get('/api/inventory')
            .then((res) => {
                this.setState({ inventoryList: res.data })
            })
    }

    onPieceDeleteClick = (inventoryId) => {
        axios.delete(`/api/inventory/${inventoryId}`)
            .then(() => {
                this.refreshInventory()
            })
    }

    render() {
        return (
            <div className='allCards'>
                <br />
                <Link to="/inventory/new-piece">Add New Piece To Inventory</Link>
                <br />
                {this.state.inventoryList.map((piece) => {
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