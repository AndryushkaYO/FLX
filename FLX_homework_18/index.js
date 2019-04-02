let list = document.getElementById('ul');
let users;

makeGETRequest('https://jsonplaceholder.typicode.com/users').then(usersList => {
        users = usersList;
        return usersList;
    }).then((usersList) =>
        fetch(`https://api.thecatapi.com/v1/images/search?limit=${usersList.length}&size=small&mime_types=gif`))
    .then(response => response.json())
    .then((catAvatars) => {
        printUsers(users, catAvatars.map(cat => cat.url));
    })
    .catch(error => console.log(error))


function printUsers(data, catAvatars) {
    for (let i in data) {
        list.innerHTML += ` <li>
            <div class="list-item" id="${data[i].id}">
                <div class="user-data">                
                <img src="${catAvatars[i]}" class="avatar" alt="cat avatar"> 
                <p class="name" onclick="showPosts(this)">${data[i].username}</p>
                </div>
                <div class="address-company">
                <div class="address">
                  <p> <b>Address :</b> </p>
                  <div>
                  <p>${data[i].address.city}</p>
                  <p>${data[i].address.street}</p>
                  <p>${data[i].address.suite}</p>
                  <p>${data[i].address.zipcode}</p>
                  </div>
                </div>
                <div class="company">
                  <p > <b>Company : </b> </p>
                  <div>
                  <p>${data[i].company.name}</p>
                  </div>
                </div>
                </div>
                <div class="buttons">
                  <div class="save-edit btn" onclick="editUser(this)"><a href="#">Save/Edit</a></div>
                  <div class="delete btn" onclick="deleteUser(this)"><a href="#">Delete</a></div>
                </div>
            </div>
        </li>`;
    }
}


function showPosts(event) {

  let postAuthorName = event;
  let postAuthorAvatar = event.parentNode.childNodes[1].getAttribute('src');
  let id = event.parentNode.parentNode.id;

  let postsArray;

  makeGETRequest(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then((posts) => {
      postsArray = posts;
      const postIds = posts.map(post => post.id);
      const commentsPromises = postIds.map(id => {
        return makeGETRequest(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
      });
      
      return Promise.all(commentsPromises);
    })
    .then((comments) => {
      const modalContext = document.getElementById('modal-context');
     /* const ul = document.createElement('ul');
      ul.setAttribute('class', 'posts-list');
      modalContent.appendChild(ul);*/
      let commentQuantity = 0;
for(var post in postsArray) {
       
        /*
        const li = document.createElement('li');
        li.setAttribute('class', 'post-item');
        ul.appendChild(li);
        const authorAvatar = document.createElement('img');
        li.appendChild(authorAvatar);
        authorAvatar.setAttribute('src', );
        authorAvatar.setAttribute('class', 'post-author-avatar');
        const postAuthor = document.createElement('p');
        postAuthor.setAttribute('class', 'post-author');
        li.appendChild(postAuthor);
        const postAuthorText = document.createTextNode(postAuthorName.textContent);
        postAuthor.appendChild(postAuthorText);

        const divPost = document.createElement('div');
        li.appendChild(divPost);
        const postHeader = document.createElement('h3');
        divPost.appendChild(postHeader);
        const postHeaderText = document.createTextNode(post.title);
        postHeader.appendChild(postHeaderText);
        const postBody = document.createElement('p');
        divPost.appendChild(postBody);
        const postBodyText = document.createTextNode(post.body);
        postBody.appendChild(postBodyText);

        const commentsList = document.createElement('ul');
        commentsList.setAttribute('class', 'comments-list');
        li.appendChild(commentsList);*/
        const commentsForPost = comments[index];

        commentQuantity += commentsForPost.length;
        if(post==10){
          break;
        }
  let write=`<ul>
        <li>
        <div class="user-post-data">
        <img src="${postAuthorAvatar}" alt="avatar" />
        <p>${modalContext.innerHTML}</p>
        </div>
        <div class="post-text">
        <h3>${postsArray[post].title}</h3>
        <p>${postsArray[post].body}</p>
        </div>
        <ul>`
        ;
        for(var comment  in commentsForPost){
          write+=`<li><div class="comment">
          <div class="user-comment">
          <img src="" alt="" />
          <p> ${commentsForPost[comment].email}</p>
          </div>
          <div class="comment-text">
          <p>${commentsForPost[comment].name}</p>
          <p>${commentsForPost[comment].body}</p>
          </div>
          </div></li>`;
          if(comment==5){
            break;
          }
          /*
          const commentItem = document.createElement('li');
          commentItem.setAttribute('class', 'comment-item');
          commentsList.appendChild(commentItem);

          const authorCommentAvatar = document.createElement('div');
          commentItem.appendChild(authorCommentAvatar);
          authorCommentAvatar.setAttribute('class', 'author-comment-avatar');
          const emailCommentAuthor = document.createElement('p');
          emailCommentAuthor.setAttribute('class', 'email-comment-author');
          commentItem.appendChild(emailCommentAuthor);
          const emailCommentAuthorText = document.createTextNode(comment.email);
          emailCommentAuthor.appendChild(emailCommentAuthorText);

          const divComment = document.createElement('div');
          commentItem.appendChild(divComment);
          divComment.setAttribute('class', 'comment');
          const commentHeader = document.createElement('h4');
          divComment.appendChild(commentHeader);
          const commentHeaderText = document.createTextNode(comment.name);
          commentHeader.appendChild(commentHeaderText);
          const commentBody = document.createElement('p');
          divComment.appendChild(commentBody);
          const commentBodyText = document.createTextNode(comment.body);
          commentBody.appendChild(commentBodyText);*/
          write+=`</ul></li>
        </ul>`;
        modalContext.innerHTML+=write;
        if(comment==10){
            break;
          }
        });
      });
      
      showModal();
      fetch(`https://api.thecatapi.com/v1/images/search?limit=${commentQuantity}&size=small&mime_types=jpg`)
        .then(response => response.json())
        .then(cats => showCatAvatars(cats.map(cat => cat.url), 'author-comment-avatar', 'comment-avatar-img'))
        .catch(error => console.log(error));
    });
}
function deleteUser(elem) {
    const id = elem.parentNode.parentNode.id;
    showCatLoader();
    makeDELETERequest(id).then(() => {

            elem.parentNode.parentNode.parentNode.remove();
        })
        .catch(() => {
            console.log('DELETE operation was unsuccessful!');
        })
}
function showModal(){
  document.getElementById('modal').style.display='block';
  
}
function closeModal(){
  document.getElementById('modal').style.display='none';
}

function editUser(elem) {
    alert(`Edit user  `);
}

function showCatLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideCatLoader() {
    document.getElementById('loader').style.display = 'none';
}

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        showCatLoader();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }
            if (this.readyState === 4 && this.status === 200) {
                hideCatLoader();
                try {
                    const response = JSON.parse(this.responseText);
                    resolve(response);
                } catch (e) {
                    console.log(e);
                }
            } else {
                hideCatLoader();
                reject(xhr.responseText);
                console.log(xhr.responseText);
            }
        };
    });
}

function makeDELETERequest(id) {
    return new Promise((resolve, reject) => {
        showCatLoader();
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `https://jsonplaceholder.typicode.com/users/${id}`, true);
        xhr.send(null);

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }
            if (this.readyState === 4 && this.status === 200) {
                hideCatLoader();
                try {
                    const response = JSON.parse(this.responseText);
                    resolve(response);
                } catch (e) {
                    console.log(e);
                }
            } else {
                hideCatLoader();
                reject(xhr.responseText);
                console.log(xhr.responseText);
            }
        };
    });
}