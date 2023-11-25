const cartItems = document.getElementById("cartItem");
const addToCartBtn = document.querySelectorAll("#addToCart");
const cartCount = document.getElementById("count")
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

// splice: This method modifies the original array by adding or removing elements. It's useful when you want to modify the existing array in place. The `splice` method changes the contents of an array by removing or replacing existing elements and/or adding new elements.
  function deleteItem(index) {
    cart.splice(index, 1);
    displayCart();
  }

// filter: This method creates a new array by filtering out elements that don't satisfy a specified condition. It doesn't modify the original array but produces a new array with the desired elements. This can be useful if you want to keep the original array unchanged or if you need to create a new array for some other purpose.


  // function deleteItem(index) {
  //   cart = cart.filter((item, i) => i !== index);
  //   displayCart();
  // }

// If you prefer to keep the original array unchanged and create a new array with the desired elements, `filter` is a good choice. If you want to modify the original array in place, then `splice` might be more appropriate. Consider the specific requirements and behavior you need in your application.


function displayCart() {
  cartCount.innerHTML=cart.length
  if (cart.length === 0) {
    // If the cart is empty, display a message
    cartItems.innerHTML = "Your cart is empty";
  } else {
    // If there are items in the cart, display each item
    cartItems.innerHTML = cart.map((item, index) => {
      return (
        `<div class="d-flex w-100 justify-content-between align-items-center">
          <h4 class="fs-5">${item.title}</h4>
          <p class="fs-5">${item.price}</p>
          <button type="button" onclick="deleteItem(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>`
      );
    }).join(''); // Use join('') to convert the array of strings to a single string
  }
}
