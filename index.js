// const cart = document.getElementById("");
const price = document.getElementById("clothPrice");
const title = document.getElementById("clothTitle");
const cartItems = document.getElementsById("cartItem");
let cart = [];
function displayCart(a) {
  let i = 0;
  if (cart.length === 0) {
    cartItems.innerHTML = "Your Cart is empty";
  } else {
    cartItems.innerHTML = `<div></div>`;
  }
}
