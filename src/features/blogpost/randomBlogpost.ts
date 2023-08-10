import { el, mount } from "https://esm.sh/redom";

import u from "https://esm.sh/umbrellajs";

const blogPostsCounter = 19;

interface BlogPost {
  title: string;
  img: string;
  alt: string;
  pubDate: string;
  url: string;
}
const getRandomBlogPosts = async (counter: number): Promise<BlogPost[]> => {
  // 18 - 4 - counter = start
  // 0 - 4 Reserviert
  // 5 - max Erlaubt
  // Aktuell Max 18
  const notForRandom = 4;
  const start = blogPostsCounter - notForRandom - counter;
  const randomStart = Math.floor(Math.random() * start) + 4;

  const randomBlogPosts: BlogPost[] = [];
  for (let index = randomStart; index < counter + randomStart; index++) {
    const response = await fetch("./api/blogposts/" + index + ".json");
    const blogPost = (await response.json()) as BlogPost;
    randomBlogPosts.push(blogPost);
  }

  return randomBlogPosts;
};

const setRandomBlogpostUmbrella = async (parentId: string) => {
  const blogPosts = await getRandomBlogPosts(1);
  const blogPost = blogPosts[0];

  const pubDate = new Date(blogPost.pubDate);
  const pubDateIso = pubDate.toISOString();
  const pubDateHtml = pubDate.toLocaleDateString("de-de", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const result = u("<a>")
    .attr("href", "blog/" + blogPost.url)
    .append(
      u("<div>")
        .addClass("flex", "latest-post-list-item")
        .append(
          u("<div>")
            .addClass("s4", "m12", "l4")
            .append(
              u("<img>")
                .addClass("latest-post-list-item-img")
                .attr({
                  src: "images/blog/" + blogPost.img,
                  alt: blogPost.alt,
                })
            )
        )
        .append(
          u("<div>")
            .addClass("s8", "m12", "l8")
            .append(
              u("<div>")
                .addClass("latest-post-list-item-content")
                .append(
                  u("<div>")
                    .addClass("latest-post-list-item-date")
                    .append(
                      u("<time>")
                        .addClass("latest-post-list-item-date")
                        .attr("dateTime", pubDateIso)
                        .html(pubDateHtml)
                    )
                )
                .append(u("<span>").text(blogPost.title))
            )
        )
    );
  u("#" + parentId).append(result);
};

const setRandomBlogpost = async (parentId: string) => {
  const blogPosts = await getRandomBlogPosts(1);
  const blogPost = blogPosts[0];

  const pubDate = new Date(blogPost.pubDate);
  const pubDateIso = pubDate.toISOString();
  const pubDateHtml = pubDate.toLocaleDateString("de-de", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const result = el(
    "a",
    { href: "blog/" + blogPost.url },
    el("div", { class: "flex latest-post-list-item" }, [
      el(
        "div",
        { class: "s4 m12 l4" },
        el("img", {
          class: "latest-post-list-item-img",
          src: "images/blog/" + blogPost.img,
          alt: blogPost.alt,
        })
      ),
      el(
        "div",
        { class: "s8 m12 l8" },
        el(
          "div",
          {
            class: "latest-post-list-item-content",
          },
          [
            el(
              "div",
              { class: "latest-post-list-item-date" },
              el(
                "time",
                { class: "latest-post-list-item-date", dateTime: pubDateIso },
                pubDateHtml
              )
            ),
            el("span", blogPost.title),
          ]
        )
      ),
    ])
  );

  const parent = document.querySelector("#" + parentId);
  if (parent) {
    mount(parent, result);
  }
};
export { setRandomBlogpost, setRandomBlogpostUmbrella };
