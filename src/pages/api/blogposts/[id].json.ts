import type { APIRoute } from "astro";

const blogPosts = [
  {
    title:
      "Mysteriöser Angriff in der Nähe von Tübingen: Junge Leute von nächtlichen Kreaturen heimgesucht",
    img: "mysterioese-fliegende-kreatur-preview.webp",
    alt: "Eine künstlerische Darstellung der Kreatur, basierend auf den Beschreibungen der Gruppe. Hintergrund: Eine nächtliche Szenerie mit einem Vollmond und Wolken, die den Himmel bedecken. Sterne funkeln durch die Wolkenlücken, und die Silhouette eines Waldes ist am Horizont zu sehen.",
    pubDate: "2023-09-25T00:00:00.000Z",
    url: "2023-09-25-mysterioeser-angriff-in-der-naehe-von-tuebingen",
  },

  {
    title: "Geister im Büro: Warum Ihr Drucker wirklich immer klemmt",
    img: "ein-geist-in-einem-office-preview.webp",
    alt: "Ein mysteriöses Ding, das wie eine Mischung aus einem Alien, einem Roboter und einem Kristall aussieht. Schwebend über dem Boden.",
    pubDate: "2023-09-24T00:00:00.000Z",
    url: "2023-09-24-geist-in-einem-office",
  },

  {
    title: "Alien, Roboter oder Kristallwesen? Was wurde in Bayern gesichtet?",
    img: "mysterioeses-ding-mischung-aus-alien-roboter-und-kristall-preview.webp",
    alt: "Ein mysteriöses Ding, das wie eine Mischung aus einem Alien, einem Roboter und einem Kristall aussieht. Schwebend über dem Boden.",
    pubDate: "2023-08-09T00:00:00.000Z",
    url: "2023-08-09-kristallwesen-in-bayern-gesichtet",
  },
  {
    title: "Gedankenlesendes Bakterium entdeckt - Teil 2",
    img: "gruenes-bakterium-blaue-fluessigkeit-preview.webp",
    alt: "Ein grünes Bakterium in einer blauen Flüssigkeit. Im Hintergrund ist eine Wissenschaftlerin zu sehen.",
    pubDate: "2023-08-01T00:00:00.000Z",
    url: "2023-08-01-gedankenlesendes-bakterium-entdeckt-teil-2",
  },

  {
    title: "UFO oder fortschrittlicher Satellit? Was ist hier zu sehen?",
    img: "zwei-wissenschaftler-untersuchen-teile-eines-ufos-auf-einem-schwarz-weiß-bild-preview.webp",
    alt: "Zwei Wissenschaftler untersuchen Teile eines Ufos. Schwarz Weiß Foto aus dem Jahr 1970",
    pubDate: "2023-07-21T00:00:00.000Z",
    url: "2023-07-21-foto-eines-ufos-in-einem-lagerhaus-1970",
  },

  {
    title: "Ufo-Alarm in Kuhlingen",
    img: "ufos-mit-kuehen-auf-dem-feld-01-preview.webp",
    alt: "Ufos mit Kühen auf einem Feld",
    pubDate: "2023-07-13T00:00:00.000Z",
    url: "2023-07-13-ufos-und-kuehe",
  },

  {
    title: "Ein grünes Rind mit Rockstar-Ambitionen",
    img: "gruenes-rind-mit-gitarre-preview.webp",
    alt: "Ein grünes Rind spielt auf der Weide auf einer Gitarre",
    pubDate: "2023-07-09T00:00:00.000Z",
    url: "2023-07-09-gruenes-rind-spielt-auf-gitarre",
  },

  {
    title: "Enthüllt: Die geheimnisvolle Blaupause",
    img: "geheimnisvolle-blaupause-mit-mensch-in-der-mitte-preview.webp",
    alt: "Eine Blaupause einer großen mysteriösen Maschine mit einem Menschen in der Mitte",
    pubDate: "2023-07-02T00:00:00.000Z",
    url: "2023-07-02-mysterioese-blaupause-einer-maschine",
  },

  {
    title: "Die NASA schickt ein riesiges Gehirn ins Weltall",
    img: "gehirn-auf-einer-rakete-im-weltall-preview.webp",
    alt: "Ein großes Gehirn auf dem Rücken einer Rakte im Weltall",
    pubDate: "2023-06-26T00:00:00.000Z",
    url: "2023-06-26-gehirn-auf-einer-rakete-im-weltall",
  },

  {
    title: "Großes Ameisenaufgebot vor dem Brandenburger Tor",
    img: "ameisen-protestieren-in-berlin-vor-dem-brandenburger-tor-preview.webp",
    alt: "Viele große Ameisen protestieren in Berlin vor dem Brandenburger Tor",
    pubDate: "2023-06-16T00:00:00.000Z",
    url: "2023-06-16-ameisen-protestieren-in-berlin-vor-dem-brandenburger-tor",
  },

  {
    title: "Fliegende Zombies: Die neue Bedrohung aus der Luft",
    img: "zombie-reitet-auf-hai-preview.webp",
    alt: "Ein Zombie reitet auf einem Hai",
    pubDate: "2023-06-12T00:00:00.000Z",
    url: "2023-06-12-fliegende-zombies",
  },

  {
    title: "Elektroautos besonders beliebt bei UFO-Entführungen",
    img: "elektroauto-wird-von-ufo-entfuehrt-preview.webp",
    alt: "Ein rotes Elektroauto wird gerade von einem Ufo entführt",
    pubDate: "2023-06-05T00:00:00.000Z",
    url: "2023-06-05-elektroautos-beliebt-bei-aliens",
  },

  {
    title:
      "Valdar der Reptiloid: Ein ungewöhnlicher Urlaub am legendären Strand von Kreta",
    img: "reptiloide-mit-strohhut-preview.webp",
    alt: "Ein Reptiloide mit einem Strohut am Strand",
    pubDate: "2023-05-18T00:00:00.000Z",
    url: "2023-05-18-reptiloide-valdar-auf-kreta",
  },

  {
    title: "Gigantischer Gorilla in Frankfurt gesichtet",
    img: "gigantischer-gorilla-in-frankfurt-preview.webp",
    alt: "Gigantischer Gorilla auf einem Dach eines Hochhauses in Frankfurt",
    pubDate: "2023-05-05T00:00:00.000Z",
    url: "2023-05-05-gorilla-in-frankfurt-am-rhein",
  },

  {
    title: "Forscher entdecken antikes Sternentor in Deutschland",
    img: "sternentor-in-deutschland-entdeckt-preview.webp",
    alt: "Ein großes steinernes rundes Sternentor mit zwei Archäologen",
    pubDate: "2023-04-20T00:00:00.000Z",
    url: "2023-04-20-sternentor-in-deutschland-entdeckt",
  },

  {
    title: "Männliches Einhorn im magischen Wald entdeckt",
    img: "goldenes-einhorn-preview.webp",
    alt: "Ein goldenes Einhorn mit blauem Haar",
    pubDate: "2023-03-13T00:00:00.000Z",
    url: "2023-03-13-einhorn-im-harz-entdeckt",
  },

  {
    title: "Gitarre spielende Fische entdeckt",
    img: "fische-spielen-gitarre-preview.webp",
    alt: "Zwei Fische spielen Gitarre",
    pubDate: "2023-02-11T00:00:00.000Z",
    url: "2023-02-11-fische-spielen-gitarre",
  },

  {
    title: "Gedankenlesendes Bakterium entdeckt",
    img: "gruenes-bakterium-blaue-fluessigkeit-preview.webp",
    alt: "Ein grünes Bakterium in einer blauen Flüssigkeit. Im Hintergrund ist eine Wissenschaftlerin zu sehen.",
    pubDate: "2023-02-08T00:00:00.000Z",
    url: "2023-02-08-gedankenlesendes-bakterium-entdeckt",
  },

  {
    title: "Durchbruch im Bereich Fusion",
    img: "fusionskraftwerk-auf-dem-mars-preview.webp",
    alt: "Ein modernes Funsionskraftwerk auf dem Mars",
    pubDate: "2023-01-27T00:00:00.000Z",
    url: "2023-01-27-fusionsreaktor",
  },

  {
    title: "Silvester 2022: Weltuntergang verhindert durch Clowns",
    img: "clowns-retten-die-welt-preview.webp",
    alt: "Zwei Clowns stehen um die Erdkugel herum",
    pubDate: "2023-01-01T00:00:00.000Z",
    url: "2023-01-01-weltuntergang-verhindert-durch-clowns",
  },

  {
    title: "UFO landet auf Koppel",
    img: "ufos-mit-kuehen-auf-dem-feld-preview.webp",
    alt: "Eine Kuh schaut lustig in die Kamera. Im Hintergrund sind UFOs zu sehen.",
    pubDate: "2022-12-31T00:00:00.000Z",
    url: "2022-12-31-ufos-auf-dem-feld",
  },
];
interface Parameter {
  params: { id: number };
}
export const get: APIRoute = ({ params, request }) => {
  const id = params.id as string;
  return {
    body: JSON.stringify(blogPosts[id]),
  };
};

export function getStaticPaths() {
  const ids: Parameter[] = [];
  for (let index = 0; index < blogPosts.length; index++) {
    ids.push({
      params: {
        id: index,
      },
    });
  }
  return ids;
}
