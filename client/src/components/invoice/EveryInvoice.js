import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class EveryInvoice extends Component {
    state = {
        invoiceList: []
    }

    componentDidMount() {
        this.refreshInvoice()
    }

    refreshInvoice = () => {
        axios.get('/api/invoice')
            .then((res) => {
                this.setState({ invoiceList: res.data })
            })
    }

    onInvoiceDeleteClick = (invoiceId) => {
        axios.delete(`/api/invoice/${invoiceId}`)
            .then(() => {
                this.refreshInvoice()
            })
    }

    render() {
        return (
            <div>
                <h1>Invoices</h1>
                {this.state.invoiceList.map((invoice) => {
                    const linkId = `/all-invoices/${invoice._id}`
                    const invoiceId = invoice._id
                    return (
                        <div
                            key={invoice._id}>
                            <span>
                                <Link
                                    to={linkId}
                                >
                                    {invoice.dateOfService}
                                </Link>
                                <button
                                    onClick={() => this.onInvoiceDeleteClick(invoiceId)}
                                >x</button>
                            </span>
                            <br />
                            <br />
                        </div>
                    )
                })}
                <Link to="/">Dashboard</Link>
            </div>
        )
    }
}