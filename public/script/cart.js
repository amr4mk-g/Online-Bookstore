const ele = document.getElementById("cartIncrement");
const loadURL = "http://localhost:3000/api/user/cart"
let booksCount = 0;

const getCartItems = async () => {
  let token = localStorage.getItem("user-token");
  if (!token) {
    alert("Unauthorized");
    return;
  }
  try {
    let response = await fetch(loadURL, 
      {method: "GET", headers: {"Content-Type": "application/json",
        "Authorization": "Bearer "+token}
    });
    if (!response.ok) {
      alert("Add to your cart failed");
      return;
    }
    let data = await response.json();
    let books = data["user cart"]
    let details = '';
    let total = 0;
    for (let book of books) {
      booksCount++;
      total += book.sellingPrice
      details += `<div class="col-lg-6 col-md-12">
        <div class="cartSection">
        <div class="row ItemImgAndName">
          <div class="col-md-4"><img class="imagesize" src=${book.imageURL}></div>
          <div class="col-md-8"><h4>${book.name}</h4></div>
        </div>
        <div class="row summaryPerProduct">
          <div class="col-md-4"><p>Price: ${book.sellingPrice} $</p></div>
        </div>
      </div> </div>`;
    }
    details += `<div class="totalSection"><h5>Total Price: ${total} $</h5></div>
      </div> <br> <div class="col-lg-6 col-md-12">
      <button class="btn btn-primary" onclick="checkOut()">Check Out</button>
    </div> </div>`
    ele.innerHTML = details;
  } catch(err){
    alert("An error occurred during load cart items");
  }
};

getCartItems();

function checkOut() {
  if (booksCount == 0) {
    alert("Cart is empty");
    return;
  }
  window.location.href = "checkoutPage.html";
}
