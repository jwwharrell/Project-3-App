import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
            <div>
                <h1>{selectedCustomer.firstName} {selectedCustomer.lastName}</h1>
                <h3>{selectedCustomer.styleProfile}</h3>
                <h3>Holding Current Items:</h3>
                {this.state.heldItems.map((item) => {
                    const singleItemLink = `/inventory/${item._id}`
                    return (
                        <div>
                            <Link to={singleItemLink}>{item.name}</Link>
                            <p>_______________</p>
                            
                        </div>
                    )
                })}
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
                <br />
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
