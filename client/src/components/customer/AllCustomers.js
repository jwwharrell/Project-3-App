import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CustomerCard from '../cards/CustomerCard.js'
import TextField from '@material-ui/core/TextField'

export default class AllCustomers extends Component {

    state = {
        customerList: [],
        filteredList: []
    }

    componentDidMount() {
        this.refreshCustomer()
    }

    refreshCustomer = () => {
        axios.get('/api/customer')
            .then((res) => {
                this.setState({ customerList: res.data, filteredList: res.data })
            })
    }

    onCustomerDeleteClick = (customerId) => {
        axios.delete(`/api/customer/${customerId}`)
            .then(() => {
                this.refreshCustomer()
            })
    }

    handleChange = (e) => {
        let currentList = []
        let newList = []
        if (e.target.value !== '') {
            currentList = this.state.customerList
            newList = currentList.filter((item) => {
                const lowerCaseIncomingItem = item.firstName.toLowerCase() + ' ' + item.lastName.toLowerCase();
                const lowerCaseTextField = e.target.value.toLowerCase();
                return lowerCaseIncomingItem.includes(lowerCaseTextField)
            })
        } else {
            newList = this.state.customerList
        }
        this.setState({filteredList: newList})
    }


    render() {

        return (
            <div className='allCards'>
                <form>
                    <TextField 
                        id='standard-basic'
                        label='Search By Client Name'
                        onChange={this.handleChange}
                        />
                </form>
                <br />
                <Link to="/customer/create-customer">Add New Client</Link>
                <br />
                {this.state.filteredList.map((client) => {
                    const singleCustomerLink = `/customer/${client._id}`
                    const customerId = client._id
                    return (
                        <div key={client._id}>
                            <CustomerCard
                                cfn={client.firstName}
                                cln={client.lastName}
                                customerLink={singleCustomerLink}
                                stylePro={client.styleProfile}
                                deleteCustomer={() => this.onCustomerDeleteClick(customerId)}
                            />
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}
