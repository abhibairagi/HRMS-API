const express = require("express")
const mongoose = require("mongoose")
const Stages = require("../models/stages")



exports.create = async (req, res) => {
    try {
        res.json(await new Stages(req.body).save())
    } catch (error) {
        console.log(error)
    }
}


exports.findStage = async (req, res) => {
    try {
        const AllStages = await Stages.find({stage_type : req.params.stage_type}).exec()
        res.json(AllStages)
    } catch (error) {
        console.log(error)
    }
}