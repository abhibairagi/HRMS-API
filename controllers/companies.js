const express = require("express")
const Companies = require("../models/companies")


exports.create = async (req, res) => {
    try {
        res.json(await new Companies(req.body).save())
        console.log(req.body, "8")
        console.log(res.holiday_calender, "9")
    } catch (error) {
        console.log(error)
    }
}

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Companies.find({}, 'company_name')
        res.json(companies)
    } catch (error) {
        console.log(error)
    }

};

exports.getCompaniesById = async (req, res, next, id) => {
    try {
        const companies = await Companies.findById(id);
        console.log(companies, "43")
        res.json(companies);
    } catch (err) {
        res.status(400).json({
            error: "Unable to fetch aannoun. Please try again"
        });
    }
};

exports.holidayCalender = async (req, res) => {

    try {
        const updatedCompany = await Companies.updateOne({ _id: req.params.id },
            { $push: { "holiday_calendar": req.body } },
        );

        res.json(updatedCompany);
    } catch (error) {
        res.json({ message: error.message })

    }
}