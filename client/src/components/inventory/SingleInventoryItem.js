import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

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
    }

    refreshItem = () => {
        const item = this.props.match.params.inventoryId
        let updatedItem
        let allCustomers
        let holderOfPiece

        axios.get(`/api/inventory/${item}`)
            .then((res) => {
                updatedItem = res.data
                axios.get('/api/customer')
                    .then((res) => {
                        allCustomers = res.data
                        if (updatedItem.customerId !== '') {
                            for (let i = 0; i < allCustomers.length; i++) {
                                if (updatedItem.customerId === allCustomers[i]._id) {
                                    holderOfPiece = allCustomers[i]
                                }
                            }
                        } else {
                            holderOfPiece = ''
                        }
                        this.setState({
                            updatedItem: updatedItem,
                            allCostumers: allCustomers,
                            holderOfPiece: holderOfPiece
                        })
                    })
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
            <div className='singleView'>
                <h1>{selectedItem.name}</h1>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                >
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Product:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {selectedItem.product}
                            </Typography>
                            <br />
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Size:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {selectedItem.size}
                            </Typography>
                            <br />
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Color:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {selectedItem.color}
                            </Typography>
                        </CardContent>
                    </Card>
                    {this.state.holderOfPiece ? 
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Current Holder:
                            </Typography>
                            <Typography variant="h5" component="h2">
                                <Link to={`/customer/${customer._id}`}>{customer.firstName} {customer.lastName}</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                    : null
                    }
                    
                </Grid>
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
                            <option>Test</option>
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