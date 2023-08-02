const ele = document.getElementById("total-count");
const loadURL = "http://localhost:3000/api/user/cart"
const placeURL = "http://localhost:3000/api/user/order"
let booksCount = 0;

const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
const creditCardFields = document.getElementById('creditCardFields');
paymentMethodRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'creditCard') creditCardFields.style.display = 'block';
    else creditCardFields.style.display = 'none';
  });
});

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
      alert("Load checkout page failed");
      return;
    }
    let data = await response.json();
    let books = data["user cart"]
    let total = 0;
    let names = ""
    for (let book of books) {
      total += book.sellingPrice
      names += book.name + ", "
      booksCount++;
    }
    ele.innerHTML = `List of books:<br>${names}<br><br>Total Amount: ${total} $`
  } catch(err){
    alert("An error occurred during load cart items");
  }
};

getCartItems();

async function place() {
  if (booksCount == 0) {
    alert("Cart is empty");
    return;
  }
  let token = localStorage.getItem("user-token");
  if (!token) {
    alert("Unauthorized");
    return;
  }
  try {
    let response = await fetch(placeURL, 
      {method: "POST", headers: {"Content-Type": "application/json",
        "Authorization": "Bearer "+token}
    });
    if (!response.ok) {
      alert("Create new order failed");
      return;
    }
    let data = await response.json();
    alert(data.message);
  } catch(err){
    alert("An error occurred during create new order");
  }
}

