const express = require("express")
const Companies = require("../models/companies")


exports.create = async (req , res) => {
    try {
        res.json(await new Companies(req.body).save())
    } catch (error) {
        console.log(error)
    }
}

