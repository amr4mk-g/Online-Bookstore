const ele = document.getElementById("detialsPage");
const loadURL = "http://localhost:3000/api/store/books/"
const addURL = "http://localhost:3000/api/user/cart/"
let bookID = ""

const viewBookDescription = async () => {
  try {
    let response = await fetch(loadURL+bookID, 
      {method: "GET", headers: {"Content-Type": "application/json"}
    });
    if (!response.ok) {
      alert("Load book data failed");
      return;
    }
    let data = await response.json();
    let details = `<div class="row">
      <div class="col-6"> <img style="width: 50%;" src="${data.imageURL}"> </div>
      <div class="col-6">
      <h2>${data.name}</h2>
      <h5>Price: ${data.sellingPrice} $</h5>
      <p>"${data.description}"</p>
      <button class="btn-outline-primary" onclick="addToCart()">Add To Cart</button>
      </div>`;
      ele.innerHTML = details;
  } catch(err){
    alert("An error occurred during load data");
  }
};

const addToCart = async () => {
  let token = localStorage.getItem("user-token");
  if (!token) {
    alert("Unauthorized");
    return;
  }
  try {
    let response = await fetch(addURL+bookID, 
      {method: "POST", headers: {"Content-Type": "application/json",
        "Authorization": "Bearer "+token}
    });
    console.log(response)
    if (!response.ok) {
      alert("Add to your cart failed");
      return;
    }
    let data = await response.json();
    alert("Book added to your cart");
  } catch(err){
    alert("An error occurred during add the book to your cart");
  }
};

let urlParams = new URLSearchParams(window.location.search);

bookID = urlParams.get("bookId");

if (!bookID) alert("Load this book failed");
else viewBookDescription();


/*

let urlParams = new URLSearchParams({bookId: "xxx"});
let redirectUrl = "bookDetailsPage.html?" + urlParams.toString();
window.location.href = redirectUrl;

*/