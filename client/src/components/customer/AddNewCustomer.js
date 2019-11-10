import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class AddNewCustomer extends Component {
    state = {
        newCustomerFirstName: '',
        newCustomerLastName: '',
        newCustomerStyleProfile: ''
    }

    creatNewCustomer = () => {
        const newCustomer = {
            firstName: this.state.newCustomerFirstName,
            lastName: this.state.newCustomerLastName,
            styleProfile: this.state.newCustomerStyleProfile
        }
        axios.post('/api/customer', newCustomer)
    }

    onNewCustomerFirstNameChange = (event) => {
        const newCustomerFirstName = event.target.value;
        this.setState({newCustomerFirstName})
    }

    onNewCustomerLastNameChange = (event) => {
        const newCustomerLastName = event.target.value;
        this.setState({newCustomerLastName})
    }

    onNewCustomerStyleProfileChange = (event) => {
        const newCustomerStyleProfile = event.target.value;
        this.setState({newCustomerStyleProfile})
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        type='text'
                        placeholder='Customer First Name'
                        name="newCustomerFirstName"
                        required="required"
                        onChange={this.onNewCustomerFirstNameChange}
                        value={this.state.newCustomerFirstName}
                    />
                    <input type='text'
                        placeholder='Customer Last Name'
                        name="newCustomerLastName"
                        required="required"
                        onChange={this.onNewCustomerLastNameChange}
                        value={this.state.newCustomerLastName}
                    />
                    <input type='text'
                        placeholder='Style Profile'
                        name="newCustomerStyleProfile"
                        required="required"
                        onChange={this.onNewCustomerStyleProfileChange}
                        value={this.state.newCustomerStyleProfile}
                    />
                    <input
                        type='submit'
                        onClick={() => this.creatNewCustomer()}
                    />
                </form>
                <Link to='/customer'>All Clients</Link>
            </div>
        )
    }
}