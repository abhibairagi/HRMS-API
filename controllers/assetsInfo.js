const AssetsInfo = require("../models/assetsInfo");

exports.createAssetsInfo = async (req, res) => {
  try {
    const assestsInfo = new AssetsInfo(req.body);
    console.log(assestsInfo, "6");

    const savedAssestsInfo = await assestsInfo.save();
    console.log(savedAssestsInfo, "8");
    res.json(savedAssestsInfo);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getassetCategory = async (req, res) => {
  try {
    const category = await AssetsInfo.aggregate([
      {
        $match: {
          $and: [
            { asset_category: { $ne: "" } },
            { asset_category: { $ne: null } },
            { asset_category: { $ne: undefined } },
          ],
        },
      },
      {
        $group: {
          _id: "$asset_category",
          // asset_ids: { $push: "$_id" }  // Push all _id values into an array for each asset_category
        },
      },
    ]);

    res.json(category);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getassetTypes = async (req, res) => {
  try {
    const types = await AssetsInfo.aggregate([
      {
        $match: { asset_category: req.body._id },
      },
    ]);

    res.json(types);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getallAssets = async (req, res) => {
  try {
    const assets = await AssetsInfo.find({
      // {
      //   $project: {
      //     "asset_type": "$asset_type",
      //     "asset_category": "$asset_category",
      //     "uniqueID" : "$asset_uniq_id",
      //     "key_name" : "$asset_keys.key_name",
      //     "key_value" : "$asset_keys.key_value",
      //     "key_type" : "$asset_keys.key_type",
      //     "options": "$asset_keys.options"
      //   }
      // }
    });
    res.json(assets);
  } catch (err) {
    res.json({ message: err.message });
  }
};
