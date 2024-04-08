const Assets = require("../models/assets");

exports.createAssets = (req, res) => {
    const assests = new Assets(req.body);
    assests.save((err, assests) => {
      if (err) {
        return res.status(400).json({
            err: "Inable to save assets. Please try again"
        })
      }
      res.json(assests)
    });
  };

exports.getAllAssets = (req, res) => {
    Assets.find().exec((err, assests) => {
      if (err) {
        return res.status(400).json({
            err: "No asset Information found"
        })
      }
      res.json(assests)
    });
  };

  exports.getAssetsById = (req, res, next, id) => {
    Assets.findById(id, (err, assests) => {
      if (err || !assests) {
        return res.status(400).json({
            err: "No assets with that ID"
        })
      }
      req.assests = assests;
      next();
    });
  };

  exports.getAssets = (req, res) => {
    return res.json(req.assests);
  };

  exports.updateAssets = (req, res) => {
    const assests = req.assests;
    console.log(assests, "44")
    assests = req.body;
    console.log(assests, "46")
  
    assests.save((err, updatedAsset) => {
      if (err) {
        return res.status(400).json({
            err: "Unable to update Asset Info"
        })
      }
      res.json(updatedAsset);
    });
  };