const express = require("express")
const Companies = require("../models/companies")


exports.create = async (req , res) => {
    try {
        res.json(await new Companies(req.body).save())
        console.log(req.body, "8")
        console.log(res.holiday_calender, "9")
    } catch (error) {
        console.log(error)
    }
}

exports.getAllCompanies = async(req, res) => {
    try {
        const companies = await Companies.find({}, 'company_name')
        res.json(companies)
    } catch (error) {
        console.log(error)
    }
    
  };