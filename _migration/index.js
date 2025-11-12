const fs = require('fs');
const {XMLParser} = require('fast-xml-parser');

const options = {
    ignoreAttributes : false
};

const parser = new XMLParser(options);

const file = fs.readFileSync('./idl.WordPress.2022-01-14.xml', 'utf8');

let jsonObj = parser.parse(file);

const publications = [];
const people = [];
const projects = [];
const attachments = [];

const extractText = (txt) => {
  const regex = /<!--:[a-z]*-->[^<]*/gm;
  const regexEn = /<!--:en-->/gm;
  const regexDe = /<!--:de-->/gm;
  const regexAlt = /\[:[den]*\][^\[]*/gm;
  const regexAltEn = /\[:en\]/gm;
  const regexAltDe = /\[:de\]/gm;
  const matches = [...txt.matchAll(regex)];
  const matchesAlt = [...txt.matchAll(regexAlt)];
  if (matchesAlt.length > 0) {
    const re = {
      en:'',
      de:''
    };
    matchesAlt.forEach(m => {
      const match = m[0];
      if (match.search(regexAltDe) >= 0) {
        re.de = match.substring(5);
      } else if (match.search(regexAltEn) >= 0) {
        re.en = match.substring(5);
      }
    });
    if (re.de === '') { re.de = re.en; }
    if (re.en === '') { re.en = re.de; }
    return re;
  } else if (matches.length > 0) {
    const re = {
      en:'',
      de:''
    };
    matches.forEach(m => {
      const match = m[0];
      if (match.search(regexDe) >= 0) {
        re.de = match.substring(10);
      } else if (match.search(regexEn) >= 0) {
        re.en = match.substring(10);
      }
    });
    if (re.de === '') { re.de = re.en; }
    if (re.en === '') { re.en = re.de; }
    return re;
  } else {
    return {
      de: txt,
      en: txt
    }
  }
};

const extractMeta = (metas, keys) => {
  const re = {};

  keys.forEach(key => {
    if (key.length === 3) {
      re[key[1]] = [];
    } else {
      re[key[1]] = null;
    }
  });

  metas.forEach(meta => {
    keys.forEach(key => {
      if (meta['wp:meta_key'].search(key[0]) === 0) {
        if (key.length === 3) {
          re[key[1]].push(meta['wp:meta_value']);
        } else {
          re[key[1]] = meta['wp:meta_value'];
        }
      }
    });
  });

  return re;
};

jsonObj.rss.channel.item.forEach(item => {
  // publications
  if (item['wp:post_type'] === 'publication') {
    let publication = {
      title: extractText(item.title),
      wp_id: item['wp:post_id'],
      page: extractText(item['content:encoded']),
      slug: item['wp:post_name'],
      year: item.category['#text'],
      authors: {
        names: [],
        ids: []
      },
      outlet: ''
    };

    publication = {...publication, ...extractMeta(item['wp:postmeta'], [
      [/publication_authors_[0-9]*_name/gm, 'authors_names', true],
      [/publication_authors_[0-9]*_url/gm, 'authors_ids', true],
      [/publication_conference/gm, 'outlet']
    ])};

    publications.push(publication);
  
  // people
  } else if (item['wp:post_type'] === 'people') {
    let person = {
      name: extractText(item.title),
      page: extractText(item['content:encoded']),
      excerpt: extractText(item['excerpt:encoded']),
      wp_id: item['wp:post_id'],
      slug: item['wp:post_name'],
      group: item.category ? item.category['#text'] : null,
      subtitle: {de:null, en: null},
      website: null,
      email: null,
      twitter: null,
      thumbnail_id: null,
      publications: null
    };

    person = {...person, ...extractMeta(item['wp:postmeta'], [
      [/subtitle/gm, 'subtitle'],
      [/member_website/gm, 'website'],
      [/member_email/gm, 'email'],
      [/member_twitter/gm, 'twitter'],
      [/member_publications/gm, 'publications'],
      [/_thumbnail_id/gm, 'thumbnail_id']
    ])};

    person.subtitle = extractText(person.subtitle);
    person.sort_name = person.name.en.trim().split(' ').slice(-1)[0];

    people.push(person);

  // projects
  } else if (item['wp:post_type'] === 'project') {
    if (item.category && ('#text' in item.category)) {
      item.category = [item.category];
    }
    let project = {
      name: extractText(item.title),
      page: extractText(item['content:encoded']),
      excerpt: extractText(item['excerpt:encoded']),
      wp_id: item['wp:post_id'],
      slug: item['wp:post_name'],
      group: item.category ? item.category.map(c => c['#text']) : null,
      subtitle: {de:null, en: null},
      project_year: null,
      project_partners_name: [],
      project_partners_url: [],
      project_team: null,
      project_website: null,
      project_team_external_name: [],
      project_team_external_url: [],
      project_material: null,
      related_publications: null,
      related_projects: null,
      thumbnail_id: null,
      project_funding_name: [],
      project_funding_url: [],
      project_funding_logo: [],
      featured_home: null,
      project_client_name: [],
      project_client_url: [],
      project_client_logo: []
    };

    project = {...project, ...extractMeta(item['wp:postmeta'], [
      [/subtitle/gm, 'subtitle'],
      [/project_year/gm, 'project_year'],
      [/project_partners_[0-9]*_name/gm, 'project_partners_name', true],
      [/project_partners_[0-9]*_url/gm, 'project_partners_url', true],
      [/project_team/gm, 'project_team'],
      [/project_website/gm, 'project_website'],
      [/project_team_external_[0-9]*_name/gm, 'project_team_external_name', true],
      [/project_team_external_[0-9]*_url/gm, 'project_team_external_url', true],
      [/project_material/gm, 'project_material'],
      [/related_publications/gm, 'related_publications'],
      [/related_projects/gm, 'related_projects'],
      [/_thumbnail_id/gm, 'thumbnail_id'],
      [/project_funding_[0-9]*_name/gm, 'project_funding_name', true],
      [/project_funding_[0-9]*_url/gm, 'project_funding_url', true],
      [/project_funding_[0-9]*_logo/gm, 'project_funding_logo', true],
      [/featured_home/gm, 'featured_home'],
      [/project_client_[0-9]*_name/gm, 'project_client_name', true],
      [/project_client_[0-9]*_url/gm, 'project_client_url', true],
      [/project_client_[0-9]*_logo/gm, 'project_client_logo', true],
    ])};

    project.subtitle = extractText(project.subtitle);

    projects.push(project);

    // attachments
    } else if (item['wp:post_type'] === 'attachment') {
      let attachment = {
        name: extractText(item.title),
        guid: item.guid['#text'],
        url: item['wp:attachment_url'],
        wp_id: item['wp:post_id'],
        link: item['link'],
        slug: item['wp:post_name']
      };

      attachments.push(attachment);
    }
});

fs.writeFileSync('../src/site/_data/publications.json', JSON.stringify(publications, null, 2), 'utf8');
fs.writeFileSync('../src/site/_data/people.json', JSON.stringify(people, null, 2), 'utf8');
fs.writeFileSync('../src/site/_data/projects.json', JSON.stringify(projects, null, 2), 'utf8');
fs.writeFileSync('../src/site/_data/attachments.json', JSON.stringify(attachments, null, 2), 'utf8');