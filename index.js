let currentPage = 1;
let totalPagesApi;

function getUsers(page) {
  let request = new XMLHttpRequest();
  request.addEventListener("load", render);
  request.addEventListener("error", errorResponse);
  request.open("GET", "https://reqres.in/api/users?page=" + page);
  request.send();
}

function render() {
  let response = this.responseText;
  let responseData = JSON.parse(response);

  let fragment = document.createDocumentFragment();

  responseData.data.forEach((item) => {
    let li = document.createElement("li");

    let pEmail = document.createElement("p");
    pEmail.textContent = item.email;

    let imgUser = document.createElement("img");
    imgUser.src = item.avatar;
    imgUser.classList.add("image-block");

    li.appendChild(imgUser);
    li.appendChild(pEmail);

    fragment.appendChild(li);
  });

  document.getElementById("ul-list").innerHTML = " ";
  document.getElementById("ul-list").appendChild(fragment);

  totalPagesApi = responseData.total_pages;
}

function errorResponse() {
  let p = document.createElement("p");
  p.textContent = "Server Error";

  document.getElementById("api-user-email").appendChild(p);
}

document.getElementById("loadprev").addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }
  currentPage -= 1;
  getUsers(currentPage);
});

document.getElementById("loadnext").addEventListener("click", function () {
  if (currentPage === totalPagesApi) {
    return;
  }
  currentPage += 1;
  getUsers(currentPage);
});

getUsers(currentPage);
