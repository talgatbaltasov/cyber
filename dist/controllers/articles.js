'use strict';

var article = require('../models/').article;

module.exports = {
    //Get a list of all authors using model.findAll()
    index: function index(req, res) {
        article.findAll().then(function (articles) {
            res.status(200).json(articles);
        }).catch(function (error) {
            res.status(500).json(error);
        });
    },


    //Get an author by the unique ID using model.findById()
    show: function show(req, res) {
        article.findById(req.params.id).then(function (article) {
            res.status(200).json(article);
        }).catch(function (error) {
            res.status(500).json(error);
        });
    },


    //Create a new author using model.create()
    create: function create(req, res) {
        article.create(req.body).then(function (newArticle) {
            res.status(200).json(newArticle);
        }).catch(function (error) {
            res.status(500).json(error);
        });
    },


    //Edit an existing author details using model.update()
    update: function update(req, res) {
        article.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (updatedRecords) {
            res.status(200).json(updatedRecords);
        }).catch(function (error) {
            res.status(500).json(error);
        });
    },


    //Delete an existing author by the unique ID using model.destroy()
    delete: function _delete(req, res) {
        article.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (deletedRecords) {
            res.status(200).json(deletedRecords);
        }).catch(function (error) {
            res.status(500).json(error);
        });
    }
};