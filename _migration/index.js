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
      slug: item.post_name,
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
      slug: item.post_name,
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

    people.push(person);


}
});

fs.writeFileSync('../src/sites/_data/publications.json', JSON.stringify(publications, null, 2), 'utf8');
fs.writeFileSync('../src/sites/_data/people.json', JSON.stringify(people, null, 2), 'utf8');