const express = require('express');
const path = require('path');
const fs = require("fs")

const app = express();

const indexPath = path.join(__dirname, 'index.html');
const pathExceptions = ["/src", "/scripts", "/node_modules", "/src/components"]
const color = {
  "blue": '\x1b[1;34m',
  "reset": '\x1b[0m',
  "underline": "\x1b[4m"
}

const sendFileIfExists = (req, res, next, filePaths, index = 0) => {
  if (index >= filePaths.length) {
    return next();
  }

  const filePath = filePaths[index];
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      res.type("application/javascript");
      return res.sendFile(filePath);
    } else {
      return sendFileIfExists(req, res, next, filePaths, index + 1);
    }
  });
};


app.use((req, res, next) => {
  const urlPath = path.join(__dirname, req.path);
  const jsFilePath = `${urlPath}.js`;
  const snkFilePath = `${urlPath}.snk`;
  const sneakerFilePath = `${urlPath}.sneaker`;
  
  const filePaths = [jsFilePath, snkFilePath, sneakerFilePath];

  sendFileIfExists(req, res, next, filePaths);
})

app.get("/", (req, res) => {
  res.sendFile(indexPath)
})

app.get('*', (req, res) => {
  const urlPath = path.join(__dirname, req.path)
  if(req.path === "/" || pathExceptions.some(path => path === req.path)){
    res.sendFile(indexPath)
  } else{
    fs.access(urlPath, fs.constants.F_OK, (err) => {
      if(err){
        res.sendFile(indexPath)
      } else{
        res.sendFile(urlPath);
      }
    })
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at ${color["blue"]}${color["underline"]}http://127.0.0.1:${PORT}${color["reset"]}`);
});
