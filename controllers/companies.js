const express = require("express");
const Companies = require("../models/companies");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    res.json(await new Companies(req.body).save());
    console.log(req.body, "8");
    console.log(res.holiday_calender, "9");
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Companies.find({}, "company_name");
    res.json(companies);
  } catch (error) {
    console.log(error);
  }
};

exports.getCompaniesById = async (req, res, next, id) => {
  try {
    const companies = await Companies.findById(id);
    console.log(companies, "43");
    res.json(companies);
  } catch (err) {
    res.status(400).json({
      error: "Unable to fetch aannoun. Please try again",
    });
  }
};

exports.holidayCalender = async (req, res) => {
  try {
    const updatedCompany = await Companies.updateOne(
      { _id: req.params.id },
      { $push: { holiday_calendar: req.body } }
    );

    res.json(updatedCompany);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getAllHolidayCalender = async (req, res) => {
  try {
    // const currentDate = new Date();

    const companyId = new mongoose.Types.ObjectId(req.params.id);
    const holiday = await Companies.aggregate([
      {
        $match: {
          _id: companyId,
          //   "holiday_calendar.holiday_name": { $ne: "" },
        },
      },
      {
        $unwind: "$holiday_calendar",
      },
      {
        $match: {
          $and: [
            { "holiday_calendar.holiday_name": { $ne: "" } },
            { "holiday_calendar.holiday_name": { $ne: null } },
          ],
        },
      },
      {
        $project: { _id: 0, holiday_calendar: 1, company_name: 1 },
      },
    ]);

    console.log(holiday);

    res.json(holiday);
  } catch (err) {
    res.json({ message: err.message });
  }
};
