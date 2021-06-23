//URL valiables
const allPostURL = "https://jsonplaceholder.typicode.com/posts";
const searchURL = "https://jsonplaceholder.typicode.com/posts?q=";
//dom elements
const posts = document.getElementById("posts");
const filter = document.getElementById("filter1");

let limit = 3;
let page = 1;

//load initial 3 posts
document.addEventListener("DOMContentLoaded", getPosts);

async function getPosts() {
  let URLtofetch = `${allPostURL}?_limit=${limit}&_page=${page}`;
  try {
    const postslist = await fetch(URLtofetch);
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

//event listeners
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 3
  ) {
    page++;
    getPosts();
  }
});

async function searchPosts() {
  try {
    const srch = filter.value;

    if (srch != "") {
      posts.innerHTML = "";
      await getPosts(`${searchURL}${srch}`);
      filter.value = "";
    } else {
      posts.innerHTML = "";
      await getPosts();
    }
  } catch (error) {
    console.log(error);
  }
}
