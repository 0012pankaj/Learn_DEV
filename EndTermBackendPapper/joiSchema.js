

const Joi = require('joi');

const comedySchema = Joi.object({
    comedianName: Joi.string().required(),
    totalShows: Joi.number().min(0).required()
 
});


module.exports = {comedySchema};

