import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
            <div>
                <h1>
                    Inventory
                </h1>
                {this.state.inventoryList.map((piece) => {
                    const pieceLinkId = `/inventory/${piece._id}`
                    const pieceId = piece._id
                    return (
                        <div
                            key={piece._id}>
                            <Link
                                to={pieceLinkId}
                            >
                                <h3>
                                    {piece.name}
                                </h3>
                            </Link>
                            <button
                                onClick={() => this.onPieceDeleteClick(pieceId)}
                            >Delete Item</button>
                            <br />
                            <p>_______________</p>
                        </div>
                    )
                })}
                <Link to="/inventory/new-piece">Add New Piece To Inventory</Link>
                <br />
                <br />
                <Link to="/">Dashboard</Link>
            </div>
        )
    }
}