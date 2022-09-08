const fs = require('fs');
const YAML  = require('json2yaml');

const languages = [
  'de',
  'en'
];

const runProjects = true;
// projects.json > de||en/projects/slug
if (runProjects) {
  const projects = JSON.parse(fs.readFileSync('../src/site/_data/_projects.json', 'utf8'));
  projects.forEach(p => {
    languages.forEach(l => {
      const props = {};
      Object.keys(p).forEach(key => {
        if (p[key] && typeof p[key] === 'object' && 'en' in p[key]) {
          props[key] = p[key][l];
        } else {
          props[key] = p[key];
        }
      });

      const page = props['page'];
      delete props['page'];

      props['thumbnail'] = null;

      if (!props['featured_home'] || props['featured_home'] == null) {
        props['featured_home'] = false;
      }

      const mergeKeys = {
        project_partners: [
          ['project_partners_name', 'name'],
          ['project_partners_url', 'url']
        ],
        project_team_external: [
          ['project_team_external_url', 'url'],
          ['project_team_external_name', 'name']
        ],
        project_funding: [
          ['project_funding_name', 'name'],
          ['project_funding_url', 'url'],
          ['project_funding_logo', 'logo']
        ],
        project_client: [
          ['project_client_name', 'name'],
          ['project_client_url', 'url'],
          ['project_client_logo', 'logo'],
        ]
      }

      Object.keys(mergeKeys).forEach(key => {
        const els = [];
        if (typeof props[mergeKeys[key][0][0]] === 'object') {
          props[mergeKeys[key][0][0]].forEach((obj, i) => {
            const el = {};
            mergeKeys[key].forEach(key_value => {
              el[key_value[1]] = props[key_value[0]][i];
            });
            els.push(el);
          });
        }
        props[key] = els;
        mergeKeys[key].forEach(key_value => {
          delete props[key_value[0]];
        });
      });

      let file = YAML.stringify(props);
      file += '\n---\n' + page;
      fs.writeFileSync('../src/site/' + l + '/projects/' + p['slug'] + '.md', file, 'utf8');
    });
  });
}



const runPeople = false;
// people.json > de||en/people/slug
if (runPeople) {
  const people = JSON.parse(fs.readFileSync('../src/site/_data/_people.json', 'utf8'));
  people.forEach(p => {
    languages.forEach(l => {
      const props = {};
      Object.keys(p).forEach(key => {
        if (p[key] && typeof p[key] === 'object' && 'en' in p[key]) {
          props[key] = p[key][l];
        } else {
          props[key] = p[key];
        }
      });

      const page = props['page'];
      delete props['page'];

      if (!props['thumbnail_id'] || props['thumbnail_id'] == null) {
        props['thumbnail_id'] = '';
      }

      let file = YAML.stringify(props);
      file += '\n---\n' + page;
      fs.writeFileSync('../src/site/' + l + '/people/' + p['slug'] + '.md', file, 'utf8');
    });
  });
}

const runPublications = false;
// publications.json > publications/slug
if (runPublications) {
  const publications = JSON.parse(fs.readFileSync('../src/site/_data/_publications.json', 'utf8'));
  publications.forEach(p => {
    const props = {};
    Object.keys(p).forEach(key => {
      if (p[key] && typeof p[key] === 'object' && 'en' in p[key]) {
        props[key] = p[key]['de'];
      } else {
        props[key] = p[key];
      }
    });

    props['body'] = props['page'];
    delete props['page'];

    const mergeKeys = {
      authors: [
        ['authors_names', 'name'],
        ['authors_ids', 'url']
      ]
    }

    Object.keys(mergeKeys).forEach(key => {
      const els = [];
      if (typeof props[mergeKeys[key][0][0]] === 'object') {
        props[mergeKeys[key][0][0]].forEach((obj, i) => {
          let el = {};
          mergeKeys[key].forEach(key_value => {
            el[key_value[1]] = props[key_value[0]][i];
          });
          if (el.url === 112 || el.url === '112') {
            el = {
              internal_author_de: '/de/people/sebastian-meier',
              internal_author_en: '/en/people/sebastian-meier'
            };
          }
          if (el.url === 33 || el.url === '33' || el.name === 'Heidmann, Frank') {
            el = {
              internal_author_de: '/de/people/frank-heidmann',
              internal_author_en: '/en/people/frank-heidmann'
            };
          }

          els.push(el);
        });
      }
      props[key] = els;
      mergeKeys[key].forEach(key_value => {
        delete props[key_value[0]];
      });
    });

    let file = YAML.stringify(props);
    fs.writeFileSync('../src/site/publications/' + p['slug'] + '.md', file, 'utf8');
  });
}
