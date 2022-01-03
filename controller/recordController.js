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
    console.log("audioarray", audioArray);

    return Promise.all(audioArray);
  } catch (err) {
    console.log(err);
  }
};

//get all record names, names array maps to wav array. Record name @ index 1 belongs to wav file @ index 1.
const getRecordNames = async (req, res) => {
  try {
    const recordNames = await fs.readdirAsync(`public/uploads`);
    return responseHandler(res, false, "", recordNames, responseCodes.SUCCESS);
  } catch (err) {
    console.log(err);
    return responseHandler(res, false, "", [], responseCodes.ERROR);
  }
};
//get all record wav files from disk
const GetRecords = (req, res) => {
  //all files in audio folder return a based 64 encoded blob to be manipulated on client
  fs.readdirAsync(`public/uploads`)
    .then(parseRecords)
    .then((results) => {
      console.log("results", results);
      return responseHandler(res, false, "", results, responseCodes.SUCCESS);
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
    fs.rename(`public/uploads/${req.body.newFileName}`, (req, res) => {
      console.log("sucessful update");
    })
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
  getRecordNames,
  UpdateRecordName,
};
