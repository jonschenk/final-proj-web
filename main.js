let url = "https://jsonplaceholder.typicode.com/photos"

fetch(url).then((res) => {
    return res.json();
}).then((data) => {
    let parentElement = document.getElementById('posts');

    data.slice(0, 10).forEach(photo => {
        let imgElement = document.createElement('img');
        imgElement.src = photo.url;
        parentElement.appendChild(imgElement);
    });
});