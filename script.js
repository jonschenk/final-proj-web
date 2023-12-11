const apiUrl = 'http://web.cs.georgefox.edu:8080/';
console.log('script.js loaded');
let loggedin = false;


async function loadUserInfo() {
let token  = localStorage.getItem("token");
if (token) {
  //hide log in form, since they are in
  document.getElementById('login').style.display = 'none';
  //get current user
  let response = await fetch(apiUrl + 'users/me', {
    'headers': {
	   'Authorization': 'Bearer ' + token
	 }
  });
  let data = await response.json();
  console.log(data);
  //put the current user name with link to blog page
  document.getElementById('currentUser').innerHTML = `<a href="blog.html">User: ${data.username}</a>`;
  
} else {
  document.getElementById("content").innerHTML = "Not Logged In";
}
}

//log in form listener - gets the token from the api
document.getElementById("login").addEventListener("submit", (event) => {
  //prevent from reloading page, want to send on ajax
  event.preventDefault();
  //create the content to send, using encodeURIComponent
  var formBody = [
  'username='+encodeURIComponent(document.getElementById('username').value), 
  'password='+encodeURIComponent(document.getElementById('password').value)
  ];
  formBody = formBody.join("&");
  //send POST request
  fetch(apiUrl + 'token', {
    method: "POST",
    headers: {
	   "Content-Type": "application/x-www-form-urlencoded"
	 },
	 body: formBody
  }).then(response => {
    //check status of response, 200 means success
    if (response.status !== 200) {
	 	throw new Error('Error logging in');
	 }
    return response.json();}
  ).then(data => {
    //this is the parsed json response, save the token and display message
    console.log(data); 
	 document.getElementById("loginMessage").innerHTML = 'Logged In';
   loggedin = true;
	 localStorage.setItem("token", data.access_token);
	 loadUserInfo();
  })
  .catch(e => {
    //catch on fetch - catch a non-200 or any other error
    console.log(e);
    document.getElementById('loginMessage').innerHTML = e.message;
  });
});

//on log out - remove token and refresh page
document.getElementById('logout').addEventListener('click', () => {
localStorage.removeItem('token');
window.location.reload();
});

//on page load, load content
loadUserInfo();

