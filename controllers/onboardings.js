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
