import u from "https://esm.sh/umbrellajs";

interface BlogPost {
  title: string;
  img: string;
  alt: string;
  pubDate: string;
  url: string;
}
const getRandomBlogPosts = async (counter: number) => {
  // 18 - 4 - counter = start
  // 0 - 4 Reserviert
  // 5 - max Erlaubt
  // Aktuell Max 18
  const currentBlogPostCounter = 17;
  const notForRandom = 4;
  const start = currentBlogPostCounter - notForRandom - counter;
  const randomStart = Math.floor(Math.random() * start) + 4;

  const randomBlogPosts: BlogPost[] = [];
  for (let index = randomStart; index < counter + randomStart; index++) {
    const response = await fetch("./api/blogposts/" + index + ".json");
    const blogPost = (await response.json()) as BlogPost;
    randomBlogPosts.push(blogPost);
  }

  return randomBlogPosts;
};

const getRandomBlogPostHtml = async (blogPost: BlogPost) => {
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
              u("<image>")
                .addClass("latest-post-list-item-img")
                .attr("src", "images/blog/" + blogPost.img)
                .attr("alt", blogPost.alt)
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
  return result;
};

const getRandomBlogPostsInHtml = async (counter: number) => {
  const randomBlogPosts = await getRandomBlogPosts(counter);

  return getRandomBlogPostHtml(randomBlogPosts[0]);
};

export { getRandomBlogPosts, getRandomBlogPostsInHtml };
