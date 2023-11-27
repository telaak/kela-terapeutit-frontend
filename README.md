# Kela Terapeuttihakemiston taulukkosivu

Taulukkosivu, joka mahdollistaa Kelan terapeuttihakemiston datan järjestämisen, selaamisen, suodattamisen sekä automatisoi sähköpostien lähettämistä.

## Kuvaus

Ohjelma hakee projektin toiselta osiolta rajapinnasta terapeuttien tiedon ja muodostaa niistä yksinkertaisen taulukkonäkymän. Taulukon jokainen sarake on erikseen järjestettävissä, suodatettavissa sekä piilotettavissa. Terapeutteja voidaan helposti valita yksi tai useampi suodatuksen jälkeen, jolloin sähköpostin lähettäminen heille on helppoa.

### Kuvankaappauksia 

Päänäkymä
![image](https://github.com/telaak/kela-terapeutit-frontend/assets/35933416/19f5cb7e-95f2-4313-8b41-be547966548b)


Suodatusominaisuudet
![image](https://github.com/telaak/kela-terapeutit-frontend/assets/35933416/83c267e9-f6b6-46b2-a5f8-0afafede8783)


### Dokumentaatio

Suurin osa lähdekoodista on kommentoitu, ja kommenteista tehty TypeDoc-dokumentaatio löytyy osoitteests [https://terapeuttihaku.fi/docs/kela-frontend/](https://terapeuttihaku.fi/docs/kela-frontend/)

## Aloittaminen

### Vaatimukset

* Next.js
* https://github.com/telaak/kela-terapeutit-backend

### Asentaminen

1. `git pull github.com/telaak/kela-terapeutit-frontend.git`
2. Asenna paketit `npm i`
3. Aja Next.js `npx next build`
4. Täytä vaadittavat ympäristömuuttujat:
      * NEXT_PUBLIC_BACKEND_URL (.env.production -tiedostoon, osoite rajapintaan)
      * REVALIDATE_TOKEN (sama kuin rajapinnalla)
5. Käynnistä palvelin `npx next start`


### Docker

## Build

* `docker build -t username/kela-terapeutit-frontend`

## Compose

```
version: '3.8'

services:
    
  frontend:
    image: telaaks/kela-terapeutit-frontend
    restart: always
    environment:
      - REVALIDATE_TOKEN=jotain
    ports:
      - 3000:3000
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
