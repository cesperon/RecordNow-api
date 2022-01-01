const models = require("../models");
const responseHandler = require("../helpers/responseHandler");
const responseCodes = require("../helpers/responseCodes");
const { Sequelize, Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
require("sequelize-values")(Sequelize);
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

const parseRecords = async (files) => {
  try {
    let audioArray = [];
    for (let file of files) {
      audioArray.push(
        fs.readFileAsync(`${__dirname}/audio/${file}`, { encoding: "base64" })
      );
    }
    console.log("audioarray", audioArray);

    return Promise.all(audioArray);
  } catch (err) {
    console.log(err);
  }
};
const GetRecords = (req, res) => {
  fs.readdirAsync(`${__dirname}/audio`)
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

const PostRecord = async (req, res) => {
  try {
    const { buffer: recording } = req.files[0];
    fs.open(`${__dirname}/audio/${req.body.name}.wav`, "w+", (err, fd) => {
      fs.writeFile(fd, recording, (err) => {
        fs.close(fd, (err) => {
          console.log("status 201 success");
        });
      });
    });
  } catch (err) {
    console.log(err, "error from PostRecord");
    return responseHandler(res, false, "", [], responseCodes.SERVER_ERROR);
  }
};

const DeleteRecord = async (req, res) => {
  try {
    console.log("req body", req.body);
    await models.Recordings.destroy({
      where: { id: req.body.id },
    });
    return responseHandler(res, false, "", [], responseCodes.SUCCESS);
  } catch (err) {
    console.log(err, "error from DeleteRecord");
    return responseHandler(res, false, "", [], responseCodes.SERVER_ERROR);
  }
};

module.exports = {
  GetRecords,
  PostRecord,
  DeleteRecord,
};
