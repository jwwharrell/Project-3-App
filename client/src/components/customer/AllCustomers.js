import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export default class AllCustomers extends Component {

    state = {
        customerList: [],
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


    render() {
        
        return (
            <div>
                <h1>Clients</h1>
                <Link to="/customer/create-customer">Add New Client</Link>
                <p>_______________</p>
                {this.state.customerList.map((client) => {
                    const singleCustomerLink = `/customer/${client._id}`
                    const customerId = client._id
                    return (
                        <div key={client._id}>
                            <Link to={singleCustomerLink}>
                                <h3>{client.firstName} {client.lastName}</h3>
                            </Link>
                            <Button
                            variant="contained" 
                            color="primary"
                            onClick={() => this.onCustomerDeleteClick(customerId)}
                            >Delete Client</Button>
                            <br />
                            <p>_______________</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
