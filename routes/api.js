const router = require("express").Router();
const recordController = require("../controller/recordController.js");
const multer = require("multer");
let upload = multer();

router.get("/records", recordController.GetRecords);
router.post("/records", upload.any(), recordController.PostRecord);
router.post("/records/delete", recordController.DeleteRecord);

module.exports = router;
