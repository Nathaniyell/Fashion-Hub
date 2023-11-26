const cartItems = document.getElementById("cartItem");
const addToCartBtn = document.querySelectorAll("#addToCart");
const cartCountElement = document.getElementById("count");
const cartTotal = document.getElementById("total");
const cartIcon = document.querySelector(".nav__Cart");
const StoredItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Ensure StoredItems is initialized as an array

let cart = StoredItems; // Initialize cart with stored items
let cartCount = StoredItems.length

cartIcon.addEventListener("click", () => {
  cartItems.parentElement.classList.toggle("show-cart");
});

addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.parentElement;
    const title = parent.parentElement.querySelector("h1").textContent;
    const price = parseFloat(parent.querySelector("#clothPrice").textContent); // Convert price to a floating-point number

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex((item) => item.title === title);

    if (existingItemIndex !== -1) {
      // If the item exists, update the quantity and total price
      cart[existingItemIndex].quantity += 1;
      cart[existingItemIndex].totalPrice = cart[existingItemIndex].quantity * price;
    } else {
      // If the item doesn't exist, add it to the cart
      cart.push({ title, price, quantity: 1, totalPrice: price });
    }

    cartCount += 1;
    localStorage.setItem("cartCount", cartCount.toString());

    localStorage.setItem("cartItems", JSON.stringify(cart));
    console.log(cart);
    console.log("Your Item has been added to cart");

    displayCart();
  });
});

function deleteItem(index) {
  const item = cart[index];

  if (item.quantity > 1) {
    // If quantity is more than 1, decrease the quantity by 1
    item.quantity -= 1;
    item.totalPrice = item.quantity * item.price; // Recalculate total price
  } else {
    // If quantity is 1, remove the item completely from the cart
    cart.splice(index, 1);
  }

  // Decrease cartCount when deleting an item
  cartCount -= 1;
  localStorage.setItem("cartCount", cartCount.toString());

  localStorage.setItem("cartItems", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  cartCountElement.innerHTML = cartCount;

  if (cart.length === 0) {
    cartItems.innerHTML = "Your cart is empty";
    cartTotal.innerHTML = "N " + 0 + " .00";
  } else {
    let total = cart.reduce((acc, item) => {
      acc += item.totalPrice;
      return acc;
    }, 0);

    cartItems.innerHTML = cart
      .map((item, index) => {
        let { title, quantity } = item;
        return `
          <div class="d-flex w-100 justify-content-between align-items-center bg-white p-2 my-2 rounded">
            <h4 class="fs-6 text-center">${title}</h4>
            <h4 class="fs-6 text-center">${quantity}</h4>
            <button type="button" class="d-flex align-items-center justify-content-between border-0 btn btn-sm btn-danger" onclick="deleteItem(${index})"><i class="fa-solid fa-trash"></i></button>
          </div>`;
      })
      .join('');
    cartTotal.innerHTML = `N ${total.toFixed(2)} .00`;
  }
}
