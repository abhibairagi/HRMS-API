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

exports.holidayCalender = async(req, res) => {
    const { companyId } = req.params;
    const { holidayCalender } = req.body;

    try {
        const updatedCompany = await Companies.findOneAndUpdate(
            {_id:companyId},
            { $push: { holiday_calendar: { $each: holidayCalender } } },
            { new: true }
        );

        if (!updatedCompany) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.json(updatedCompany);
    } catch (error) {
        console.error('Error pushing holidays:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}