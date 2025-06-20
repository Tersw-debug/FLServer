const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
    },
    Age: {       
        type: Number,
        required: true
    },
});
employeeSchema.pre('validate', function(next) {
    const bannedUsers = ['admin', 'root', 'superuser', 'superemployee'];
    if(bannedUsers.includes(this.firstName.toLowerCase()))
    {
        this.invalidate('firstname', 'That firstname is not allowed.');
    }
    if(bannedUsers.includes(this.lastName.toLowerCase()))
    {
        this.invalidate('lastname', 'That lastname is not allowed.');
    }
    if(this.Age < 16)
    {
        this.invalidate('Age', "That Age doesn't exist.");
    }
    next();
});




const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;