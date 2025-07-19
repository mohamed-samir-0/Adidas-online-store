let userinfo = document.querySelector("#user-info");
let userD = document.querySelector("#user");
let links = document.querySelector("#links");


if (localStorage.getItem("firstname")) {
  links.remove();
  userinfo.style.display = "flex";
  userD.innerHTML = "welcome " + localStorage.getItem("firstname");
}

let logout_btn = document.querySelector("#logout");
logout_btn.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
});