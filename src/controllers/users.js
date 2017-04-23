import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
let user = require('../models/').user;

module.exports= {
    //Get a list of all authors using model.findAll()
    index(req, res) {
        user.findAll()
            .then(function (users) {
                res.status(200).json(users);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Get an author by the unique ID using model.findById()
    show(req, res) {
        user.findById(req.params.id)
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (error){
                res.status(500).json(error);
            });
    },

    //Create a new author using model.create()
    create(req, res) {
        user.create({email: req.body.email, password: bcrypt.hashSync(req.body.password, 10), name: req.body.name})
            .then(function (newUser) {
                res.status(200).json(newUser);
            })
            .catch(function (error){
                res.status(500).json(error);
            });
    },

    //Edit an existing author details using model.update()
    update(req, res) {
        user.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(function (updatedRecords) {
                res.status(200).json(updatedRecords);
            })
            .catch(function (error){
                res.status(500).json(error);
            });
    },

    //Delete an existing author by the unique ID using model.destroy()
    delete(req, res) {
        user.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (deletedRecords) {
                res.status(200).json(deletedRecords);
            })
            .catch(function (error){
                res.status(500).json(error);
            });
    },

    authenticate(req, res) {
        user.findOne({where: {email: req.body.email}})
            .then(function (user) {
                if(!user) {
                    res.status(200).json({success: false, message: 'Authentication failed. User not found'});
                } else if(user) {
                    if(!bcrypt.compareSync(req.body.password, user.password)) {
                        res.status(200).json({success: false, message: 'Authentication failed. Wrong password'});
                    } else {
                        let token = jwt.sign({email: user.email}, 'F926DA7D876944AB1C21F714BC32A', {
                            expiresIn: 86400
                        });
                        res.status(200).json({success: true, token: token});
                    }
                }
            })
            .catch(function (error){
                res.status(500).json(error);
            });
    }
};