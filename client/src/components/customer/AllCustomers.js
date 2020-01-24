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
                this.setState({ customerList: res.data })
            })
    }

    onCustomerDeleteClick = (customerId) => {
        axios.delete(`/api/customer/${customerId}`)
            .then(() => {
                this.refreshCustomer()
            })
    }

    handleChange = (e) => {
        let allCustomerData = this.state.customerList
        let currentList = []
        let newList = []
        if (e.target.value !== '') {
            for (let i = 0; i < allCustomerData.length; i++) {
                currentList.push(allCustomerData[i].firstName + ' ' + allCustomerData[i].lastName)
            }
            newList = currentList.filter((item) => {
                const lowerCaseIncomingItem = item.toLowerCase();
                const lowerCaseTextField = e.target.value.toLowerCase();
                return lowerCaseIncomingItem.includes(lowerCaseTextField)
            })
        } else {
            for (let i = 0; i < allCustomerData.length; i++) {
                currentList.push(allCustomerData[i].firstName + ' ' + allCustomerData[i].lastName)
            }
            newList = currentList
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
                {this.state.customerList.map((client) => {
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
