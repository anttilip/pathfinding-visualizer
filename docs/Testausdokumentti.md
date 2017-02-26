# Testausdokumentti

Projektissa on jätetty yksikkötestauksen ulkopuolelle kaikki käyttöliittymän
komponentit ja metodit. Erityisesti testattuna on tietorakenteet heap ja list,
sekä node ja graph logiikan osalta.

Polunetsintäalgoritmeja on melko vaikea testata yksikkötesteillä, joten
niitä testasin ajamalla muutamia verkkoja joiden pituus on tiedossa jo etukäteen.
Osa polunetsintäalgoritmeista ei tuota lyhyintä reittiä, esim. DFS tai best first,
joten niiden osalta testataan vain, että maalisolmu löytyy jos se on löydettävissä.
Testaamani verkot löytyvät [täältä](../test/pathfinders/mazes.js).

Tietorakenteiden syötteinä yritin testata monipuolisia syötteitä, joten esimerkiksi
osa [heapin testeistä](../test/data-structures/heapTest.js) yrittää simuloida
"satunnaista" syötettä. Lisäksi syötteiden koot on laitettu suuriksi List-luokan
sisäisen arrayn testaamiseen.

Testit voi ajaa seuraavasti:
1. Kloonaa repositorio `git clone https://github.com/anttilip/pathfinding-visualizer.git`
2. Siirry kansioon `cd pathfinding-visualizer`
3. Lataa vaadittavat paketit `npm install`
4. Aloita testien suorittaminen `npm test`
5. Avaa selaimella annettu url (oletuksena `localhost:9876`)
6. Avaa raportti kansiosta test/coverage.

Testien tulokset on tosin myös nähtävillä [Travis-CI](https://travis-ci.org/anttilip/pathfinding-visualizer) ja coverage-raportit
[Coveralls](https://coveralls.io/github/anttilip/pathfinding-visualizer?branch=master).

Alustavaa suorituskykytestausta on nähtävillä nettisivullani, mutta se on rajattu
käyttäjän piirtämiin 256x256 verkkoihin.

Syvällisempi suorituskykytestaus tulee
[tällä datalla](http://www.movingai.com/benchmarks/) viimeiseen palautukseen.
