const cartItems = document.getElementById("cartItem");
const addToCartBtn = document.querySelectorAll("#addToCart");
let cart = [];

addToCartBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;
    const title = parent.parentElement.querySelector("h1").textContent;
    const price = parent.querySelector("#clothPrice").textContent;
    cart.push({ price, title });
    console.log(cart);

    // Display the updated cart immediately after adding an item
    displayCart();
  });
});

function displayCart() {
  if (cart.length === 0) {
    // If the cart is empty, display a message
    cartItems.innerHTML = "Your cart is empty";
  } else {
    // If there are items in the cart, display each item
    cartItems.innerHTML = cart.map(item => {
      return (
        `<div class="d-flex w-100 justify-content-between align-items-center">
          <h4 class="fs-5">${item.title}</h4>
          <p class="fs-5">${item.price}</p>
          <button><i class="fa-solid fa-trash"></i></button>
        </div>`
      );
    }).join(''); // Use join('') to convert the array of strings to a single string
  }
}
