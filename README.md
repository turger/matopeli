# Matopeli
Harjoitus Kodarit black belt -kurssille: klassinen matopeli Reactilla ja hookeilla.

- React.js on komponenttipohjainen JavaScript-kirjasto web-käyttöliittymien tekoon.
- Reactin hookit mahdollistavat staten (tilan) ja muiden Reactin ominaisuuksien käytön luokattomissa komponenteissa. https://reactjs.org/docs/hooks-intro.html

Jos pitää jakaa jokin url tai muu kurja copypastettava, niin voidaan perustaa kertakäyttöinen chat oppitunnin ajaksi käyttämällä esim. http://disposablechat.com tai jakaa koodia pastebinilla https://pastebin.com.

⚠️  Huom! Tämän repon commitit on pilkottu pieniin osiin järjestyksessä, jota voi seurata oppitunneilla.

# 0. Alkuvalmistelut
Asennetaan:
1. Git https://git-scm.com/
2. Node.js + npm https://nodejs.org/en/download
3. npx `npm install -g npx`
4. Atom tai joku muu hyvä ja kevyt editori

# 1. Create-react-app
Skipataan kehitysympäristön käsin konfigurointi ja käytetään Facebookin luomaa `create-react-app` npm-kirjastoa.

Luodaan uusi react-sovellus:  
`npx create-react-app matopeli` (haluamasi sovelluksen nimi, voi olla mitä vain)

Siirrytään luomamme sovelluksen hakemistoon:  
`cd matopeli`

Käynnistetään sovellus:  
`npm start`

# 2. Gitin käyttö
Käydään Macilla Terminaalilla tai Windowsilla git-bashilla yleiset komentorivikehotteet läpi: `cd`, `ls`, `pwd`, `mkdir` jne.

Asennetaan Git koneelle jos sitä ei jo löydy.
Tehdään gittiin tunnarit ja kaikille omat public-repot projektia varten. Tätä varten kaikilla täytyy olla oma sähköpostiosoite. Julkinen repository siksi, että voimme GitHubin ilmaisversiossa julkaista sivun Github pagesin avulla (ohjeet myöhempänä).

Lisätään gittiin tavaraa:
1. Mene edellisessä kohdassa luomaasi projektin hakemistoon `cd`-komennolla. Esim. `cd Documents/matopeli`. Tarkista että olet oikeassa paikassa komennolla `pwd`, joka tulostaa sijaintisi.
5. Kirjoita terminaaliin `git add .` lisätäksesi kaikki tässä kansiossa olevat tiedostot gittiin meneväksi.
6. Kirjoita terminaaliin `git commit -m "Tervehdys git"` tai jokin muu commit-viesti hipsujen sisään. Tästä komennosta pitäisi tulla ilmoitus että käyttäjää ei ole määritelty, joten määritellään se seuraavaksi.
7. Määritä käyttäjänimi: `git config user.name "Nimimerkkisi"`. HUOM! Tee komento *ILMAN* `--global`-valintaa, ettei git-käyttäjä asetu vahingossa koko tietokoneelle yleisesti käytettäväksi. Tarkista että nimi on asetettu oikein komennolla `git config user.name`. Määritä sähköposti samalla komennolla käyttämällä `user.name` sijaan `user.email`.
8. Kirjaudu GitHubiin https://github.com/login
9. Luo uusi repository klikkaamalla oikealta ylhäältä `+`-nappia ja sen alta `new repository`.
10. Keksi repolle nimi ja tee siitä public eli julkinen. Muita kenttiä ei tarvitse käyttää, klikkaa `Create repository`.
11. Tämän jälkeen käytä https-url-ohjeita
    `git remote add origin https://github.com/username/repon-nimi.git`
    - Voit tämän jälkeen tarkistaa että config-tiedostossa `.git/config` lukee `[core]` osaston alla url https://username@github.com sen sijaan että siellä olisi malli git@github.com. Aja komento `cat .git/config` joka tulostaa tiedoston komentoriville tarkastettavaksi.
      *NOTE!* GitHub vaatii vahvempaa autentikointia Elokuun 13, 2021 jälkeen. Otetaan silloin käyttöön personal access token. https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token
12. Vaihda branchiksi main `git branch -M main`
13. Lopuksi puske tiedosto Github-repositorioon:
    `git push -u origin main`
    Tämän jälkeen sinun pitää syöttää käyttäjätunnuksesi ja salasanasi.
14. Tarkista lopuksi että koodisi näkyy myös Githubin repossa selaimella katsottaessa.

(Käytetään https-urleja https://help.github.com/en/articles/which-remote-url-should-i-use)

Aina ennen oppituntia ja oppitunnin jälkeen tehdään git-rituaalit ohjeiden mukaisesti. Ohjekuva löytyy tämän repon juuresta `git-flow.png`.

# 3. Muokataan create-react-app-pohja omaan projektiin sopivaksi
- Käydään läpi mitä missäkin sovelluksen hakemistossa ja tiedostossa on sisällä ja mitä ne tekee.
- Muokataan `src/App.js`-tiedostoa ja katsotaan miltä se näyttää selaimella. Vaihdetaan otsikoksi matopeli.
- Poista `logo.svg`.
- Muokataan `index.html` ja `manifest.json` tiedostoihin oma projektin nimi ja kuvaus.
- Päivitetään `README.md`omat tekstit.
- Vaihdetaan public/favicon.ico omavalintaiseksi kuvaksi. Esim: https://favicon.io/emoji-favicons/
- Päivitä testi tarkistamaan että sivulla lukee matopeli.
- Poista reportWebVitals, koska sitä ei tarvita tässä projektissa. "By default, Create React App includes a performance relayer that allows you to measure and analyze the performance of your application using different metrics."
- Voidaan poistaa puolipisteet `;` rivien perästä, niitä ei tarvita

# 4. Tehdään pelilauta-komponentti
Luodaan `src/SnakeBoard.js`, johon tulee ensin 10x10 palan kokoinen pelilauta.
Kutsutaan pelilauta-komponenttia App.js-pääkomponentissa.
Tässä vaiheessa pelilauta näkyy vasta selaimen DevToolin kautta elementtejä selatessa. Seuraavassa kohdassa lisäämme css-muotoilut.

Lisäätän Atomiin package `atom-beautify`.
Windowsilla: File -> Settings -> +Install.
Macilla: Atom -> Preferences -> +Install.
Hae lisäosaa nimellä "atom-beautify" ja paina install. Asennuksen jälkeen käynnistä Atom uudelleen.
Tämän jälkeen Atomin valikosta valitse Packages -> Atom Beautify -> Settings. Rullaa asetussivulla osioon `JavaScript` ja valitse default beautifieriksi `Prettier` ja lisää täppä checkboxiin "Beautify on save".

# 5. Lisätään css
Poistetaan `src/App.css` tiedostosta kaikki muut muotoilut paitsi `.App` ja `.App-header`. Sitten luodaan otsikolle uudet muotoilut.
Voidaan lisätä otsikolle joku kiva fontti Google fontseista https://fonts.google.com/ (mutta ei käytetä fontin valintaan liikaa aikaa). Lisätään ohjeiden mukaan fontin import-rivi `public/index.html`-tiedostoon `<head>` tagin sisään, käynnistetään appi uudestaan ja sen jälkeen fonttia voi käyttää otsikossa ja muualla appissa.
Voidaan lisätä esimerkiksi taustakuva ja eri värejä. Muokataan myös `src/App.css` halutunlaiseksi.

Luodaan `src/SnakeBoard.css` ja tehdään haluttu muotoilu SnakeBoard-komponentille.

Esimerkeissä on käytetty flexboxia, joka on oikein mainio väline sivuston elementtien asetteluun halutuille paikoille. Tutustumisen avuksi on suositeltavaa pelata ensin Flexbox Froggy -harjoituspeliä https://flexboxfroggy.com, jonka jälkeen voidaan harjoitella omalla sivulla aikataulu-komponentin taulun sijoittamista sivun keskelle.

# 6. Lisätään mato
Lisätään mato, joka kulkee ruudun vasemmalta reunalta oikealle.
Valitaan madolle itselle mieluisa väri.

# 7. Liikutetaan matoa
Liikutetaan matoa eri suuntiin nuolinappuloiden perusteella.

# 8. Madon ruoka ja kasvu
Lisätään madon ruoka ja madon pituuden kasvaminen aina kun se saa herkun kiinni.
Emojivalikoimasta voi valita minkä vain herkun omaan peliin.

# 9. Pelin päättyminen
Peli päättyy jos mato osuu itseensä. Lisätään myös tarvittavat pelin päättymisen muotoilut ja ilmoitukset.

# 10. Lasketaan pisteet
Lisätään pisteidenlasku mukaan. Yhden ruuan syömisestä saa aina yhden pisteen.
Pisteet resetoituu kun uusi peli aloitetaan. Lisätään nappula uuden pelin aloittamiselle.

# 11. Pelin resetointi
Uusi peli -nappula ja sivun reload.
Lisäksi voidaan tässä vaiheessa tehdä pelilaudasta isompi ja madosta nopeampi.
Ruuduista (tile) voi tehdä pienempiä, jos haluaa oikein ison laudan.
Myös ruutujen reunavärit voi ottaa pois, jos pelistä haluaa haastavamman.

# 12. Pisteiden tallennus local storageen
Tallennetaan pisteet local storageen leaderboardia varten, jotta voidaan näyttää tällä selaimella tallennetut parhaat pisteet.
Tarkistetaan local storage dev toolsin kautta -> Application -> Storagen alta Local Storage -> valitse oikea localhost ja sieltä oikea key.

# 13. Lisätään leaderboard eli tuloslista
Lisätään tuloslista näkyviin. Tuloslistalle luetaan pisteet local storagesta.

# 14. Julkaistaan matopeli github pagesilla
Julkaistaan oma appi GitHub pagesin avulla.

* Lisää kirjasto nimeltä `gh-pages` projektiin ajamalla terminaalissa projektin hakemiston sisällä komento `npm install gh-pages`.  
  Tämä kirjasto auttaa meitä luomaan gittiin oman branchin nimeltä `gh-pages`, joka tarjoilee niputetut reactin tiedostot branchin kautta.

* Lisää `package.json`-tiedostoon nimen ja version alle rivi `"homepage": "https://<käyttäjänimi>.github.io/<repositoryn-nimi>"` eli esimerkiksi `"homepage": "https://turger.github.io/matopeli"`.

* Lisää `package.json`-tiedostoon skripti-osion sisään rivit:
```
"predeploy": "yarn run build",
"deploy": "gh-pages -d build"
```

* Terminaalissa aja komento `npm run deploy`. Tämä komento puskee buildatut projektin tiedostot `gh-pages`-branchiin GitHubin etäpalvelimelle.

* Lisää GitHubin käyttöliittymästä repositoryn asetuksista `GitHub Pages` -> `Source` ja valitse alasvetovalikosta valinta `gh-pages branch` (ellei ole jo automaattisesti valittuna).  
  Tähän valikkoon pitäisi nyt tulla vihreä teksti "Your site is published at https://turger.github.io/react-homma/" (omalla urlillasi toki). Vihreän tekstin ilmestymisessä voi mennä muutama minuutti, kun sivua julkaistaan. Tarkista toimiiko sivu.

Kun teet muutoksia ohjelmaasi, muista ajaa uusiksi komento `npm run deploy`, jotta muutokset menevät myös julkaistuille sivuillesi.

(Ohjeita esim. https://medium.com/the-andela-way/how-to-deploy-your-react-application-to-github-pages-in-less-than-5-minutes-8c5f665a2d2a)

# 15. Pisteidenlaskuun nimen lisäys
Pelin päättyessä kysytään nimimerkkiä ja tallennetaan se myös localstorageen.
Näytetään nimi pistelistauksessa.

# 16. Esteitä pelilaudalle
Lisätään pelilaudalle esteitä, joihin osuessa peli päättyy. Este arvotaan ennen pelin alkua randomisti.
Lisäksi oppilaat tekevät yhden omavalintaisen esteen kahden esimerkin lisäksi.

# 17. Pelilaudan koon voi valita ennen peliä
Lisää aloita peli -nappula joka aloittaa pelin. Ennen nappulan painamista käyttäjä voi halutessaan valita pelilaudan koon. Pelilaudan koko tallennetaan localstorageen.

Viimeisellä tunnilla hiotaan myös muotoiluja nätimmäksi.
