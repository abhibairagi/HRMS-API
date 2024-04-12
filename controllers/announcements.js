const Announcements = require("../models/announcements");

// exports.createAnnoun = (req, res) => {
//     const announ = new Announcements(req.body);
//     announ.save((err, announ) => {
//       if (err) {
//         return res.status(400).json({
//             err: "Unable to post announcement. Please try again"
//         })
//       }
//       res.json(announ)
//     });
//   };

exports.createAnnoun = async (req, res) => {
    try {
        res.json(await new Announcements(req.body).save());
    } catch (err) {
        res.status(400).json({
            error: "Unable to post announcement. Please try again"
        });
    }
};

// exports.getAnnouncements = async (req, res) => {
//     try {
//         const currentDate = new Date();
//         // console.log(currentDate, "30")
//         const announcements = await Announcements.find({ announcementDate: { $gt: currentDate } });
//         // console.log(announcements, "32")
//         res.json(announcements);
//     } catch (err) {
//         res.status(400).json({
//             error: "Unable to fetch announcements. Please try again"
//         });
//     }
// };

exports.getAnnouncements = async (req, res) => {
    try {
        const currentDate = new Date();
        const announcements = await Announcements.aggregate([
            {
                $match: { closure_date: { $gt: currentDate } }
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "companies",
                    foreignField: "_id",
                    as: "companyNames"
                }
            },
            {
                $unwind: {
                    'path': '$companyNames'
                }
            },
            {
                $project: {
                    "AnnouncementTitle": "$announcementName",
                    "Description": "$description",
                    "closure_date": "$closure_date",
                    "Companies": "$companyNames.company_name"
                }
            }
        ]);
        
        res.json(announcements);
    } catch (err) {
        res.status(400).json({
            error: "Unable to fetch announcements. Please try again"
        });
    }
};
