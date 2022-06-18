const fs = require("fs");

const getFile = (nameFile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(nameFile, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const saveFile = (nameFile, contentString) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(nameFile, contentString, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getFile,
  saveFile,
};
