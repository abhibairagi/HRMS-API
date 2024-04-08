const express = require("express")
const mongoose = require("mongoose")
const Users = require("../models/users")
const Roles = require("../models/roles")

const { UsersService } = require("../services");




exports.createUser = async (req, res) => {
    console.log(req.body , "Body")
    res.json(await new Users(req.body).save())
};

exports.login = async (req , res) => {
    try {
        let user = await  Users.findByCredentials(req.body.email , req.body.password)
        res.json(user)
    } catch (error) {
        res.json(error.message) 
        console.log(error)
    }
}

exports.AllUsers = async (req , res) => {
    const pipeline = [
        {
            $match :  {
                "status" : "active"
            }
        }, 
        // {
        //     $project : {
        //         "first_name" : 1
        //     }
        // }
    ]



    return res.json(await Users.aggregate(pipeline))
}

exports.allUsers = async (req , res) => {
    const pipeline = [
        {
            $match :  {
                "status" : "active"
            }
        }, 
        {
            $sort : {
                "personal_info.dob" : 1,
            }
        }
    ]



    return res.json(await Users.aggregate(pipeline))
}

