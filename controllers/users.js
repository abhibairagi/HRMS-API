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
        const user = await  Users.findByCredentials(req.body.email , req.body.password)



         res.json(user)
    } catch (error) {
        console.log(error)
    }
}

