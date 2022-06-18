const http = require("http");
const fs = require("fs");
const url = require("url");
const { getFile, saveFile } = require("./archivos");
const { newRoommate, saveRoommate, getRoommates } = require("./roommate");
const { addBills, editBills, deleteBills } = require("./gastos");

const PORT = 3000;

http
  .createServer(async (req, res) => {
    // Randerizamos el index para iniciar el servidor con localhost:3000
    if (req.url == "/" && req.method == "GET") {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      try {
        let data = await getFile("index.html");
        res.end(data);
      } catch (e) {
        res.statusCode = 500;
        res.end("error");
      }
    // Adquirimos y creamos informacion de roommates
    } else if (req.url == "/roommate" && req.method == "POST") {
      newRoommate()
        .then((result) => {
          saveRoommate(result);
          res.end(JSON.stringify(result));
        })
        .catch((err) => {
          res.statusCode = 500;
          res.end();
          console.log("Existe un error al registra el Roommate");
        });
    // Imprimimos roommates obtenidos anteriormente
    } else if (req.url == "/roommates" && req.method == "GET") {
      try {
        let roommates = await getRoommates();
        res.end(JSON.stringify(roommates));
      } catch (e) {
        console.log("error", e);
        res.statusCode = 500;
        res.end("error");
      }
    // Obtenemos informacion de gastos de roommates creados
    } else if (req.url == "/gastos" && req.method == "GET") {
      try {
        fs.readFile("gasto.json", "utf8", (err, data) => {
          if (err) {
            console.log("error:", err);
            res.statusCode = 500;
            res.end("error");
          } else {
            let jsonData = JSON.parse(data);
            res.end(JSON.stringify(jsonData));
          }
        });
      } catch (e) {
        console.log("error", e);
        res.statusCode = 500;
        res.end("error");
      }
      // Imprimimos el gasto en pantalla contabilizado anteriormente
    } else if (req.url == "/gasto" && req.method == "POST") {
      try {
        let body;
        req.on("data", (payload) => {
          body = JSON.parse(payload);
        });
        req.on("end", () => {
          addBills(body);
        });
        res.end();
      } catch (e) {
        console.log("error", e);
        res.statusCode = 500;
        res.end("error");
      }

// Falto revisar lo eitar lo del gasto
    } else if (req.url == "/gasto" && req.method == "PUT") {
      try {
        let data = await getFile("gasto.json");
        let jsonData = JSON.parse(data);
        let body;
        req.on("data", (payload) => {
          body += payload;
        });
        req.on("end", async () => {
          let bodyJSON = JSON.parse(body);
          jsonData.gastos.roommate = bodyJSON.gastos.roommate;
          jsonData.gastos.descripcion = bodyJSON.gastos.descripcion;
          jsonData.gastos.monto = bodyJSON.gastos.monto;         
          await saveFile("gasto.json", JSON.stringify(jsonData));
          res.statusCode = 201;
          res.end(JSON.stringify(jsonData));
        });
      } catch (error) {
        console.log("error:", err);
        res.statusCode = 500;
        res.end("error");
      }


// Falto revisar lo de eliminar el gasto
    } else if (req.url.startsWith("/gasto") && req.method == "DELETE") {
  //     const { id } = url.parse(req.url, true).query;
  //     let gastosJSON = JSON.parse(await deleteBills());
  //     let gastos = gastosJSON.gastos;

  //     gastosJSON.gastos = gastos.filter((g) => g.id !== id);
  //     try {
  //         await saveRoommate(gastosJSON);
  //         res.statusCode = 200;
  //         res.end(JSON.stringify(gastosJSON));
  //     } catch (e) {
  //         res.statusCode = 500;
  //         res.end(e);
  //     }
  // } else {
  //     res.setHeader = 404;
  //     let resp404 = {
  //         error: 404,
  //         message: 'Recurso no encontrado'
  //     }
  //     res.end(JSON.stringify(resp404));
  }
})
  .listen(PORT, () => console.log("iniciando el puerto", PORT));
