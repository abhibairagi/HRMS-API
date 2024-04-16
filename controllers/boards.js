const express = require("express")
const boards = require("../models/boards")
const WorkSpace = require("../models/work_space")
const mongoose = require("mongoose")
const { ObjectId } = require("mongoose")

exports.addgroups = async (req, res) => {
    try {
        var findWorkSpace = await WorkSpace.findOne({ _id: req.params.id, access: { $in: [new mongoose.Types.ObjectId(req.userId)] } })

        if (findWorkSpace) {

            var userAccessId = []

            if (req.userId == findWorkSpace.owner) {
                userAccessId.push(req.userId)
            } else {
                userAccessId = [req.userId, findWorkSpace.owner]
            }

            const newGroup = {
                group_name: "New Group",
                tasks: [{
                    name: "Test",
                    description: "",
                    priority: "Not Started",
                    user_access: userAccessId,
                    assigned_to: "",
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
                group_number: req.body.group_number,
                work_space: req.params.id
            }
            const Addedgroup = await new boards(newGroup).save()
            res.json({ message: "New task Addes", data: Addedgroup })
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
        const getGroup = await boards.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.groupid)
                }
            },
            {
                $lookup: {
                    from: "workspaces",
                    localField: "work_space",
                    foreignField: "_id",
                    as: "workspaceDetails"
                }
            },
            {
                $unwind: "$workspaceDetails"
            }
        ])
        var userAccessId = []

        if (req.userId == getGroup[0].workspaceDetails.owner) {
            userAccessId.push(req.userId)
        } else {
            userAccessId = [req.userId, getGroup[0].workspaceDetails.owner]
        }

        const addTask = {
            name: "Test",
            description: "",
            priority: "Not Started",
            user_access: userAccessId,
            sub_tasks: [],
            files: [],
            task_number: getGroup[0].tasks.length,
            timeline: {
                from: "",
                to: "",
            },
            owner: req.userId,
            completionDate: "",
            chats: [],
            created: Date.now()
        }

        const addedtask = await boards.updateOne({ _id: req.params.groupid }, { $push: { "tasks": addTask } })

        res.json(addedtask)

    } catch (error) {
        console.log()
    }
}



exports.addSubTask = async (req, res) => {

}

exports.getAllTaskforWorkSpace = async (req, res) => {
    try {
        if (req.body.type == 'full_access') {
            const pipeline = [
                {
                    $match: {
                        work_space: new mongoose.Types.ObjectId(req.body._id)
                    }
                },
                { $unwind: "$tasks" },
                { $sort: { "tasks.task_number": 1 } },
                {
                    $group: {
                        _id: "$_id",
                        group_name: { $first: "$group_name" },
                        work_space: { $first: "$work_space" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                        __v: { $first: "$__v" },
                        group_number: { $first: "$group_number" },
                        tasks: { $push: "$tasks" }
                    }
                },
                { $sort: { group_number: 1 } }
            ]

            res.json(await boards.aggregate(pipeline))
        }
        if (req.body.type == 'restricted_access') {
            const pipeline = [
                {
                    $match: {
                        work_space: new mongoose.Types.ObjectId(req.body._id)
                    }
                },
                {
                    $unwind: "$tasks"
                },
                {
                    $match: {
                        "tasks.user_access": { $in: [req.userId] }
                    }
                },
                { $sort: { "tasks.task_number": 1 } },
                {
                    $group: {
                        _id: "$_id",
                        tasks: { $push: "$tasks" },
                        group_name: { $first: "$group_name" },
                        work_space: { $first: "$work_space" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                        __v: { $first: "$__v" },
                        group_number: { $first: "$group_number" },
                    }
                }, 
                { $sort: { group_number: 1 } }
            ]

            res.json(await boards.aggregate(pipeline))
        }



    } catch (error) {
        console.log(error)
    }
}

