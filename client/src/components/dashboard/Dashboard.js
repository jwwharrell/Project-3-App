import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import Header from '../materialLayouts/Header.js'
import Footer from '../materialLayouts/Footer.js'


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header />            
                <Footer />
            </div>
        )
    }
}
