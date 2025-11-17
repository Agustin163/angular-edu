const fs = require('fs');
const path = require('path');

const getInfo = (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/info.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error reading data file' });
  }
};

module.exports = {
  getInfo
};

