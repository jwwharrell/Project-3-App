import React, { Component } from 'react'
import axios from 'axios'

export default class SingleInvoice extends Component {
    state = {

        updatedInvoice: {
            amount: '',
            dateOfService: '',
            notes: ''
        }

    }

    componentDidMount() {
        this.refreshInvoice()
    }

    refreshInvoice = () => {
        const invoice = this.props.match.params.invoiceId
        axios.get(`/api/invoice/${invoice}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ updatedInvoice: res.data })
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

    render() {
        const selectedInvoice = this.state.updatedInvoice
        return (
            <div>
                <h1>{selectedInvoice.dateOfService}</h1>
                <h3>${selectedInvoice.amount}</h3>
                <h3>Notes:</h3>
                <h4>{selectedInvoice.notes}</h4>
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
                    />
                    <input
                        type='submit'
                        value="update"
                    />
                </form>
            </div>
        )
    }
}