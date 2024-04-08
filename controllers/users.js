const express = require("express")
const mongoose = require("mongoose")
const Users = require("../models/users")
const Roles = require("../models/roles")
const moment = require("moment")
const { Objectid} = require("mongoose")

const { UsersService } = require("../services");




exports.createUser = async (req, res) => {
    console.log(req.body, "Body")
    res.json(await new Users(req.body).save())
};

exports.login = async (req, res) => {
    try {
        let user = await Users.findByCredentials(req.body.email, req.body.password)
        res.json(user)
    } catch (error) {
        res.json(error.message)
        console.log(error)
    }
}

exports.AllUsers = async (req, res) => {

    var match = {
        $match : {
            "status": "active",
            "companyId" : req.companyId
        }
    }
    
    if(req.roleName == 'Admin') {
        delete match.$match.companyId
    }

    // console.log(match , "Match")

    try {
        const pipeline = [match,
            {
                $addFields : {
                    "reportingObjectId" : { $toObjectId: "$reporting.manager" }
                }  
            },
            {
                $lookup: {
                    from: "users",
                    localField: "reportingObjectId",
                    foreignField: "_id",
                    pipeline : [
                        {
                            $project : {
                                "name" : {$concat : [ "$first_name" , " ", "$last_name"]}
                            }
                        }
                    ],
                    as: "managerdetails"
                    
                }
            },
            {
                $unwind : "$managerdetails"
            },
            {
                $project : {
                    emp_id : 1 ,
                    first_name : 1 , 
                    last_name : 1 , 
                    reporting : 1 ,
                    personal_info : 1 ,
                    designation : 1, 
                    email : 1,
                    managerdetails  : "$managerdetails"
                }
            } 

        ]
        return res.json(await Users.aggregate(pipeline))

    } catch (error) {
        console.log(error)
    }
}

exports.upcomingevents = async (req, res) => {

    try {
        const liveDate = new Date()
        liveDate.setHours(0, 0, 0, 0)
        const year = moment(Date.now()).format("YYYY")
        const birthday = [
            {
                $match: {
                    "personal_info.dob": { $ne: "" },
                }
            },
            {
                $addFields: {
                    "formatted_date": {
                        $dateFromString: {
                            dateString: {
                                $concat: [{
                                    $toString: {
                                        $dayOfMonth: {
                                            $dateFromString: {
                                                dateString: '$personal_info.dob',
                                            }
                                        }
                                    }
                                }, "-", {
                                    $toString: {
                                        $month: {
                                            $dateFromString: {
                                                dateString: '$personal_info.dob',
                                            }
                                        }
                                    }
                                }, "-", year]
                            },
                        }
                    }
                }
            },
            {
                $match: {
                    "formatted_date": { $gte: liveDate }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "type": "birthday",
                    "name": { $concat: ["$first_name", "-", "$last_name"] },
                    "date": "$personal_info.dob",
                    "profile_pic": "$personal_info.profile_photo",
                    "formatted_date": "$formatted_date",
                }
            }
        ]

        const anniversary = [{
            $match: {
                "personal_info.doj": { $ne: "" },
            }
        },
        {
            $addFields: {
                "formatted_date": {
                    $dateFromString: {
                        dateString: {
                            $concat: [{
                                $toString: {
                                    $dayOfMonth: {
                                        $dateFromString: {
                                            dateString: '$personal_info.doj',
                                        }
                                    }
                                }
                            }, "-", {
                                $toString: {
                                    $month: {
                                        $dateFromString: {
                                            dateString: '$personal_info.doj',
                                        }
                                    }
                                }
                            }, "-", year]
                        },
                    }
                }
            }
        },
        {
            $match: {
                "formatted_date": { $gte: liveDate }
            }
        },
        {
            $project: {
                "_id": 0,
                "type": "anniversary",
                "name": { $concat: ["$first_name", "-", "$last_name"] },
                "date": "$personal_info.doj",
                "profile_pic": "$personal_info.profile_photo",
                "formatted_date": "$formatted_date",
            }
        }]

        var allBirthday = await Users.aggregate(birthday)
        var allAnniversary = await Users.aggregate(anniversary)

        Array.prototype.push.apply(allBirthday, allAnniversary)


        allBirthday.sort(function (a, b) {
            return (a.formatted_date < b.formatted_date) ? -1 : ((a.formatted_date > b.formatted_date) ? 1 : 0);
        })


        return res.json(allBirthday)
    } catch (error) {
        console.log(error)
    }


}


