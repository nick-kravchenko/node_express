var mongoose = require('mongoose');
var axios = require('axios');

class TransactionModel {
    constructor( transactionSchema = null,
                 Transaction = null ){
        this.setTransactionSchema();
    }
    setTransactionSchema() {
        this.transactionSchema = mongoose.Schema({
            steamID: String,
            tradeID: String,
            paymentID: String,
            email: String,
            walletNumber: String,
            ip: String,
            dateCreated: String,
            paymentSystem: String,
        });
        try{
            this.Transaction = mongoose.model( 'Transaction', this.transactionSchema );
        } catch (err) {
            console.log(err);
        }
    };
    create( data ) {
        let transaction = new this.Transaction( data );

        transaction.save()
            .then((newTransaction) => console.log(newTransaction))
            .catch((err) => console.error(err));
    };
    getTransaction( data ) {
        return this.Transaction.findOne(data).catch((err) => console.log(err));
    };
    getTransactions( data ) {
        return this.Transaction.find().catch((err) => console.log(err));
    };
    update( data ) {
        return {'models/Transaction.update()': data};
    };
    delete( data ) {
        return {'models/Transaction.delete()': data};
    };
    authTransaction() {

    }
}

module.exports = new TransactionModel();
