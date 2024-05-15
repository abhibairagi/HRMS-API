const AssetsInfo = require("../models/assetsInfo");

exports.createAssetsInfo = async(req, res) => {
    try {
        const assestsInfo = new AssetsInfo(req.body);
        console.log(assestsInfo, "6")

        const savedAssestsInfo = await assestsInfo.save();
        console.log(savedAssestsInfo, "8")
        res.json(savedAssestsInfo);
      } catch (err) {
        res.json({ message: err.message })
      }  
  };

// exports.getAllAssetsInfo = (req, res) => {
//     AssetsInfo.find().exec((err, assestsInfo) => {
//       if (err) {
//         return res.status(400).json({
//             err: "No asset Information found"
//         })
//       }
//       res.json(assestsInfo)
//     });
//   };

//   exports.getAssetsInfoById = (req, res, next, id) => {
//     AssetsInfo.findById(id, (err, assestsInfo) => {
//       if (err || !assestsInfo) {
//         return res.status(400).json({
//             err: "No assets with that ID"
//         })
//       }
//       req.assestsInfo = assestsInfo;
//       next();
//     });
//   };

//   exports.getAssetsInfo = (req, res) => {
//     return res.json(req.assestsInfo);
//   };

//   exports.updateAssetsInfo = (req, res) => {
//     const assestsInfo = req.assestsInfo;
//     console.log(assestsInfo, "44")
//     assestsInfo.asset_name = req.body.asset_name;
//     console.log(assestsInfo.asset_name, "46")
  
//     assestsInfo.save((err, updatedAssetInfo) => {
//       if (err) {
//         return res.status(400).json({
//             err: "Unable to update Asset Info"
//         })
//       }
//       res.json(updatedAssetInfo);
//     });
//   };


// exports.deleteAssetsInfo = (req, res) => {
//     const {assetsInfoId} = req.params
//     console.log(assetsInfoId, "73")
  
//     AssetsInfo.findByIdAndDelete(
//       { _id: assetsInfoId},
//       (err, assestsInfo) => {
//         console.log(assestsInfo, "168")
//       if (err) {
//         console.error('Error updating trip:', err);
//         return res.status(404).json({
//           error: 'Could not update the Offer',
//         });
//       }
//       if (!assestsInfo) {
//         return res.status(404).json({
//           error: 'Offer not found .',
//         });
//       }
//       res.json(`Deleted ${assestsInfo.asset_name} successfully`)
//       console.log(assestsInfo)
//     });
//   };