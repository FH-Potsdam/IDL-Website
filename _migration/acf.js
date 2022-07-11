const fs = require('fs');

const cleanUp = {
  "people": ["publications"],
  "projects": ["related_publications", "project_team"]
};

const regEx = /\"(\d*?)\"/gm;

const files = Object.keys(cleanUp);
for (let f = 0; f < files.length; f += 1) {
  const file = JSON.parse(fs.readFileSync('../src/site/_data/' + files[f] + '.json', 'utf-8'));
  file.forEach(item => {
    cleanUp[files[f]].forEach(key => {
      if (item[key] && (typeof item[key] === 'string')) {
        item[key] = [...item[key].matchAll(regEx)].map(i => parseInt(i[1]));
      }
    });
  });
  fs.writeFileSync('../src/site/_data/' + files[f] + '-fix.json', JSON.stringify(file, null, 2), 'utf-8');
}