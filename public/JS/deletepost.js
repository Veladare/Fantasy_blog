const deletePost = async post_id => {
    const response = await fetch(`/api/post/${post_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) document.location.reload();
    else alert("Failed to delete the post.");
  };
  
  document.addEventListener("click", event => {
    if (event.target.classList.contains("delete-post")) {
      const post_id = event.target.getAttribute("data-post-id");
      deletePost(post_id);
    }
  });