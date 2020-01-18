import React, { Component } from 'react'
import axios from 'axios'
import InvoiceCard from '../cards/InvoiceCard'


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
            <div className='allCards'>
                <br />
                <br />
                {this.state.invoiceList.map((invoice) => {
                    const linkId = `/all-invoices/${invoice._id}`
                    const invoiceId = invoice._id
                    return (
                        <div
                            key={invoice._id}>

                            <InvoiceCard
                                note={invoice.notes}
                                invoiceLink={linkId}
                                amount={invoice.amount}
                                deleteInvoice={() => this.onInvoiceDeleteClick(invoiceId)}
                                customerId={invoice.customerId}
                                paid={invoice.paymentConfirmed}
                            />
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}