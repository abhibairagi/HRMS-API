const Configuration = require("../models/configuration");
const { v4: uuidv4 } = require("uuid");
const { policies } = require("../helpers/configuration");
const { ObjectId, default: mongoose } = require("mongoose");

// exports.createConfig = async (req, res) => {
//   try {
//     res.json(await new Configuration(req.body).save());
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// };

exports.getConfiguration = async (req, res) => {
  try {
    console.log(req.body);
    const data = await Configuration.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId("666eaaf6f0a1fbbde5ca80fd"),
        },
      },
      {
        $project: req.body,
      },
    ]);

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

exports.updateConfig = async (req, res) => {
  try {
    const type = req.params.type;

    if (type == "department") {
      console.log(type, "14");

      if (req.body.type == "new") {
        console.log("New department name:", req.body.name);
        req.body.data._id = uuidv4();
        const result = await Configuration.updateOne(
          { _id: "666eaaf6f0a1fbbde5ca80fd" },
          {
            $push: {
              department: req.body.data,
            },
          }
        );
        console.log("Update Result:", result);
        return res.json({ message: "Updated Successfully" });
      } else if (req.body.type == "existing") {
        const result = await Configuration.updateOne(
          {
            _id: "666eaaf6f0a1fbbde5ca80fd",
            "department._id": req.body.data._id,
          },
          {
            $set: {
              "department.$.name": req.body.data.name,
              "department.$.teams": req.body.data.teams,
            },
          }
        );
        return res.json({ message: "Successsfull" });
      } else if (req.body.type == "delete") {
        const result = await Configuration.findByIdAndUpdate(
          { _id: "666eaaf6f0a1fbbde5ca80fd" },
          { $pull: { department: { _id: req.body.data._id } } },
          { new: true }
        );
        res.send(result);
      }
    }

    // if (type == "policies") {
    //   const update = await policies(req.body.type, req.body.data);
    //   return res.json({ message: update });
    // }
  } catch (error) {
    console.log(error);
  }
};
