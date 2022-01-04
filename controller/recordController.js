const models = require("../models");
const responseHandler = require("../helpers/responseHandler");
const responseCodes = require("../helpers/responseCodes");
const { Sequelize, Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
require("sequelize-values")(Sequelize);
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

//creates an array of base 64 audio blobs
const parseRecords = async (files) => {
  try {
    let audioArray = [];
    for (let file of files) {
      audioArray.push(
        fs.readFileAsync(`public/uploads/${file}`, { encoding: "base64" })
      );
    }
    return Promise.all(audioArray);
  } catch (err) {
    console.log(err);
  }
};

//get all record wav files from disk
const GetRecords = async (req, res) => {
  //all files in audio folder return a based 64 encoded blob to be manipulated on client
  const recordNames = await fs.readdirAsync(`public/uploads`);
  fs.readdirAsync(`public/uploads`)
    .then(parseRecords)
    .then((results) => {
      console.log("results", results);
      //build a response object of recordNames and blobs that map to same index.
      //iterate through record name array, as we itertate we create a new object
      //where the audio key = base 64 encoded blob and the name key is the audio name
      //we get by grabbing the name then the corresponding blob with the same index
      //in blob array.
      const output = [];
      console.log("record", recordNames);
      for (let [index, record] of recordNames.entries()) {
        output.push({ name: record, audio: results[index] });
      }
      console.log("output", output);
      return responseHandler(res, false, "", output, responseCodes.SUCCESS);
    })
    .catch((err) => {
      console.log(err);
      return responseHandler(res, false, "", [], responseCodes.ERROR);
    });
};
//update record name
const UpdateRecordName = (req, res) => {
  console.log("updateRecord", req.body);
  fs.rename(
    `public/uploads/${req.body.fileName}`,
    `public/uploads/${req.body.newFileName}`,
    (req, res) => {
      console.log("upload success");
    }
  );
  return responseHandler(res, false, "", [], responseCodes.SUCCESS);
};
//delete record using fileName from client to query public/uploads path
const DeleteRecord = (req, res) => {
  console.log("file", req.body.fileName);
  fs.unlink(`public/uploads/${req.body.fileName}`, (req, res) => {
    console.log("sucessfule delete");
  });
  return responseHandler(res, false, "", [], responseCodes.SUCCESS);
};

module.exports = {
  GetRecords,
  DeleteRecord,
  UpdateRecordName,
  // PostRecord,
};
