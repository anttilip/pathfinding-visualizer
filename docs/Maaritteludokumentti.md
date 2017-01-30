# Pathfinding visualizer

Projektin aiheena on siis visualisoida polunetsintäalgormeja. Toteutan
mahdollisimman monta algoritmia, mutta ensisijaisesti A\* ja Dijkstra.

Ohjelmointikielenä käytän JavaScriptiä ja visualisointi tapahtuu nettisivulla,
jossa on HTML5 canvas. Canvas sisältää jokaiselle algoritmille oman ruudukon.
Käyttäjä voi päättää ruudukkoon lähtöpisteen ja maalin, sekä piirtää esteitä.
Kun käyttäjä painaa "Run", algoritmit alkavat etsiä maalia lähtöpisteestä.

Tavoitteena on myös saada algoritmit toimimaan täysin irrallaan nettisivusta,
jolloin ne ovat uudelleenkäytettäviä muissa ohjelmissa.

**Algoritmit**

| Algoritmi | Aikavaatimus minimikeolla     | Aikavaatimus Fibonacci-keolla |
|-----------|-------------------------------|-------------------------------|
| Dijkstra  | O((\|E\| + \|V\|)\*log(\|V\|))| O(\|E\| + \|V\|\*log(\|V\|))  |
| A\*       | O((\|E\| + \|V\|)\*log(\|V\|))| O(\|E\| + \|V\|\*log(\|V\|))  |

Kuten huomataan, A\* ja Dijkstra ovat aikavaatimuksiltaan (Big-O) yhtäläisiä, 
jos A\*:n heuristinen funktio on vakioaikainen. A\* onkin vain optimoitu 
erikoistapaus Dijkstran algoritmista, joka ottaa etsittävän solmun etäisyyden 
maalisolmusta huomioon. Asymptoottinen suoritusaika pysyy samana, vaikka A\* 
onkin usein huomattavasti Dijkstraa nopeampi. 

Jos algoritmien prioriteettijono toteutetaan minimikeon sijaan Fibonacci-keolla, 
ja algoritmien toteutuksessa on käytetty keon decrease-key metodia, laskee 
molempien algoritmien tasoitettu suoritusaika (amortized analysis) minimikekoon 
verrattuna. Algoritmien todellista nopeutta [voi kasvattaa][1] käyttämällä kekoa 
ilman decrease-key metodia.

**Tietorakenteet**

| Keko      | Pienimmän poisto | Lisäys   | Decrease-key |
|-----------|------------------|----------|--------------|
| Binääri   | O(log n)         | O(log n) | O(log n)     |
| Fibonacci | O(log n)         | O(1)     | O(1)         |

Fibonacci-keon aikavaatimukset ovat tasoitettuja.

Toteutan molemmat algoritmit ensisijaisesti binääriminimikeolla, mutta jos intoa
jää, saatan vertailla myös erilaisia kekoja keskenään.

[1]: http://www3.cs.stonybrook.edu/~rezaul/papers/TR-07-54.pdf
