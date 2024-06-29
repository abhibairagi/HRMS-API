const express = require("express");
const mongoose = require("mongoose");
const Onboardings = require("../models/onboardings");

exports.create = async (req, res) => {
  try {
    const onboarding = new Onboardings(req.body);
    const savedOnboarding = await onboarding.save();
    res.status(201).json(savedOnboarding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create onboarding" });
  }
};

exports.getOnboarding = async (req, res) => {
  try {
    const onboardings = await Onboardings.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "company_id",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                company_name: 1,
              },
            },
          ],
          as: "companydetails",
        },
      },
      {
        $unwind: "$companydetails",
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                first_name: 1,
                last_name: 1,
                email: 1,
                // reporting:1,
              },
            },
          ],
          as: "userdetails",
        },
      },
      {
        $unwind: "$userdetails",
      },
    ]);

    res.json(onboardings);
  } catch (err) {
    res.status(400).json({
      error: "Unable to fetch onboardings. Please try again",
    });
  }
};
