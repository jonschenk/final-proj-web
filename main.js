const apiUrl = 'http://web.cs.georgefox.edu:8080/docs';

async function fetchData(method, path, body = null) {
    const url = `${apiUrl}${path}`;
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null
        });

        const data = await response.json();
        displayOutput(JSON.stringify(data, null, 2));

        if (path.includes('/{project}/posts/')) {
            displayPosts(data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

window.onload = function () {
    getPosts();
};

function displayOutput(output) {
    document.getElementById('output').innerHTML = `<pre>${output}</pre>`;
}

function getRoot() {
    fetchData('GET', '/');
}

function createUser() {
    fetchData('POST', '/users/', { /* provide necessary user data */ });
}

function getUsers() {
    fetchData('GET', '/users/');
}

function getUserMe() {
    fetchData('GET', '/users/me');
}

function createPost() {
    const project = document.getElementById('project').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetchData('POST', `/projects/${project}/posts/`, { title, content })
        .then(() => getPosts());  // Fetch and display all posts after creating a new one
}

function getPosts() {
    fetchData('GET', '/projects/{project}/posts/')
        .then(data => displayPosts(data))
        .catch(error => console.error('Error fetching posts:', error));
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}
