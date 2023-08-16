const newPostFormHandler = async event => {
    event.preventDefault();
  
    const title = document.querySelector('#title-new-post').value.trim();
    const text = document.querySelector('#content-new-post').value.trim();
  
    if (title && text) {
      try {
        const response = await fetch('/api/post', {
          method: 'POST',
          body: JSON.stringify({ title, text }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          const errorText = await response.text();
          alert('Failed to create a new post. Error: ' + errorText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while creating a post.');
      }
    }
  };
  
  document.addEventListener('submit', event => {
    if (event.target.matches('.new-post-form')) {
      newPostFormHandler(event);
    }
  });