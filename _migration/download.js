const https = require('https');
const fs = require('fs');
const attachments = require('../src/site/_data/attachments.json');

Promise.all(attachments.map(a => {
  return new Promise((resolve, reject) => {
    const name = a.url.split('/').slice(-1)[0];
    const file = fs.createWriteStream('../src/site/images/migration/' + name);
    const req = https.get(a.url, (response) => {
      if (response.statusCode !== 200) {
        console.error(new Error(`Failed to get '${a.url}' (${response.statusCode})`));
        resolve();
        return;
      }
      response.pipe(file);
    });

    // The destination stream is ended by the time it's called
    file.on('finish', () => resolve());

    req.on('error', err => {
      fs.unlink(filePath, () => {
        console.error(err);
        resolve();
      });
    });

    file.on('error', err => {
      fs.unlink(filePath, () => {
        console.error(err);
        resolve();
      });
    });
  });
}));