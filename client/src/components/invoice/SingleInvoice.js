import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleInvoice extends Component {
    state = {

        updatedInvoice: {
            amount: '',
            dateOfService: '',
            notes: '',
            paymentConfirmed: '',
            customerId: ''
        },
        customerInfo: '',
    }

    componentDidMount() {
        this.refreshInvoice()

    }

    refreshInvoice = () => {
        const invoice = this.props.match.params.invoiceId
        axios.get(`/api/invoice/${invoice}`)
            .then((res) => {
                this.setState({ updatedInvoice: res.data })
                axios.get(`/api/customer/${this.state.updatedInvoice.customerId}`)
                    .then((res) => {
                        this.setState({ customerInfo: res.data.singleCustomer })
                    })
            })
    }

    onUpdateInvoice = (event) => {
        event.preventDefault()
        const invoiceId = this.state.updatedInvoice._id
        axios.put(`/api/invoice/${invoiceId}`, this.state.updatedInvoice)
    }

    onNewInvoiceAmountChange = (event) => {
        const newInvoiceAmount = event.target.value
        const previousState = { ...this.state }
        previousState.updatedInvoice.amount = newInvoiceAmount
        this.setState(previousState)
    }

    onNewInvoiceDateChange = (event) => {
        const newInvoiceDate = event.target.value
        const previousState = { ...this.state }
        previousState.updatedInvoice.dateOfService = newInvoiceDate
        this.setState(previousState)
    }

    onNewInvoiceNoteChange = (event) => {
        const newInvoiceNote = event.target.value
        const previousState = { ...this.state }
        previousState.updatedInvoice.notes = newInvoiceNote
        this.setState(previousState)
    }

    onNewPaymentConfirmedChange = (event) => {
        console.log(event.target.value)
        const newPaymentConfirmed = event.target.value
        const previousState = { ...this.state }
        previousState.updatedInvoice.paymentConfirmed = newPaymentConfirmed
        this.setState(previousState)
    }

    render() {
        const selectedInvoice = this.state.updatedInvoice
        const customerInfo = this.state.customerInfo


        return (
            <div>
                <h1>{customerInfo.firstName} {customerInfo.lastName}</h1>
                <h2>{selectedInvoice.notes}</h2>
                <h3>${selectedInvoice.amount}</h3>
                <h3>Date:</h3>
                <h4>{selectedInvoice.dateOfService}</h4>
                <div className="form-container">
                    <form onSubmit={this.onUpdateInvoice}>
                        <input
                            type='number'
                            name="newInvoiceAmount"
                            required="required"
                            onChange={this.onNewInvoiceAmountChange}
                            value={this.state.updatedInvoice.amount}
                        />
                        <input
                            type='date'
                            name="newInvoiceDate"
                            required="required"
                            onChange={this.onNewInvoiceDateChange}
                            value={this.state.updatedInvoice.dateOfService}
                        />
                        <input
                            type='text'
                            name="newInvoiceNote"
                            required="required"
                            onChange={this.onNewInvoiceNoteChange}
                            value={this.state.updatedInvoice.notes}
                        /><span> Client Paid: </span>
                        <span>
                            <input
                                type='radio'
                                name="newPaymentConfirmed"
                                onChange={this.onNewPaymentConfirmedChange}
                                value={true}
                            /> Yes
                        </span>
                        <span>
                            <input
                                type='radio'
                                name="newPaymentConfirmed"
                                onChange={this.onNewPaymentConfirmedChange}
                                value={false}
                            /> No
                        </span>
                        <br />
                        <input
                            type='submit'
                            value="update"
                        />
                    </form>
                </div>
            </div>
        )
    }
}