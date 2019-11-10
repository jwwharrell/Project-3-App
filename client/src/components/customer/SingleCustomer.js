import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleCustomer extends Component {

    state = {
        updatedCustomer: {
            firstName: '',
            lastName: '',
            styleProfile: ''
        }
    }

    componentDidMount() {
        this.refreshCustomer()
    }

    refreshCustomer = () => {
        const customer = this.props.match.params.customerId
        axios.get(`/api/customer/${customer}`)
            .then((res) => {
                this.setState({ updatedCustomer: res.data })
            })
    }

    onUpdateCustomer = (event) => {
        event.preventDefault()
        const uCustomer = this.state.updatedCustomer._id
        axios.put(`/customer/${uCustomer}`, this.state.updatedCustomer)
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
        return (
            <div>
                <h1>{selectedCustomer.firstName} {selectedCustomer.lastName}</h1>
                <h3>{selectedCustomer.styleProfile}</h3>
                <h3>Holding Current Items:</h3>
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
                <p>_______________</p>
                <Link to='/customer'>All Clients</Link>
            </div>
        )
    }
}
