import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default class SingleCustomer extends Component {

    state = {
        updatedCustomer: {
            firstName: '',
            lastName: '',
            styleProfile: ''
        },
        heldItems: [],
        invoiceList: []

    }

    componentDidMount() {
        this.refreshCustomer()
    }

    refreshCustomer = () => {
        const customer = this.props.match.params.customerId
        axios.get(`/api/customer/${customer}`)
            .then((res) => {
                this.setState({ updatedCustomer: res.data.singleCustomer })
                this.setState({ heldItems: res.data.heldItem })
                this.setState({ invoiceList: res.data.customerInvoice })
            })
    }

    onUpdateCustomer = (event) => {
        event.preventDefault()
        const uCustomer = this.state.updatedCustomer._id
        axios.put(`/api/customer/${uCustomer}`, this.state.updatedCustomer)
    }

    onNewCustomerFirstNameChange = (event) => {
        const newCustomerFirstName = event.target.value
        const previousState = { ...this.state }
        previousState.updatedCustomer.firstName = newCustomerFirstName
        this.setState(previousState)
    }

    onNewCustomerLastNameChange = (event) => {
        const newCustomerLastName = event.target.value
        const previousState = { ...this.state }
        previousState.updatedCustomer.lastName = newCustomerLastName
        this.setState(previousState)
    }

    onNewCustomerStyleProfileChange = (event) => {
        const newCustomerStyleProfile = event.target.value
        const previousState = { ...this.state }
        previousState.updatedCustomer.styleProfile = newCustomerStyleProfile
        this.setState(previousState)
    }

    render() {
        const selectedCustomer = this.state.updatedCustomer
        const addInvoiceLink = `/all-invoices/create-invoice/${selectedCustomer._id}`
        return (
            <div className='singleView'>
                <h1>{selectedCustomer.firstName} {selectedCustomer.lastName}</h1>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                >
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Holding Current Items:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {this.state.heldItems.map((item) => {
                                    const singleItemLink = `/inventory/${item._id}`
                                    return (
                                        <div>
                                            <Link to={singleItemLink}>{item.name}</Link>
                                        </div>
                                    )
                                })}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Style Profile:
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {selectedCustomer.styleProfile}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Invoices:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {this.state.invoiceList.map((invoice) => {
                                    const singleInvoiceLink = `/all-invoices/${invoice._id}`
                                    return (
                                        <div>
                                            <ul>
                                                <li>
                                                    <p>__________</p>
                                                    <Link to={singleInvoiceLink}><h4>${invoice.amount}</h4></Link>
                                                    <h5>{invoice.dateOfService}</h5>
                                                    <p>{invoice.notes}</p>
                                                    <p>__________</p>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <div className="form-container">
                    <form onSubmit={this.onUpdateCustomer}>
                        <input
                            type='text'
                            name="newCustomerFirstName"
                            required="required"
                            onChange={this.onNewCustomerFirstNameChange}
                            value={this.state.updatedCustomer.firstName}
                        />
                        <input
                            type='text'
                            name="newCustomerLastName"
                            required="required"
                            onChange={this.onNewCustomerLastNameChange}
                            value={this.state.updatedCustomer.lastName}
                        />
                        <input
                            type='text'
                            name="newCustomerStyleProfile"
                            required="required"
                            onChange={this.onNewCustomerStyleProfileChange}
                            value={this.state.updatedCustomer.styleProfile}
                        />
                        <input
                            type='submit'
                            value="update"
                        />
                    </form>
                </div>
                <br />

                <Link
                    to={addInvoiceLink}
                >
                    Add Invoice
                </Link>
                <p>_______________</p>
                <Link to='/'>Home</Link>
            </div>
        )
    }
}
