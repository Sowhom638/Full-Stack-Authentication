const mongoose = require('mongoose');
// Team Schema 
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },  // Team names must be unique 
});
module.exports = mongoose.model('Team', teamSchema);