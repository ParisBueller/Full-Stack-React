const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

//mongoose.model() tells mongoose to create a new collection with the specified schema
//first argument: name of collection, in this case 'users'
//second argument: the schema defined above, in this case userSchema
mongoose.model('users', userSchema);