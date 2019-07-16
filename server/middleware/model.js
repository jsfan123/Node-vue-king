module.exports = options =>{
    const inflection = require('inflection')
    return async(req,res,next)=>{
        const Model = inflection.classify(req.params.resource) 
        // console.log(Model)
        req.Model = require(`../models/${Model}`)         
        next()
    }
}