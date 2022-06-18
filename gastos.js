// ARCHIVO PARA LA CREACION, MODIFICACION Y ELIMINACION DE LOS GASTOS DE LOS ROOMMATES

const fs = require("fs");
const { getFile, saveFile } = require("./archivos");

const addBills = (gasto) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getFile("gasto.json");
      let jsonData = JSON.parse(data);
      let gastos = jsonData.gastos;
      gastos.push(gasto);
      saveFile("gasto.json", JSON.stringify(jsonData));
      resolve();
    } catch (e) {
      console.log("error:", e);
      reject(e);
    }
  });
};

const editBills = (gasto) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getFile("gasto.json");
      let jsonData = JSON.parse(data);
      let gastos = jsonData.gastos;
      gastos.map(gasto);
      saveFile("gasto.json", JSON.stringify(jsonData));
      resolve();
    } catch (e) {
      console.log("error:", e);
      reject(e);
    }
  });
};

module.exports = {
  addBills,
  editBills
};
