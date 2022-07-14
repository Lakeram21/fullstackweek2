
const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxDocumentId: { type: Number, required: true },
   maxMessageId: { type: Number },
   maxContactId:{type:Number},
     
});


module.exports = mongoose.model('Sequences', sequenceSchema);