const postList = document.getElementById("postList");

function fetchPosts() {
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      renderPosts(data);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

function renderPosts(posts) {
  postList.innerHTML = "";
  posts.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong> name :${post.name} <br> </strong> course : ${post.course} <br> </strong> gender : ${post.gender} <br> </strong>mobail : ${post.mobail}
      <button onclick="updatePost(${post.id})">Edit</button>
      <button onclick="deletePost(${post.id})">Delete</button>`;
    postList.appendChild(li);
  });
}

function createPost() {
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const mobail = document.getElementById("mobail").value;
  const gender = document.getElementById("gender").value;

  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, course, gender, mobail}),
  })
    .then(() => {
      fetchPosts();
    })
    .catch((error) => {
      console.error("Error creating post:", error);
    });
}

function updatePost(id) {
  const name = prompt("Enter new name:");
  const course = prompt("Enter new course:");
  const gender = prompt("Enter new gender:");
  const mobail = prompt("Enter new mobail:");


  fetch(`http://localhost:3000/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, course, gender, mobail }),
  })
    .then(() => {
      fetchPosts();
    })
    .catch((error) => {
      console.error("Error updating post:", error);
    });
}

function deletePost(id) {
  fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      fetchPosts();
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
}

// Fetch and render posts on page load
fetchPosts();