const videoContainer = document.getElementById('videoContainer');
const form = document.getElementById('commentForm');

const handleDeleteComment = async (event) => {
    const commentId = event.target.parentNode.dataset.id;
    const response = await fetch(`/api/comments/${commentId}/delete`, {
        method: 'DELETE'
    });
    if(response.status === 200) {
        event.target.parentNode.remove();
    }
};

const getComment = () => {
    const comments = document.querySelectorAll('.video__comment');
    if(comments.length !== 0){
        comments.forEach(comment => {
            const btnDelete = comment.querySelector('.btn-delete');
            btnDelete.addEventListener('click', handleDeleteComment);
        });
    }
};

getComment();

const addComment = (text, id) => {
    const videoComments = document.querySelector('.video__comments ul');
    const newComment = document.createElement('li');
    newComment.dataset.id = id;
    newComment.className = 'video__comment';
    const icon = document.createElement('i');
    icon.className = 'fas fa-comment';
    const span = document.createElement('span');
    span.innerText = ` ${text}`;
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-delete';
    deleteBtn.innerText = '❌';
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(deleteBtn);
    videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector('textarea');
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if(text === ''){
        return
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text }),
    });
    if(response.status === 201){
        textarea.value = '';
        const { newCommentId } = await response.json();;
        addComment(text, newCommentId);
        getComment();
    }
};

if(form) {
    form.addEventListener('submit', handleSubmit);
}