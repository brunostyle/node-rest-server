const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El role es obligatorio']
    }
}, {versionKey: false});

module.exports = model('Role', roleSchema);