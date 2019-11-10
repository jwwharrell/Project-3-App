import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

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
                this.setState({customerList: res.data})
            })
    }

    render() {
        return (
            <div>
            <h1>Clients</h1>
            <Link>Add New Client</Link>
            <p>_______________</p>
                {this.state.customerList.map((client) => {
                    return (
                        <div>
                            <Link>
                            <h3>{client.firstName} {client.lastName}</h3>
                            </Link>
                            <button>Delete Client</button>
                            <br/>
                            <p>_______________</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
