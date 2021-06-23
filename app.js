//URL valiables
const allPostURL = "https://jsonplaceholder.typicode.com/posts";
const searchURL = "https://jsonplaceholder.typicode.com/posts?q=";
//dom elements
const posts = document.getElementById("posts");
const filter = document.getElementById("filter1");
let limit = 3;
let page = 1;
let URLtofetch = `${allPostURL}?_limit=${limit}&_page=${page}`;

//load initial 3 posts
document.addEventListener("DOMContentLoaded", getPosts(URLtofetch));

async function getPosts(linkURL) {
  try {
    const postslist = await fetch(linkURL);
    const postsData = await postslist.json();
    postsData.forEach((elemnt) => {
      const div = document.createElement("div");
      div.className = "post d-flex row justify-content-center text-start my-5";
      div.innerHTML = `
      <div class="number">${elemnt.id}</div>
      <div class="post-info text-light my-3">
        <h2 class="post-title text-light">${elemnt.title}</h2>
        <p class="post-body">${elemnt.body}</p>
      </div>
      `;
      posts.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}
//search function
async function searchPosts(e) {
  try {
    const srch = filter.value;

    if (srch != "") {
      posts.innerHTML = "";
      await getPosts(`${searchURL}${srch}`);
    } else {
      posts.innerHTML = "";
      await getPosts(allPostURL);
    }
  } catch (error) {
    console.log(error);
  }
  e.preventDefault();
}

//event listeners
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 3
  ) {
    page++;
    getPosts(`${allPostURL}?_limit=${limit}&_page=${page}`);
  }
});
filter.addEventListener("input", searchPosts);
