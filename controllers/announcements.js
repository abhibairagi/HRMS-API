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


exports.updateEvents = async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { eventId } = req.params;
      console.log(eventId,"103")
  
    
      const event = await Announcements.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      const {announcementName, description, companies, closure_date} = req.body
      console.log(req.body, "111")
  
      const updatedEvents = await Announcements.findOneAndUpdate(
        { _id: eventId },
        {$set : {announcementName, description, companies, closure_date}},
        {new: true}
      )
  
      if (!updatedEvents) {
        return res.status(404).json({ error: 'Events not found' });
      }
  
    //   const deleteEvents = await Announcements.findByIdAndDelete(
    //     {_id : eventId},)
  
  
      console.log(updatedEvents);
      res.json(updatedEvents);
    //   res.json(deleteEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
  }

// exports.updateEvents = async (req, res) => {
//     const events = req.body 

//     events.save((err, updatedEvents) => {
//         if (err) handleError(res, "Could not update Category!", 400);
//     res.json(updatedEvents);
//     })
// }