const {comedySchema} = require('./joiSchema');

const validateStandup = (req,res,next)=>{
    const { comedianName,totalShows} = req.body;
    const {error} = comedySchema.validate({comedianName,totalShows})
    if(error){
        return res.render('errpage',{error});
    }
    next();
}



const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}



module.exports = {isLoggedIn,validateStandup};

