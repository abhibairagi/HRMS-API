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
                    pipeline : [{
                        $project : {
                            company_name : 1,
                        }
                    }],
                    as: "companydetails"
                }
            },
            {
                $project: {
                    "announcementName": "$announcementName",
                    "description": "$description",
                    "closure_date": "$closure_date",
                    "Companies": "$companydetails"
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

exports.getEventsById = async (req, res, next, id) => {
    try {
        const aannoun = await Announcements.findById(id);
        console.log(aannoun, "43")
        res.json(aannoun);
    } catch (err) {
        res.status(400).json({
            error: "Unable to fetch aannoun. Please try again"
        });
    }
};


  exports.getAannoun = (req, res) => {
    return res.json(req.aannoun);
  };


exports.updateAnnouncements = async (req, res) => {
    
    try {
        const update = await  Announcements.updateOne({_id : req.params.id}, {
            $set : { 'announcementName' : req.body.announcementName , 'description' : req.body.description, 
            'closure_date': req.body.closure_date, 'companies': req.body.companies}
        })

        res.json(update)
    } catch (error) {
        res.json({message  : error.message})
    }
  
  }
