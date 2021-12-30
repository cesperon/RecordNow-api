const router = require("express").Router();
const recordController = require("../controller/recordController.js");
const multer = require("multer");
// let processMultipart = multer({ storage: multer.memoryStorage() });
let upload = multer();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "/records");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

router.get("/records", recordController.GetRecords);
router.post("/records", upload.any(), recordController.PostRecord);
router.post("/records/delete", recordController.DeleteRecord);
module.exports = router;
