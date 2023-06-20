# Kela Terapeuttihakemiston taulukkosivu

Taulukkosivu, joka mahdollistaa Kelan terapeuttihakemiston datan järjestämisen, selaamisen, suodattamisen sekä automatisoi sähköpostien lähettämistä.

## Kuvaus

Ohjelma hakee projektin toiselta osiolta rajapinnasta terapeuttien tiedon ja muodostaa niistä yksinkertaisen taulukkonäkymän. Taulukon jokainen sarake on erikseen järjestettävissä, suodatettavissa sekä piilotettavissa. Terapeutteja voidaan helposti valita yksi tai useampi suodatuksen jälkeen, jolloin sähköpostin lähettäminen heille on helppoa.

### Kuvankaappauksia 

Päänäkymä
![image](https://user-images.githubusercontent.com/35933416/235946615-34ae7a93-756f-491a-be37-cbae98f0b7c9.png) 

Ryhmitys
![image](https://user-images.githubusercontent.com/35933416/235947007-bac7e357-a3f0-4de6-b999-d8b2170e3e14.png)


## Aloittaminen

### Vaatimukset

* Next.js
* https://github.com/telaak/tays-terapeutit-backend

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
