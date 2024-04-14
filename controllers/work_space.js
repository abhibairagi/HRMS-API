const express = require("express")
const WorkSpace = require("../models/work_space")
const Project = require("../models/projects")
const mongoose = require("mongoose")
const {ObjectId} = require("mongoose")




exports.CreateWorkSpace = async (req, res) => {
    try {
        if (req.roleName == 'Admin' || req.roleName == 'Manager') {

            var workspaceDetails = req.body
            workspaceDetails.owner = req.userId
            workspaceDetails.access = [req.userId]
            workspaceDetails.restricted_acesss = []


            var newWorkSpace = await new WorkSpace(workspaceDetails).save()
            res.json(newWorkSpace)

            const baseTemplate = {
                group_name: "Test",
                tasks: [{
                    name: "Test",
                    description: "",
                    priority: "Not Started",
                    user_access: [req.userId],
                    assigned_to : "",
                    sub_tasks: [],
                    files: [],
                    timeline: {
                        from: "",
                        to: "",
                    },
                    owner: req.userId,
                    completionDate: "",
                    chats: [],
                    created: Date.now()
                }], 
                work_space : newWorkSpace._id
            }

            const createdproject = await new Project(baseTemplate).save()

        } else {
            return res.json({ message: "You are Manager or not to create WorkSpace" })
        }
    } catch (error) {
        res.json(error.message)
    }
}


exports.getAllWorkspace = async (req , res) => {
    try {
        const getFullworkspace = await WorkSpace.aggregate([
            {
                $match : {
                    access : {$in : [new mongoose.Types.ObjectId(req.userId)]}
                }
            }, 
            {
                $project : {
                    "type" : "full_access",
                    "name" : 1 
                }
            }
        ])

        const getprivateworkspace = await WorkSpace.aggregate([
            {
                $match : {
                    restricted_acesss : {$in : [new mongoose.Types.ObjectId(req.userId)]}
                }
            }, 
            {
                $project : {
                    "type" : "restricted_access",
                    "name" : 1 
                }
            }
        ])


        Array.prototype.push.apply(getFullworkspace, getprivateworkspace)

        res.json(getFullworkspace)
    

    } catch (error) {
        console.log(error)
    }
}

