# Viikko 6

Projekti edistyi tälläkin viikolla melko kiitettävästi. Sain kuin sainkin viimein
tehtyä coverage-raportit Travis-CI:n ja Coverallsin kautta. Näin siis myös testit
ovat luettavissa netissä. README:ssä on myös toki ohjeet manuaaliseen testaukseen
ja coveragejen luontiin.

Selkeämmän käyttöliittymän myötä myös suorituskykytestaus on integroitu nettisivuun.
Algoritmin käyttämä aika, polun pituus ja avattujen solmujen lukumäärä näkyy
canvaksen alapuolella kun käyttäjä painaa "run".

Lisäksi tein myös sivupalkin johon lisään yleistä informaatiota algoritmeista ja
heuristiikoista. Nyt se on vielä kesken.

Projektissa käytän nyt JavaScriptin Arrayn sijasta omaa List-luokkaa aina, kun
Javassa käytetttäisiin ArrayListiä tms. Toisin sanoen käytän JavaScriptin
Array-luokkaa vain määrätyn pituisena ja en käytä sen metodeja, kuten push() tai
pop().

Projektissa on vielä tehtävää ainakin kunnon suorituskykytestaus, parempi
dokumentaatio ja mahdollisesti vielä uusi algoritmi. Suorituskykytestaukseen
[löysin kiinnostavan test-setin](http://www.movingai.com/benchmarks/), joten
tulen käyttämään niitä viimeisessä palautuksessa.

Aikaa tuli käytettyä n. 16h