var mongoose = require('mongoose');
var axios = require('axios');

class UserModel {
    constructor( userSchema = null,
                 User = null ){
        this.setUserSchema();
    }
    setUserSchema() {
        this.userSchema = mongoose.Schema({
            login: String,
            password: String,
            email: String,
            steamID: String,
            firstName: String,
            lastName: String,
            avatar: String,
            registrationIP: String,
            registrationDate: String,
            lastLoginIP: String,
            lastLoginDate: String,
            roles: [String],
            invitedBy: String,
            token: String
        });
        try{
            this.User = mongoose.model( 'User', this.userSchema );
        } catch (err) {
            console.log(err);
        }
    };
    create( data ) {
        let user = new this.User( data );

        user.save()
            .then((newUser) => console.log(newUser))
            .catch((err) => console.error(err));
    };
    getUser( data ) {
        return this.User.findOne(data).catch((err) => console.log(err));
    };
    getUsers( data ) {
        return this.User.find().catch((err) => console.log(err));
    };
    update( data ) {
        return {'models/User.update()': data};
    };
    delete( data ) {
        return {'models/User.delete()': data};
    };
    authUser() {

    }
}

module.exports = new UserModel();
