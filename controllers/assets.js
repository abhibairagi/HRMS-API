const Assets = require("../models/assets");

exports.createAssets = async(req, res) => {
  try {
    const assests = new Assets(req.body);
    const savedAssests = await assests.save();
    res.json(savedAssests);
  } catch (err) {
    res.status(400).json({
    error: "Unable to post assets. Please try again"
    });
  }  
};

  exports.getAllAssets = async (req, res) => {
    try {
        const assets = await Assets.find();
        console.log(assets, "18")
        res.json(assets);
    } catch (err) {
        res.status(400).json({
            error: "Unable to fetch assets. Please try again"
        });
    }
};


  exports.getAssetsById = async (req, res, next, id) => {
    try {
        const assets = await Assets.findById(id);
        console.log(assets, "43")
        res.json(assets);
    } catch (err) {
        res.status(400).json({
            error: "Unable to fetch assets. Please try again"
        });
    }
};


  exports.getAssets = (req, res) => {
    return res.json(req.assests);
  };

  
//   exports.updateAssets = async (req, res) => {
//     try {

//         const {assetId} = req.params  

//         const assets = req.body
//         console.log(assets, "64")
//         const updatedassets = await Assets.findByIdAndUpdate(assetId, assets, {new: true})
//         console.log(updatedassets, "66")
//         if (!updatedassets) {
//           return res.status(404).json({ error: "Asset not found" });
//       }
//         res.json(updatedassets);
//     } catch (err) {
//         res.status(400).json({
//             error: "Unable to update assets. Please try again"
//         });
//     }
// };

exports.updateAssets = async (req, res) => {
  try {

      const {assetId} = req.params
      console.log(assetId, "70")
      const fields = req.body
      console.log(fields, "71")  

      Assets.findOneAndUpdate(
        {_id:  assetId},
        {$set: fields},
        { new: true, useFindAndModify: false },
        (err, updatedAssets) => {
          console.log("Updated offer:", updatedAssets);
          if (err) {
            console.error('Error updating assets:', err);
            return res.status(404).json({
              error: 'Could not update the Assets',
            });
          }
          if (!updatedAssets) {
            return res.status(404).json({
              error: 'Assets not found .',
            });
          }
          res.json(updatedAssets)
          console.log(updatedAssets)
        }
      )
  } catch (err) {
      res.status(400).json({
          error: "Unable to update assets. Please try again"
      });
  }
};


