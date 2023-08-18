const post_id = window.location.toString().split("/").pop();

const handleForm = async (event, method) => {
  event.preventDefault();

  const title = document.querySelector("#title-update-post").value.trim();
  const text = document.querySelector("#text-update-post").value.trim();

  if (title && text) {
    const response = await fetch(`/api/post/${post_id}`, {
      method,
      body: JSON.stringify({ title, text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard"); 
    } else {
      alert(`Failed to ${method === "PUT" ? "update" : "delete"} a post.`);
    }
  }
};

const updatePostButton = document.querySelector("#update-post");
const deletePostButton = document.querySelector("#delete-post");

if (updatePostButton) {
  updatePostButton.addEventListener("click", (event) => handleForm(event, "PUT"));
}

if (deletePostButton) {
  deletePostButton.addEventListener("click", (event) => handleForm(event, "DELETE"));
}