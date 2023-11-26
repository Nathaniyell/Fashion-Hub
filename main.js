const cartItems = document.getElementById("cartItem");
const addToCartBtn = document.querySelectorAll("#addToCart");
const cartCount = document.getElementById("count");
const cartTotal = document.getElementById("total");
const cartIcon = document.querySelector(".nav__Cart");
const StoredItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Ensure StoredItems is initialized as an array
let cart = StoredItems; // Initialize cart with stored items

cartIcon.addEventListener("click", () => {
  cartItems.parentElement.classList.toggle("show-cart");
});

addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.parentElement;
    const title = parent.parentElement.querySelector("h1").textContent;
    const price = parent.querySelector("#clothPrice").textContent;
    cart.push({ price, title });
    localStorage.setItem("cartItems", JSON.stringify(cart));
    console.log(cart);
    console.log("Your Item has been added to cart");

    // Display the updated cart immediately after adding an item
    displayCart();
  });
});

function deleteItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  cartCount.innerHTML = cart.length;
  if (cart.length === 0) {
    cartItems.innerHTML = "Your cart is empty";
    cartTotal.innerHTML = "N " + 0 + " .00";
  } else {
    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        let { title, price } = item;
        total += parseFloat(price);
        cartTotal.innerHTML = "N " + total.toFixed(2);
        return `
          <div class="d-flex w-100 justify-content-between align-items-center bg-white p-2 my-2 rounded">
            <h4 class="fs-6 text-center">${title}</h4>
            <h4 class="fs-6 text-center">N${price}</h4>
            <button type="button" class="d-flex align-items-center justify-content-between border-0 btn btn-sm btn-danger" onclick="deleteItem(${index})"><i class="fa-solid fa-trash"></i></button>
          </div>`;
      })
      .join('');
  }
}
