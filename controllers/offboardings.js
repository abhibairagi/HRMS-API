const express = require("express");
const mongoose = require("mongoose");
const Users = require("../models/users");
const Stages = require("../models/stages");
const Offboarding = require("../models/offboardings");
const { ObjectId } = require("mongoose");

exports.createOffboarding = async (req, res) => {
  // get user_id from frontend
  // define offboarding steps
  // create offboarding

  const user_id = req.body.user_id;
  console.log(user_id, "14");
  const last_workingDay = req.body.last_workingDay;
  console.log(last_workingDay, "16");

  try {
    const stages = await Stages.findOne({
      stage_type: "Offboarding",
    });
    console.log(stages, "22");
    const offboarding = {
      attachments: [],
      comments: [],
      process: stages.steps,
      user_id: user_id,
      process_type: "Offboarding",
      created_by: req.userId,
      company_id: req.body.company_ID,
      status: "cancelled",
      stage_type: "Offboarding",
      last_workingDay: last_workingDay,
    };
    console.log(offboarding, "34");
    await new Offboarding(offboarding).save();
    res.json(offboarding);
  } catch (err) {
    res.json({ message: err.message });
  }
};
