const express = require("express")
const mongoose = require("mongoose")
const Users = require("../models/users")
const { UsersService } = require("../services");




exports.createUser = async (req, res) => {
    console.log(req.body , "Body")
    res.json(await new Users(req.body).save())
};

exports.login = async (req , res) => {
    try {
         res.json(await Users.findByCredentials(req.body.email , req.body.password))
    } catch (error) {
        consol.log(error)
    }
}