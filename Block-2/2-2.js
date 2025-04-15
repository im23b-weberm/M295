const fs = require('node:fs');

// Funktion, die den Inhalt einer Datei als Promise zurückgibt
function leseDateiInhalt(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        reject(err); // Fehler beim Lesen
      } else {
        resolve(data); // Dateiinhalt erfolgreich gelesen
      }
    });
  });
}

// Aufruf der Funktion und Verarbeitung der Promise
leseDateiInhalt('beispiel.txt')
  .then((inhalt) => {
    console.log('Länge des Dateiinhalts:', inhalt.length);
  })
  .catch((fehler) => {
    console.error('Fehler beim Lesen der Datei:', fehler.message);
  });
