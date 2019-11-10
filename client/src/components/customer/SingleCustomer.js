import React, { Component } from 'react'
import axios from 'axios'

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
                console.log('React Single Customer')
                console.log(res.data)
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
        return (
            <div>

            </div>
        )
    }
}
