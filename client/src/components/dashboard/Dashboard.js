import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import Header from '../materialLayouts/Header.js'
import Footer from '../materialLayouts/Footer.js'


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header />
                {/* <Link to='/customer'><h2>Clients</h2></Link>
                <Link to='/inventory'><h2>Inventory</h2></Link>
                <Link to='/all-invoices'><h2>Invoices</h2></Link> */}
                <Footer />
            </div>
        )
    }
}
