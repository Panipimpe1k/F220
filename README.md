Opis Projektu
Aplikacja webowa do zarządzania listą świec zapachowych, stworzona w Node.js i Express.

## Technologie
- Node.js v18+
- Express
- MongoDB
- EJS
- JavaScript

## Funkcjonalności
- wyświetlanie listy świec
- Dodawanie nowej świecy
- Edycja istniejącej świecy
- Usuwanie świecy
- Renderowanie widoków z EJS

Struktura Projektu
/ public/
/  |---css/
/  |    |--- style.css
/  |---img/
/       |--- produkt.png
/       |--- Logo.png
/
/src/
/|-controllers/
/| |--- candlesControllers.js
/|
/|-data/
/| |--- connection.js
/|
/|-models/
/| |--- candlesModels.js
/|
/|-routes/
/| |--- candlesRouter.js
/|
/|-views/
/  |--- pages/
/  |    |--- add.ejs
/  |    |--- edit.ejs
/  |    |--- index.ejs
/  |    |--- view.ejs
/  |    |--- error.ejs
/  |
/  |--- partials/
/       |--- footer.ejs
/       |--- header.ejs
/       |--- navi.ejs
/
/--- app.js
/--- server.js
/
## Instalacja i uruchomienie

### Wymagania:

- Node.js v18+
- MongoDB (lokalnie lub Docker)

### Instalacja
npm init -y
npm install express ejs MongoDB

uruchomienie
npm start

Aplikacja dostępna pod adresem: `http://localhost:3098`

## Endpointy
GET  /           Lista świec
GET	 /add        Formularz dodawania
POST /add        Dodanie świecy
GET  /view/:id   Szczegóły świecy
GET	 /edit/:id   Formularz edycji
POST /edit/:id   Zapis edycji
POST /delete/:id Usunięcie świecy

## Licencja
Projekt udostepniony na licencji ISC

## Autor
Emilia Lorenczyk 4F 20
