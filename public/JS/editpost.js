const post_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];

// Update the post
const updatePostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-update-post").value.trim();
  const text = document.querySelector("#text-update-post").value.trim();

  if (title && text) {
    const response = await fetch(`/api/post/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard"); 
    } else {
      alert("Failed to update a post."); 
    }
  }
};


const deletePostFormHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/post/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard"); 
  } else {
    alert("Failed to delete a post."); 
  }
};


const updatePostButton = document.querySelector("#update-post");

if (updatePostButton) {
  updatePostButton.addEventListener("click", updatePostFormHandler);
}

const deletePostButton = document.querySelector("#delete-post");

if (deletePostButton) {
  deletePostButton.addEventListener("click", deletePostFormHandler);
}