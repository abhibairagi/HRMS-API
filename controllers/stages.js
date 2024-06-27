const express = require("express");
const mongoose = require("mongoose");
const Stages = require("../models/stages");

exports.create = async (req, res) => {
  try {
    res.json(await new Stages(req.body).save());
  } catch (error) {
    console.log(error);
  }
};

exports.findStage = async (req, res) => {
  try {
    const AllStages = await Stages.findOne({
      stage_type: req.params.stage_type,
    }).exec();
    res.json(AllStages);
  } catch (error) {
    console.log(error);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const result = await Stages.updateOne(
      {
        _id: "6642228ae538b95c2b03bc41",
        "steps._id": new mongoose.Types.ObjectId(req.body.steps[0]._id),
      },
      {
        $set: {
          //   template_name: req.body.template_name,
          "steps.$": req.body.steps,
        },
      }
    );
    console.log(result, "38");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
