# Toteutusdokumentti

## Rakennetta lyhyesti
Renderer-luokka toimii löyhästi God-luokkana. Siellä säilytetään joka hetki
kyseistä "modea" esim Edit, Visualize tai Run.

Input-luokka nimensä mukaan kuuntelee käyttäjän syötettä, eli hiiren klikkauksia
ja vetämistä ja muuttaa Renderer-luokan "modea" tai suoraan manipuloi Gridiä.

Grid luokka kuvaa verkkoa tai sokkeloa, jossa polunetsintä suoritetaan. Grid
koostuu 2D arraystä Node-luokan instansseja.

Node-luokka esittää yhtä solmua, joka pitää sisällään sijaintia, väriä ja
itse polunetsintään liittyvää tietoa.

Visualizer-luokka visualisoi polunetsintää.

Finder on abstrakti luokka jonka kaikki polunetsintäalgoritmit toteuttavat.


## Saavutetut aika-ja tilavaativuudet

Aikavaativuudet vastaavat määrittelydokumentin vaativuuksia. Algoritmit ovat
yleisiä ja niiden toteuttamisessa ei ollut ongelmia, joten uskoisin, että
tavoitelluissa aika- ja tilavaativuuksissa pysyttiin.


## Suorituskykyvertailu

Tarkempi analyysi tulee viimeiseen palautukseen.

Kaikista nopein aina lyhiymmän reitin löytävä algoritmi oli A\*
Octile-heuristiikalla. Hieman octilea hitaampi oli Euclidean distance. Sen hitaus
johtuu siitä, että se tarkastelee enemmän solmuja kuin on tarvittavaa ja lisäksi
heursitiikafunktiossa joudutaan jatkuvasti laskemaan neliöjuurta joka on hidasta.
Dijkstra on algoritmeista kaikista hitain lähinnä siksi, että se käy usein eniten
solmuja läpi. Vaikka se ei käytä heuristikkaa, se silti säilöö solmut kekoon, jolloin
se joutuu käyttämään log(n) operaatioita verrattuna esim DFS, joka selviää lineaarisilla
operaatioilla. Keon käyttö on myös Dijkstran suurin ero BFS-algoritmiin.

Loput algoritmit / heuristiikat eivät aina löydä lyhyintä polkua.
Manhattan-etäisyys ei toimi optimaalisesti gridissä, jossa voi liikkua 8-suuntaan.
Otin sen mukaan vain kuvaamaan heursitiikkafunktion eroja. Nopeudeltaan se on samaa
tasoa kuin Octile, mutta erot riippuvat huomattavasti syötteestä. DFS, eli
syvyyssuuntainen haku on yksinkertaisilla syötteillä usein nopein, vaikka lyhyimmän
polun etsimiseen se on turha. Sen nopeus johtuu tietorakenteen lineaarisista
operaatioista ja harvojen solmujen tarkistamisesta.


## Puutteet ja parannusehdotukset

Tällä hetkellä sivulle ei ole vielä implementoitu Jump point search -algoritmia.
Sen lisääminen olisi mielenkiintoinen höyste. Lisäksi hauska ominaisuus olisi se,
että käyttäjä voisi ladata sivulle oman ASCII-merkkisen sokkelon, jonka sivu voisi
ratkaista ja visualisoida.

Sivu tukee tällä hetkellä vain neliöverkkoja, joten se rajoittaa ainakin osin
ratkaistavia verkkoja.


## Lähteet
[Wiki Dijkstra](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

[Wiki A\*](https://en.wikipedia.org/wiki/A*_search_algorithm)

[A\* Heuristics](http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html)

[Benchmark data](http://www.movingai.com/benchmarks/)
