import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';


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
                <Link to="/inventory/new-piece">Add New Piece To Inventory</Link>
                <p>_______________</p>
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
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.onPieceDeleteClick(pieceId)}
                            >Delete Item</Button>
                            <br />
                            <p>_______________</p>
                        </div>
                    )
                })}
                <br />
                <br />
            </div>
        )
    }
}