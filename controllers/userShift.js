const express = require("express");
const mongoose = require("mongoose");
const Users = require("../models/users");
const { ObjectId } = require("mongoose");
const Config = require("../models/configuration");
const UserShift = require("../models/userShift");

exports.createUserShifts = async (req, res) => {
  const user_id = req.body.user_id;
  console.log(user_id, "14");
  const start_date = req.body.start_date;
  console.log(start_date, "16");
  const end_date = req.body.end_date;
  console.log(end_date, "18");
  const shiftType = req.body.shiftType;
  console.log(shiftType, "20");

  try {
    const stages = await Config.findOne(
      {
        "shifts.shiftType": shiftType,
      },
      {
        shifts: { $elemMatch: { shiftType: shiftType } },
      }
    );

    const shiftDetails = stages.shifts[0];

    console.log(stages, "22");
    const shifts = {
      user_id: user_id,
      start_date: start_date,
      end_date: end_date,
      shiftType: shiftType,
      start_time: shiftDetails.start_time,
      end_time: shiftDetails.end_time,
    };
    console.log(shifts, "34");
    await new UserShift(shifts).save();
    res.json(shifts);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Config.find({}, { "shifts.shiftType": 1, _id: 0 });
    console.log(shifts, "51");

    res.json(shifts);
  } catch (error) {
    console.log(error);
  }
};
