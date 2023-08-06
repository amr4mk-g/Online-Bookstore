let url = "http://localhost:3000/api/store/books";

const getBooks = async () => {
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      alert("Home page failed server Error");
      return;
    }
    let books = await response.json();

    let loadSection = "";
    loadSection += `<div class="home__container container grid">
      <div class="home__img-bg">
      <img src=${books[0].imageURL} alt="" class="home__img">
      </div>
      <div class="home__data">
      <h1 class="home__title">${books[0].name}<br> COLLECTIONS 2023</h1>
      <p class="home__description">${books[0].description}</p>
      <span class="home__price">${books[0].sellingPrice}</span>
      <button type="button" onclick="showBookDetails(this)" data-id="${books[0]._id}">Discover</button>
       </div> </div>`;
    document.getElementById("home").innerHTML = loadSection;

    let loadFeatured = "";
    for (let i = 1; i <= 3; i++) {
      loadFeatured += `<article class="featured__card">
        <span class="featured__tag">Sale</span>
        <img src=${books[i].imageURL} alt="" class="featured__img">
        <div class="featured__data">
            <h3 class="featured__title">${books[i].name}<br>${books[i].description}</h3>
            <span class="featured__price">${books[i].sellingPrice} $</span>
        </div>
        <button type="button" onclick="showBookDetails(this)" data-id="${books[0]._id}">Discover</button>
         </article>`;
    }
    document.getElementById("featuredBooks").innerHTML = loadFeatured;

    let booksPart = "";
    for (let i = 2; i < books.length; i++) {
      booksPart += `<article class="products__card">
        <img src=${books[i].imageURL} alt="" class="products__img">
        <h3 class="products__title">${books[i].category}<br>${books[i].name}</h3>
        <span class="products__price">${books[i].sellingPrice} $</span>
        <button type="button" onclick="showBookDetails(this)" data-id="${books[0]._id}">Discover</button>
         </article>`;
    }
    document.getElementById("bookSection").innerHTML = booksPart;

    let categories = [
      { name: "Fiction", imageURL: "https://picsum.photos/300" },
      { name: "Biography", imageURL: "https://picsum.photos/200" },
      { name: "Historical", imageURL: "https://picsum.photos/200" }
    ];
    let categoryPart = "";
    for (let i = 0; i < 3; i++) {
      categoryPart += `<article class="new__card swiper-slide">
        <span class="new__tag">Categories</span>
        <img src=${categories[i].imageURL} alt="" class="new__img">
        <div class="new__data">
            <h3 class="new__title">${categories[i].name}</h3>
        </div> </article>`;
    }
    document.getElementById("categorySection").innerHTML = categoryPart;
  } catch (err) {
    alert("An error occurred during load books.");
  }
};

getBooks();

function showBookDetails(item) {
  let urlParams = new URLSearchParams({ bookId: item.dataset.id });
  let redirectUrl = "bookDetailsPage.html?" + urlParams.toString();
  window.location.href = redirectUrl;
}
