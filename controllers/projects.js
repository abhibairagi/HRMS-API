const express = require("express")
const projects = require("../models/projects")
const WorkSpace = require("../models/work_space")
const mongoose = require("mongoose")
const { ObjectId} = require("mongoose")

exports.addgroups = async (req, res) => {
    try {
        var findWorkSpace = await WorkSpace.findOne({ _id: req.params.id , access: { $in: [ new mongoose.Types.ObjectId(req.userId) ]  }} )
        // res.json(findWorkSpace)
        if (findWorkSpace) {

            var userAccessId = []

            if(req.userId == findWorkSpace.owner) {
                userAccessId.push(req.userId)
            } else {
                userAccessId = [req.userId , findWorkSpace.owner]
            }

            const newGroup = {
                group_name: "New Group",
                tasks: [{
                    name: "Test",
                    description: "",
                    priority: "Not Started",
                    user_access: userAccessId,
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
                work_space : req.params.id
            }
            const Addedgroup = await new projects(newGroup).save()
            res.json({message : "New task Addes", data : Addedgroup})
        } else {
            return res.json({ message: "Didn't have Access to add group" })
        }

    } catch (error) {
        res.json(error.message)
    }
}


exports.addTaskTogroup = async (req, res) => {
    try {
        // const filter = { _id : req.params.groupid}
        const getGroup = await projects.aggregate([
            {
                $match : {
                    _id : new mongoose.Types.ObjectId(req.params.groupid)
                }
            }, 
            {
                $lookup : {
                    from: "workspaces",
                    localField: "work_space",
                    foreignField: "_id",
                    as: "workspaceDetails"
                }
            }, 
            {
                $unwind : "$workspaceDetails"
            }
        ])
        var userAccessId = []

        if(req.userId == getGroup[0].workspaceDetails.owner) {
            userAccessId.push(req.userId)
        } else {
            userAccessId = [req.userId , getGroup[0].workspaceDetails.owner]
        }

        const addTask = {
            name: "Test",
            description: "",
            priority: "Not Started",
            user_access: userAccessId,
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
        }

        const addedtask = await  projects.updateOne({_id : req.params.groupid} , { $push: { "tasks": addTask } })

        res.json(addedtask)

    } catch (error) {
        console.log()
    }
}



exports.addSubTask = async (req, res) => {

}

exports.getAllTaskforWorkSpace = async (req , res) => {
    try {
        if(req.body.type == 'full_access') {
            const pipeline =[
                {
                    $match : {
                        work_space : new mongoose.Types.ObjectId(req.body._id)
                    }
                }
            ]
    
            res.json(await projects.aggregate(pipeline))
        } 
        if (req.body.type == 'restricted_access') {
            const pipeline =[
                {
                    $match : {
                        work_space : new mongoose.Types.ObjectId(req.body._id)
                    }
                }, 
                {
                    $unwind : "$tasks"
                }, 
                {
                    $match : {
                        "tasks.user_access" : { $in : [ req.userId ] }
                    }
                },
                {
                    $group : {
                        _id : "$_id",
                        tasks : {$push :"$tasks"},
                        // group_name : { $push: "$$ROOT" }x
                    }
                }
            ]

            res.json(await projects.aggregate(pipeline))
        }
       


    } catch (error) {
        console.log(error)
    }
}

