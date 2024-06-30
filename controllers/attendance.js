const express = require("express");
const mongoose = require("mongoose");
const Users = require("../models/users");
const { ObjectId } = require("mongoose");
const Attendance = require("../models/attendance");

exports.createAttendance = async (req, res) => {
  const user_id = req.body.user_id;
  console.log(user_id, "14");

  try {
    const attendance = {
      break_startTime: [],
      break_endTime: [],
      history: [],
      date: Date.now(),
      user_id: user_id,
      day: req.body.day,
      breakTime: req.body.breakTime,
      total_break_time: req.body.total_break_time,
      manager_id: req.userId,
      status: req.body.status,
      remarks: req.body.remarks,
    };
    console.log(attendance, "19");
    await new Attendance(attendance).save();
    res.json(attendance);
  } catch (err) {
    res.json({ message: err.message });
  }
};
