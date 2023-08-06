const loadURL = "http://localhost:3000/api/store/search?name=";
const addURL = "http://localhost:3000/api/user/cart/";
let userValue;
const searchBook = async () => {
  try {
    saveSearchValue();

    var bookID = userValue;
    let response = await fetch(loadURL + bookID, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      console.log(loadURL + bookID);
      alert("Load book data failed");
      return;
    }
    let data = await response.json();

    let details = `<div class="row">
      <div class="col-6"> <img style="width: 50%;" src="${data[0].imageURL}"> </div>
      <div class="col-6">
      <h2>${data[0].name}</h2>
      <h5>Price: ${data[0].sellingPrice} $</h5>
      <p>"${data[0].description}"</p>
      </div>`;
    document.getElementById("ele").innerHTML = details;
    console.log(loadURL + bookID);
    // console.log("user search " + userValue);

    console.log(data);
  } catch (err) {
    console.log(loadURL + bookID);
    alert("An error occurred during load data");
  }
};

document.getElementById("ele");
document.getElementById("myButton").onclick = function () {
  // location.href = "http://127.0.0.1:5500/search.html";
  window.location.href = "search.html";
};
////////back to home page
function backButton() {
  // window.history.back();
  window.location.href = "index.html";
}
function saveSearchValue() {
  let userSearch = document.getElementById("searchbar");
  userValue = userSearch.value;
  console.log(userValue);
}
