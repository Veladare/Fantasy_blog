const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const post_id = parseInt(window.location.pathname.split('/').pop());
  
    const comment_text = document.querySelector('#content').value.trim();
  
    if (comment_text) {
      try {
        const response = await fetch(`/api/comment`, {
          method: 'POST',
          body: JSON.stringify({ comment_text, post_id}),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.reload(); 
        } else {
          console.log('Response status:', response.status);
          console.log('Response text:', await response.text());
          alert('Failed to create a comment.'); 
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while creating a comment.');
      }
    }
  };
  
  
  const newCommentForm = document.querySelector('.comment-form');
  if (newCommentForm) {
    newCommentForm.addEventListener('submit', newCommentFormHandler);
  }