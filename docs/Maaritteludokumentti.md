# Pathfinding visualizer

Projektin aiheena on siis visualisoida polunetsintäalgormeja. Toteutan
mahdollisimman monta algoritmia, mutta ensisijaisesti A* ja Dijkstra.

Ohjelmointikielenä käytän JavaScriptiä ja visualisointi tapahtuu nettisivulla,
jossa on HTML5 canvas. Canvas sisältää jokaiselle algoritmille oman ruudukon.
Käyttäjä voi päättää ruudukkoon lähtöpisteen ja maalin, sekä piirtää esteitä.
Kun käyttäjä painaa "Run", algoritmit alkavat etsiä maalia lähtöpisteestä.

Tavoitteena on myös saada algoritmit toimimaan täysin irrallaan nettisivusta,
jolloin ne ovat uudelleenkäytettäviä muissa ohjelmissa.
