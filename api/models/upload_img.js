const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    images: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Uploads', uploadSchema);