//////move to search page

document.getElementById("myButton").onclick = function () {
  location.href = "http://127.0.0.1:5500/search.html";
};
////////back to home page
function backButton() {
  window.history.back();
}
////// search for your book
function search_book() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.querySelectorAll(".products__card");
  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "list-item";
    }
  }
}


if (api.response.success) {
  // Redirect to success page
  window.location.assign("http://localhost:3000/api/store/books");
} else {
 console.log("error")
}