const router = require("express").Router();
const recordController = require("../controller/recordController.js");
const multer = require("multer");
//set mutler properties destination and filename for uploads uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});
let upload = multer({ storage: storage });

router.get("/records", recordController.GetRecords);
router.get("/records/names", recordController.getRecordNames);
//use multer middleware to handle upload on post request
router.post("/records", upload.any("wav"), (req, res) => {
  console.log("upload success");
});
router.post("/records/delete", recordController.DeleteRecord);
router.post("/records/update", recordController.UpdateRecordName);

module.exports = router;
