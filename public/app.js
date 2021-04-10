// mobile menu (nav bar hamburger menu)
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector(".navbar-menu");
// Create A New Log Button on Index Page
const newLogButton = document.querySelector("#create-button");
const editButton = document.querySelector("#edit-button");

burgerIcon.addEventListener("click", () => {
  console.log(burgerIcon);
  navbarMenu.classList.toggle("is-active");
});

newLogButton.addEventListener("mouseover", () => {
  console.log(newLogButton);
  newLogButton.classList.toggle("is-warning");
});

newLogButton.addEventListener("mouseout", () => {
  console.log(newLogButton);
  newLogButton.classList.toggle("is-warning");
});


editButton.addEventListener("mouseover", () => {
  console.log(newLogButton);
  editButton.classList.toggle("is-warning");
});

editButton.addEventListener("mouseout", () => {
  console.log(newLogButton);
  editButton.classList.toggle("is-warning");
});
