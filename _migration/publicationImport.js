const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const slugify = require('slugify');

const clr = (str) => str.split('"').join('\"');

fs.createReadStream(path.resolve(__dirname, '2023_02_references_heidmann.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
      console.log(row);
      // Let's hope we don't publish something under the same name twice :)
      // SEBASTIAN
      // const fileName = slugify(row.title) + '.md';
      // const body = `---
      // title: "${clr(row.title)}"
      // slug: "${slugify(row.title)}"
      // year: ${row.date}
      // outlet: "${row.publication}"
      // body: ""
      // authors:
      //   - name: ${row.authors}
      // project_pdf: "${row.link}"
      // `;
      // fs.writeFileSync('../src/site/publications/' + fileName, body, 'utf-8');

      // FRANK
      // const fileName = slugify(row["Title"]) + '.md';

      // let publication = '';
      // publication += row["Journal"];
      // publication += ' ' + row["Booktitel"];
      // publication += ' ' + row['Proceedings title'];
      
      // if (row["Volume"].length > 0 || row["Issue"].length > 0) {
      //   publication += ' (';
      //   publication += row["Volume"];
      //   if (row["Volume"].length > 0 && row["Issue"].length > 0) {
      //     publication += ':';
      //   }
      //   publication += row["Issue"];
      //   publication += ')';
      // }
      // if (row["Pages"].length > 0) {
      //   publication += ' p.' + row["Pages"];
      // }
      // if (row["Publisher"].length > 0) { publication += ', ' + row["Publisher"];}
      // if (row["Conference location"].length > 0) { publication += ', ' + row["Conference location"];}
      // publication = publication.trim();

      // const body = `---
      // title: "${clr(row["Title"])}"
      // slug: "${slugify(row["Title"])}"
      // year: ${row["Publication year"].length > 0 ? row["Publication year"] : row["Date published"]}
      // outlet: "${publication}"
      // body: ""
      // authors:
      //   - name: ${row["Authors"]}
      // project_pdf: "${row["URLs"]}"
      // `;
      // fs.writeFileSync('../src/site/publications/' + fileName, body, 'utf-8');


      /*authors: 
        - 
          name: "Thom, A."
          url: 132
        - 
          internal_author_de: "/de/people/sebastian-meier"
          internal_author_en: "/en/people/sebastian-meier"
        - 
          internal_author_de: "/de/people/frank-heidmann"
          internal_author_en: "/en/people/frank-heidmann"
      */
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));