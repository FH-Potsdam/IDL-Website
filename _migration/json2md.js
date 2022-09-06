const fs = require('fs');

const languages = [
  'de',
  'en'
];

const runProjects = true;
// projects.json > de||en/projects/slug
if (runProjects) {
  const projects = JSON.parse(fs.readFileSync('../src/site/_date/projects.json', 'utf8'));
  projects.forEach(p => {
    languages.forEach(l => {
      
    });
  });
}

{
  "name": {
    "de": "mæve",
    "en": "mæve"
  },
  "page": {
    "en": "The installation was part of the International Venice Biennale of Architecture 2008.\n\nmæve connects the entries of the Everyville student competition and puts them into the larger context of MACE content and metadata. By placing physical project cards on an interactive surface, users can explore the presented projects, embedded in an organic network of associated projects, people and media.\n\n<a href=\"http://dev.jorditost.com/idl/wp-content/uploads/2015/06/maeve_installation_2-e1288790434777.jpg\"><img class=\"alignnone size-full wp-image-47\" src=\"http://dev.jorditost.com/idl/wp-content/uploads/2015/06/maeve_installation_2-e1288790434777.jpg\" alt=\"maeve_installation_2-e1288790434777\" width=\"800\" height=\"600\" /></a>\n\n<a href=\"http://dev.jorditost.com/idl/wp-content/uploads/2015/06/maeve_screen_1-e1288790418133.png\"><img class=\"alignnone size-full wp-image-48\" src=\"http://dev.jorditost.com/idl/wp-content/uploads/2015/06/maeve_screen_1-e1288790418133.png\" alt=\"maeve_screen_1-e1288790418133\" width=\"800\" height=\"436\" /></a>\n\nThe installation consists of an interactive surface and a large projection area. While users are interacting with the contents of the installation on the interactive surface, the network and the media files are displayed on the large projection.\n\nThe ten winning projects from the Everyville student competition are represented as physical cards. If a card is placed on the interactive surface, a contextual space is opened around the project. Within this space, media files, related projects and keywords are visualized. When a second card is placed on the surface, the space turns into a network, displaying similarities between the projects. In addition to the Everyville cards, the installation also contains »inspired projects« from the MACE repositories. These projects are also represented by project cards and enable the visitors to connect the Everyville projects to MACE contents. Furthermore, as the interaction with the cards is not limited to the one person, entire groups and teams can explore the content together.\n\nhttps://vimeo.com/16245192\n<h3>Credits</h3>\nThe installation is realized in Java and uses the Processing and Gestalt frameworks. For the card tracking, reactiVision 1.4 software is used. The production of the table was supported by Werk5 in Berlin.\n\nIt was conceived and funded within the MACE project. MACE (Metadata for Architectural Contents in Europe) is a pan-european initiative to interconnect and disseminate digital information about architecture. In this context, the installation fosters understanding of the contextual space between different projects and evokes the idea of architecture as an extensive creative and intellectual network.",
    "de": "<p>Die Installation war Teil der 11. Internationalen Architekturbiennale 2008 in Venedig.\n\n<a href=\"http://dev.jorditost.com/idl/wp-content/uploads/2015/06/maeve_installation_2-e1288790434777.jpg\"><img class=\"alignnone size-full wp-image-47\" src=\"http://dev.jorditost.com/idl/wp-content/uploads/2015/06/maeve_installation_2-e1288790434777.jpg\" alt=\"maeve_installation_2-e1288790434777\" width=\"800\" height=\"600\" /></a>\n\n<a href=\"http://dev.jorditost.com/idl/wp-content/uploads/2015/06/maeve_screen_1-e1288790418133.png\"><img class=\"alignnone size-full wp-image-48\" src=\"http://dev.jorditost.com/idl/wp-content/uploads/2015/06/maeve_screen_1-e1288790418133.png\" alt=\"maeve_screen_1-e1288790418133\" width=\"800\" height=\"436\" /></a>\n\nmæve verbindet die Einreichungen des studentischen Everyville Wettbewerbs und stellt diese in den größeren Kontext der MACE Inhalte und Metadaten. Indem die Besucher_innen physische Projektkarten auf den interaktiven Tisch legen, können die präsentierten Projekte eingebettet in ein organisches Netzwerk verwandter Projekte, Personen und Medien, exploriert werden.\n\nDie Installation besteht aus einem interaktiven Tisch sowie einer großen Projektionsfläche. Während die Benutzer_innen mit den einzelnen Objekten auf dem Tisch interagieren, werden verknüpfte Medieninhalte auf den Projektionsflächen abgebildet.\n\nDie zehn Gewinnerprojekte des studentischen Everyville Wettbewerbs werden auf physischen Karten dargestellt. Sobald eine Karte auf den Tisch gelegt wird, öffnet sich automatisch eine Kontextebene, auf welcher verwandte Projekte und Stichworte um die Karte herum angeordnet werden. Wird eine weitere Karte auf den Tisch gelegt, wird der Raum zwischen den Karten für eine Netzwerkdarstellung genutzt, welche die Überschneidungen der beiden Projekte sichtbar macht. Neben den studentischen Beiträgen beinhaltet die Installation auch ausgewählte Projekte aus der MACE Sammlung. Diese Inhalte sind ebenfalls auf Karten abgebildet und erlauben es den Besucher_innen die Everyville Inhalte mit den MACE Inhalten zu verknüpfen. Da die Karten-Interaktion nicht auf eine Person beschränkt ist, ist es auch ganzen Gruppen möglich, die Inhalte zusammen zu erforschen.\n\nhttps://vimeo.com/16245192\n\n<strong>CREDITS</strong>\n\nDie Installation wurde in JAVA programmiert und nutzt das Processing und Gestalt Framework. Für das Tracking der Karten wurde die Reactivision 1.4 Software genutzt. Beim Bau des Tischen wurden wir unterstützt von der Firma Werk5 aus Berlin.\n\nDas Projekt wurde innerhalb des MACE Projekts konzipiert und finanziert. MACE (Metadata for Architectural Contents in Europe) ist eine paneuropäische Initiative mit dem Ziel, digital verfügbare Informationen über Architektur zu vernetzen und zu verbreiten. In diesem Kontext unterstützt die Installation das Verständnis für den Raum an Kontext und Bezügen zwischen verschiedenen Projekten und evoziert die Idee, dass Architektur von einem weitreichenden kreativen und intellektuellen Netzwerk geprägt ist.</p>"
  },
  "excerpt": {
    "en": "The interactive installation »mæve« (MACE-Everyville) provides visual and tangible access to the social and intellectual networks behind architectural projects.",
    "de": "Die interaktive Installation »mæve« (MACE-Everyville) ermöglicht die visuelle und haptische exploration sozialer und intellektueller Netzwerke von Architektur Projekten."
  },
  "wp_id": 44,
  "slug": "maeve",
  "group": [
    "Highlight",
    "Tangible",
    "Visualization"
  ],
  "filter_themen": ["Speculation", "Dashboard"],
  "filter_services": ["UI/UX", "Design Thinking", "Human-Centered Design"],
  "filter_art":["Forschung"],
  "subtitle": {
    "en": "Tangible Exploration of Social and Intellectual Networks",
    "de": "Haptische Exploration von sozialen und geistigen Netzwerken"
  },
  "project_year": 2009,
  "project_partners_name": [
    "IUAV University of Venice",
    "Department of Architecture",
    "Collaboratorio, Venice",
    "Werk 5, Berlin",
    "MACE consortium"
  ],
  "project_partners_url": [
    "",
    "",
    "",
    "",
    ""
  ],
  "project_team": [34, 38],
  "project_website": "http://interface.fh-potsdam.de/maeve/",
  "project_team_external_name": [
    "Tina Deiml-Seibt, FHP",
    "Steffen Fiedler, FHP",
    "Jonas Loh, FHP",
    "Tomek Ness, FHP",
    "Larissa Pschetz, FHP",
    "Moritz Stefaner, FHP",
    "Stephan Thiel, FHP",
    "Nick Rübesamen, Werk5",
    "Prof. Vitorio Spigai, IUAV",
    "Massimiliano Condotta, IUAV",
    "Elisa Dalla Vecchia, IUAV",
    "Elena Orzali, IUAV"
  ],
  "project_team_external_url": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  "project_material": "",
  "related_publications": [
    194,
    193
  ],
  "related_projects": "",
  "thumbnail_id": 45,
  "project_funding_name": "",
  "project_funding_url": [],
  "project_funding_logo": "",
  "featured_home": true,
  "project_client_name": [],
  "project_client_url": [],
  "project_client_logo": []
},