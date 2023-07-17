interface BlogPost {
  title: string;
  img: string;
  alt: string;
  pubDate: string;
  url: string;
}
const getRandomBlogPosts = async (counter: number) => {
  // 16 - 4 - counter = start
  // 0 - 4 Reserviert
  // 5 - max Erlaubt
  // Aktuell Max 16
  const currentBlogPostCounter = 15;
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
  const image = document.createElement("img");
  image.classList.add("latest-post-list-item-img");
  image.setAttribute("src", "images/blog/" + blogPost.img);
  image.setAttribute("alt", blogPost.alt);
  const imageDivContainer = document.createElement("div");
  imageDivContainer.append(image);
  imageDivContainer.classList.add("s4", "m12", "l4");
  const title = document.createElement("span");
  title.innerText = blogPost.title;
  const time = document.createElement("time") as HTMLTimeElement;
  const pubDate = new Date(blogPost.pubDate);
  time.dateTime = pubDate.toISOString();
  time.innerHTML = pubDate.toLocaleDateString("de-de", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeDiv = document.createElement("div");
  timeDiv.classList.add("latest-post-list-item-date");
  timeDiv.append(time);
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("latest-post-list-item-content");
  titleDiv.append(timeDiv, title);
  const titleDivContainer = document.createElement("div");
  titleDivContainer.classList.add("s8", "m12", "l8");
  titleDivContainer.append(titleDiv);

  const randomBlogPostDivContainer = document.createElement("div");
  randomBlogPostDivContainer.classList.add("flex", "latest-post-list-item");
  randomBlogPostDivContainer.append(imageDivContainer, titleDivContainer);
  const anchorBlogPostContainer = document.createElement("a");
  anchorBlogPostContainer.append(randomBlogPostDivContainer);
  anchorBlogPostContainer.setAttribute("href", "blog/" + blogPost.url);

  return anchorBlogPostContainer;
};

const getRandomBlogPostsInHtml = async (counter: number) => {
  const randomBlogPosts = await getRandomBlogPosts(counter);

  return getRandomBlogPostHtml(randomBlogPosts[0]);
};

export { getRandomBlogPosts, getRandomBlogPostsInHtml };
