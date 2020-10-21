const mongoose = require('mongoose') //Schema setting

const schema = mongoose.Schema;

const GuildRank = new schema({

    id: {
        type: String, 
        required: true
    },

    profanityLevel:
    {
        type: Number,
        default:0
    },

    xp:
    {
        type: Number,
        default:0,
        required: true
    },

    level:
    {
        type: Number,
        default:0,
        required: true
    },

    

})

module.exports = mongoose.model('GuildRank',GuildRank);