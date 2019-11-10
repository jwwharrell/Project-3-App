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
             this.setState({updatedCustomer: res.data})
         })
     }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
