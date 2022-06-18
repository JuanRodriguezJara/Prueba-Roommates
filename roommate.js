// ARCHIVO PARA LA OBTENCION, GUARDADO Y MODIFICACION DE LA INFORMACION DE LOS ROOMMATES, CON LA API http://randomuser.me/api

const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { getFile, saveFile } = require("./archivos");
const fs = require("fs");

const newRoommate = async () => {
  try {
    const { data } = await axios.get("http://randomuser.me/api");
    const roommate = data.results[0];
    const newRoommate = {
      id: uuidv4().slice(0, 6),
      nombre: `${roommate.name.first} ${roommate.name.last}`,
    };
    return newRoommate;
  } catch (e) {
    throw e;
  }
};

const saveRoommate = (roommate) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getFile("roommate.json");
      let jsonData = JSON.parse(data);
      let roommates = jsonData.roommates;
      roommates.push(roommate);
      saveFile("roommate.json", JSON.stringify(jsonData));
      resolve();
    } catch (e) {
      console.log("error:", e);
      reject(e);
    }
  });
};

const getRoommates = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("roommate.json", "utf8", (err, data) => {
      if (err) {
        console.log("error:", err);
        reject(err);
      } else {
        let jsonData = JSON.parse(data);
        resolve(jsonData);
      }
    });
  });
}


module.exports = { 
    newRoommate, 
    saveRoommate,
    getRoommates
};
