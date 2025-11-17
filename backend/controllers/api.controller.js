const path = require('path');
const fs = require('fs');

function loadJSON(fileName) {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

exports.getInfo = (req, res) => {
  const data = loadJSON('info.json');
  res.json(data);
};

exports.getIntroduccion = (req, res) => {
  const data = loadJSON('introduccion.json');
  res.json(data);
};

exports.getCaracteristicas = (req, res) => {
  const data = loadJSON('caracteristicas.json');
  res.json(data);
};

exports.getVentajas = (req, res) => {
  const data = loadJSON('ventajas.json');
  res.json(data);
};

exports.getComandos = (req, res) => {
  const data = loadJSON('comandos.json');
  res.json(data);
};

