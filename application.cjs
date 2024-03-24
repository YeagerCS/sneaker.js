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
