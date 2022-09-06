const fs = require('fs');
const YAML  = require('json2yaml');

const languages = [
  'de',
  'en'
];

const runProjects = true;
// projects.json > de||en/projects/slug
if (runProjects) {
  const projects = JSON.parse(fs.readFileSync('../src/site/_data/projects.json', 'utf8'));
  projects.forEach(p => {
    languages.forEach(l => {
      const props = {};
      Object.keys(p).forEach(key => {
        if (key !== 'page') {
          if (p[key] && typeof p[key] === 'object' && 'en' in p[key]) {
            props[key] = p[key][l];
          } else {
            props[key] = p[key];
          }
        }
      });
      let file = YAML.stringify(props);
      file += '\n---\n\n' + p['page'][l];
      fs.writeFileSync('../src/site/' + l + '/projects/' + p['slug'] + '.md', file, 'utf8');
    });
  });
}
