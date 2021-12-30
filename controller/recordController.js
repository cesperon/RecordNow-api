const models = require("../models");
const responseHandler = require("../helpers/responseHandler");
const responseCodes = require("../helpers/responseCodes");
const { Sequelize, Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
require("sequelize-values")(Sequelize);
// var fs = require("fs");
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

const parseRecords = (files) => {
  let audioArray = [];
  for (let file of files) {
    // fs.readFileAsync(
    //   `${__dirname}/audio/${files}`,
    //   { encoding: "base64" },
    //   (err, data) => {
    //     if (err) {
    //       console.log("error opening file in GetRecords");
    //     } else {
    //       // console.log("data", data);
    //       // return responseHandler(res, false, "", data, responseCodes.SUCCESS);
    //       audioArray.push(data);
    //     }
    //   }
    // );
    audioArray.push(
      fs.readFileAsync(`${__dirname}/audio/${files}`, { encoding: "base64" })
    );
  }
  console.log("audioarray", audioArray);

  return Promise.all(audioArray);
};
const GetRecords = (req, res) => {
  // let records = await models.Recordings.findAll({
  //   // order: ["createAt", "DESC"],
  // }).then((records) => {
  //   console.log(records);
  //   return Sequelize.getValues(records);
  // });
  /////////////////////
  // fs.readFile(
  //   `${__dirname}/audio/hi.wav`,
  //   { encoding: "base64" },
  //   (err, data) => {
  //     if (err) {
  //       console.log("error opening file in GetRecords");
  //     } else {
  //       console.log("data", data);
  //       return responseHandler(res, false, "", data, responseCodes.SUCCESS);
  //     }
  //   }
  // );
  // return responseHandler(res, false, "", records, responseCodes.SUCCESS);
  // let fileNames = fs.readdirASync(`${__dirname}/audio`);
  // const daudioArray = [];
  // console.log("fileNames", fileNames);
  // const parseRecords = (files) => {
  //   let audioArray = [];
  //   for (let file of files) {
  //     fs.readFileAsync(
  //       `${__dirname}/audio/${files}`,
  //       { encoding: "base64" },
  //       (err, data) => {
  //         if (err) {
  //           console.log("error opening file in GetRecords");
  //         } else {
  //           // console.log("data", data);
  //           // return responseHandler(res, false, "", data, responseCodes.SUCCESS);
  //           audioArray.push(data);
  //           console.log("audioarray", audioArray);
  //         }
  //       }
  //     );
  //   }
  //   return Promise.all(audioArray);
  // };
  // for (let el of fileNames) {
  //   await fs.readFile(
  //     `${__dirname}/audio/${el}`,
  //     { encoding: "base64" },
  //     (err, data) => {
  //       if (err) {
  //         console.log("error opening file in GetRecords");
  //       } else {
  //         // console.log("data", data);
  //         // return responseHandler(res, false, "", data, responseCodes.SUCCESS);
  //         audioArray.push(data);
  //         console.log("audioarray", audioArray);
  //       }
  //     }
  //   );
  // }
  // for (let el of fileNames) {
  //   try {
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // console.log("audioarray", audioArray);
  // return responseHandler(res, false, "", audioArray, responseCodes.SUCCESS);
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
    // console.log("reqfile", req.file);
    // console.log("body", req.body, "audio", req.files);
    // let record = await models.Recordings.create({
    //   name: req.body.name,
    //   blob_file: req.files[0].buffer,
    // });
    // return responseHandler(res, false, "", [], responseCodes.SUCCESS);
    ////////////////////////////////
    const { buffer: recording } = req.files[0];
    // fs.writeFileSync(`${__dirname}/audio/${req.body.name}.wav`, recording);
    ////////////////////////////////
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
