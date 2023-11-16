import type { APIRoute } from "astro";

const blogposts = [
  {
    title:
      "Mysteriöser Angriff in der Nähe von Tübingen: Junge Leute von nächtlichen Kreaturen heimgesucht",
    img: "/images/blog/mysterioese-fliegende-kreatur.webp",
    alt: "Eine künstlerische Darstellung der Kreatur, basierend auf den Beschreibungen der Gruppe. Hintergrund: Eine nächtliche Szenerie mit einem Vollmond und Wolken, die den Himmel bedecken. Sterne funkeln durch die Wolkenlücken, und die Silhouette eines Waldes ist am Horizont zu sehen.",
    pubDate: "2023-09-25T00:00:00.000Z",
    url: "2023-09-25-mysterioeser-angriff-in-der-naehe-von-tuebingen",
  },

  {
    title: "Geister im Büro: Warum Ihr Drucker wirklich immer klemmt",
    img: "/images/blog/ein-geist-in-einem-office.webp",
    alt: "Ein mysteriöses Ding, das wie eine Mischung aus einem Alien, einem Roboter und einem Kristall aussieht. Schwebend über dem Boden.",
    pubDate: "2023-09-24T00:00:00.000Z",
    url: "2023-09-24-geist-in-einem-office",
  },

  {
    title: "Alien, Roboter oder Kristallwesen? Was wurde in Bayern gesichtet?",
    img: "/images/blog/mysterioeses-ding-mischung-aus-alien-roboter-und-kristall.webp",
    alt: "Ein mysteriöses Ding, das wie eine Mischung aus einem Alien, einem Roboter und einem Kristall aussieht. Schwebend über dem Boden.",
    pubDate: "2023-08-09T00:00:00.000Z",
    url: "2023-08-09-kristallwesen-in-bayern-gesichtet",
  },

  {
    title: "Gedankenlesendes Bakterium entdeckt - Teil 2",
    img: "/images/blog/gruenes-bakterium-blaue-fluessigkeit.webp",
    alt: "Ein grünes Bakterium in einer blauen Flüssigkeit. Im Hintergrund ist eine Wissenschaftlerin zu sehen.",
    pubDate: "2023-08-01T00:00:00.000Z",
    url: "2023-08-01-gedankenlesendes-bakterium-entdeckt-teil-2",
  },

  {
    title: "UFO oder fortschrittlicher Satellit? Was ist hier zu sehen?",
    img: "/images/blog/zwei-wissenschaftler-untersuchen-teile-eines-ufos-auf-einem-schwarz-weiß-bild.webp",
    alt: "Zwei Wissenschaftler untersuchen Teile eines Ufos. Schwarz Weiß Foto aus dem Jahr 1970",
    pubDate: "2023-07-21T00:00:00.000Z",
    url: "2023-07-21-foto-eines-ufos-in-einem-lagerhaus-1970",
  },

  {
    title: "UFO-Alarm in Kuhlingen",
    img: "/images/blog/ufos-mit-kuehen-auf-dem-feld-01.webp",
    alt: "UFOs mit Kühen auf einem Feld",
    pubDate: "2023-07-13T00:00:00.000Z",
    url: "2023-07-13-ufos-und-kuehe",
  },

  {
    title: "Ein grünes Rind mit Rockstar-Ambitionen",
    img: "/images/blog/gruenes-rind-mit-gitarre.webp",
    alt: "Ein grünes Rind spielt auf der Weide auf einer Gitarre",
    pubDate: "2023-07-09T00:00:00.000Z",
    url: "2023-07-09-gruenes-rind-spielt-auf-gitarre",
  },

  {
    title: "Enthüllt: Die geheimnisvolle Blaupause",
    img: "/images/blog/geheimnisvolle-blaupause-mit-mensch-in-der-mitte.webp",
    alt: "Eine Blaupause einer großen mysteriösen Maschine mit einem Menschen in der Mitte",
    pubDate: "2023-07-02T00:00:00.000Z",
    url: "2023-07-02-mysterioese-blaupause-einer-maschine",
  },

  {
    title: "Die NASA schickt ein riesiges Gehirn ins Weltall",
    img: "/images/blog/gehirn-auf-einer-rakete-im-weltall.webp",
    alt: "Ein großes Gehirn auf dem Rücken einer Rakte im Weltall",
    pubDate: "2023-06-26T00:00:00.000Z",
    url: "2023-06-26-gehirn-auf-einer-rakete-im-weltall",
  },

  {
    title: "Großes Ameisenaufgebot vor dem Brandenburger Tor",
    img: "/images/blog/ameisen-protestieren-in-berlin-vor-dem-brandenburger-tor.webp",
    alt: "Viele große Ameisen protestieren in Berlin vor dem Brandenburger Tor",
    pubDate: "2023-06-16T00:00:00.000Z",
    url: "2023-06-16-ameisen-protestieren-in-berlin-vor-dem-brandenburger-tor",
  },

  {
    title: "Fliegende Zombies: Die neue Bedrohung aus der Luft",
    img: "/images/blog/zombie-reitet-auf-hai.webp",
    alt: "Ein Zombie reitet auf einem Hai",
    pubDate: "2023-06-12T00:00:00.000Z",
    url: "2023-06-12-fliegende-zombies",
  },

  {
    title: "Elektroautos besonders beliebt bei UFO-Entführungen",
    img: "/images/blog/elektroauto-wird-von-ufo-entfuehrt.webp",
    alt: "Ein rotes Elektroauto wird gerade von einem UFO entführt",
    pubDate: "2023-06-05T00:00:00.000Z",
    url: "2023-06-05-elektroautos-beliebt-bei-aliens",
  },

  {
    title:
      "Valdar der Reptiloid: Ein ungewöhnlicher Urlaub am legendären Strand von Kreta",
    img: "/images/blog/reptiloide-mit-strohhut.webp",
    alt: "Ein Reptiloide mit einem Strohut am Strand",
    pubDate: "2023-05-18T00:00:00.000Z",
    url: "2023-05-18-reptiloide-valdar-auf-kreta",
  },

  {
    title: "Gigantischer Gorilla in Frankfurt gesichtet",
    img: "/images/blog/gigantischer-gorilla-in-frankfurt.webp",
    alt: "Gigantischer Gorilla auf einem Dach eines Hochhauses in Frankfurt",
    pubDate: "2023-05-05T00:00:00.000Z",
    url: "2023-05-05-gorilla-in-frankfurt-am-rhein",
  },

  {
    title: "Männliches Einhorn im magischen Wald entdeckt",
    img: "/images/blog/goldenes-einhorn.webp",
    alt: "Ein goldenes Einhorn mit blauem Haar",
    pubDate: "2023-03-13T00:00:00.000Z",
    url: "2023-03-13-einhorn-im-harz-entdeckt",
  },

  {
    title: "Forscher entdecken antikes Sternentor in Deutschland",
    img: "/images/blog/sternentor-in-deutschland-entdeckt.webp",
    alt: "Ein großes steinernes rundes Sternentor mit zwei Archäologen",
    pubDate: "2023-02-17T00:00:00.000Z",
    url: "2023-02-17-sternentor-in-deutschland-entdeckt",
  },

  {
    title: "Gitarre spielende Fische entdeckt",
    img: "/images/blog/fische-spielen-gitarre.webp",
    alt: "Zwei Fische spielen Gitarre",
    pubDate: "2023-02-11T00:00:00.000Z",
    url: "2023-02-11-fische-spielen-gitarre",
  },

  {
    title: "Gedankenlesendes Bakterium entdeckt",
    img: "/images/blog/gruenes-bakterium-blaue-fluessigkeit.webp",
    alt: "Ein grünes Bakterium in einer blauen Flüssigkeit. Im Hintergrund ist eine Wissenschaftlerin zu sehen.",
    pubDate: "2023-02-08T00:00:00.000Z",
    url: "2023-02-08-gedankenlesendes-bakterium-entdeckt",
  },

  {
    title: "Durchbruch im Bereich Fusion",
    img: "/images/blog/fusionskraftwerk-auf-dem-mars.webp",
    alt: "Ein modernes Funsionskraftwerk auf dem Mars",
    pubDate: "2023-01-27T00:00:00.000Z",
    url: "2023-01-27-fusionsreaktor",
  },

  {
    title: "Silvester 2022: Weltuntergang verhindert durch Clowns",
    img: "/images/blog/clowns-retten-die-welt.webp",
    alt: "Zwei Clowns stehen um die Erdkugel herum",
    pubDate: "2023-01-01T00:00:00.000Z",
    url: "2023-01-01-weltuntergang-verhindert-durch-clowns",
  },

  {
    title: "Spektakuläre Entdeckung auf der Farm - UFO landet auf Koppel",
    img: "/images/blog/ufos-mit-kuehen-auf-dem-feld.webp",
    alt: "Eine Kuh schaut lustig in die Kamera. Im Hintergrund sind UFOs zu sehen.",
    pubDate: "2022-12-31T00:00:00.000Z",
    url: "2022-12-31-ufos-auf-dem-feld",
  },
];

interface Parameter {
  params: { id: number };
}
export const GET: APIRoute = ({ params, request }) => {
  const id = params.id as string;
  return new Response(JSON.stringify(blogposts[Number(id)]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export function getStaticPaths() {
  const ids: Parameter[] = [];
  for (let index = 0; index < blogposts.length; index++) {
    ids.push({
      params: {
        id: index,
      },
    });
  }
  return ids;
}
