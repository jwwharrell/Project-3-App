import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Link to='/customer'><h2>Clients</h2></Link>
                <Link to='/inventory'><h2>Inventory</h2></Link>
                <Link to='/all-invoices'><h2>Invoices</h2></Link>
            </div>
        )
    }
}
