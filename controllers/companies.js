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

exports.getAllHolidays = async (req, res) => {
    try {
        const holidays = await Companies.find();
        console.log(holidays, "18")
        res.json(holidays[0].holiday_calendar);
    } catch (err) {
        res.status(400).json({
            error: "Unable to fetch assets. Please try again"
        });
    }
};

// exports.getAllHolidayCalender = async (req, res) => {
//     try {
//         // const currentDate = new Date();
//         const holiday = await Companies.aggregate([
//             // {
//             //     $match: { closure_date: { $gt: currentDate } }
//             // },
//             {
//                 $lookup: {
//                     from: "companies",
//                     localField: "companies",
//                     foreignField: "_id",
//                     pipeline : [{
//                         $project : {
//                             company_name : 1,
//                         }
//                     }],
//                     as: "companydetails"
//                 }
//             },
//             {
//                 $project: {
//                     "announcementName": "$announcementName",
//                     "description": "$description",
//                     "closure_date": "$closure_date",
//                     "Companies": "$companydetails"
//                 }
//             }
//         ]);
        
//         res.json(announcements);
//     } catch (err) {
//         res.status(400).json({
//             error: "Unable to fetch announcements. Please try again"
//         });
//     }
// };