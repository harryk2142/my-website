import type { APIRoute } from "astro";

const blogPosts = [
  {
    title: "Gedankenlesendes Bakterium entdeckt - Teil 2",
    img: "gruenes-bakterium-blaue-fluessingkeit-preview.webp",
    pubDate: "2023-08-01T00:00:00.000Z",
  },
  {
    title: "UFO oder fortschrittlicher Satellit? Was ist hier zu sehen?",
    img: "zwei-wissenschaftler-untersuchen-teile-eines-ufos-auf-einem-schwarz-weiß-bild-preview.webp",
    pubDate: "2023-07-21T00:00:00.000Z",
  },
  {
    title: "Ufo-Alarm in Kuhlingen",
    img: "ufos-mit-kuehen-auf-dem-feld-01-preview.webp",
    pubDate: "2023-07-13T00:00:00.000Z",
  },
  {
    title: "Ein grünes Rind mit Rockstar-Ambitionen",
    img: "gruenes-rind-mit-gitarre-preview.webp",
    pubDate: "2023-07-09T00:00:00.000Z",
  },
  {
    title: "Enthüllt: Die geheimnisvolle Blaupause",
    img: "geheimnisvolle-blaupause-mit-mensch-in-der-mitte-preview.webp",
    pubDate: "2023-07-02T00:00:00.000Z",
  },
  {
    title: "Die NASA schickt ein riesiges Gehirn ins Weltall",
    img: "gehirn-auf-einer-rakete-im-weltall-preview.webp",
    pubDate: "2023-06-26T00:00:00.000Z",
  },
  {
    title: "Großes Ameisenaufgebot vor dem Brandenburger Tor",
    img: "ameisen-protestieren-in-berlin-vor-dem-brandenburger-tor-preview.webp",
    pubDate: "2023-06-16T00:00:00.000Z",
  },
  {
    title: "Fliegende Zombies: Die neue Bedrohung aus der Luft",
    img: "zombie-reitet-auf-hai-preview.webp",
    pubDate: "2023-06-12T00:00:00.000Z",
  },
  {
    title: "Elektroautos besonders beliebt bei UFO-Entführungen",
    img: "elektroauto-wird-von-ufo-entfuehrt-preview.webp",
    pubDate: "2023-06-05T00:00:00.000Z",
  },
  {
    title:
      "Valdar der Reptiloid: Ein ungewöhnlicher Urlaub am legendären Strand von Kreta",
    img: "reptiloide-mit-strohhut-preview.webp",
    pubDate: "2023-05-18T00:00:00.000Z",
  },
  {
    title: "Gigantischer Gorilla in Frankfurt gesichtet",
    img: "gigantischer-gorilla-in-frankfurt-preview.webp",
    pubDate: "2023-05-05T00:00:00.000Z",
  },
  {
    title: "Forscher entdecken antikes Sternentor in Deutschland",
    img: "sternentor-in-deutschland-entdeckt-preview.webp",
    pubDate: "2023-04-20T00:00:00.000Z",
  },
  {
    title: "Männliches Einhorn im magischen Wald entdeckt",
    img: "goldenes-einhorn-preview.webp",
    pubDate: "2023-03-13T00:00:00.000Z",
  },
  {
    title: "Gitarre spielende Fische entdeckt",
    img: "fische-spielen-gitarre-preview.webp",
    pubDate: "2023-02-11T00:00:00.000Z",
  },
  {
    title: "Gedankenlesendes Bakterium entdeckt",
    img: "gruenes-bakterium-blaue-fluessingkeit-preview.webp",
    pubDate: "2023-02-08T00:00:00.000Z",
  },
  {
    title: "Durchbruch im Bereich Fusion",
    img: "fusionskraftwerk-auf-dem-mars-preview.webp",
    pubDate: "2023-01-27T00:00:00.000Z",
  },
  {
    title: "Silvester 2022: Weltuntergang verhindert durch Clowns",
    img: "clowns-retten-die-welt-preview.webp",
    pubDate: "2023-01-01T00:00:00.000Z",
  },
  ,
  {
    title: "UFO landet auf Koppel",
    img: "ufos-mit-kuehen-auf-dem-feld-preview.webp",
    pubDate: "2022-12-31T00:00:00.000Z",
  },
];

export const get: APIRoute = ({ params, request }) => {
  return {
    body: JSON.stringify(blogPosts),
  };
};
