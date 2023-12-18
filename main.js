const cartItems = document.getElementById("cartItem");
const addToCartBtn = document.querySelectorAll("#addToCart");
const cartCountElement = document.getElementById("count");
const cartTotal = document.getElementById("total");
const cartIcon = document.querySelector(".nav__Cart");
let cart = JSON.parse(localStorage.getItem("cartItems")) || []; // Ensure cart is initialized from localStorage
let cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity dynamically

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
      cart[existingItemIndex].totalPrice =
        cart[existingItemIndex].quantity * price;
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
          </div>
                  `;
      })
      .join("");
    cartTotal.innerHTML = `N ${total.toFixed(2)}`;
  }
}
const footWearsContainer = document.getElementById("footwears");
const footWears = [];

async function fetchFootWears() {
  // const url = "https://shoes-collections.p.rapidapi.com/shoes/3";
  const url = "https://api.escuelajs.co/api/v1/categories/"
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "605ea90a1fmshad0b312f87476edp1e757cjsn075d201026ea",
  //     "X-RapidAPI-Host": "shoes-collections.p.rapidapi.com",
  //   },
  // };

  try {
    // const response = await fetch(url, options);
    const response = await fetch(url)
    const result = await response.json();
    console.log(result);
    footWears.push(result.shoes)
  } catch (error) {
    console.error(error);
  }

}
window.addEventListener("DOMContentLoaded", fetchFootWears) 
console.log(footWears)
footWearsContainer.innerHTML = footWears ? footWears.map((shoe) => {
  // const { name, price, image, description } = shoe;
  const { name, image} = shoe;

  return `
  <div class="col-md-6 mb-5 mx-3 border-bottom border-dark pb-3" style="width: 18rem;">
                  <img class="rounded img-fluid card-img-top" src=${image}  alt=${name}>
                  <div class="card-body">
                      <h1 class="fw-semibold fs-5 mt-3">${name}</h1>
                      <p class="card-text">${description}</p>
                      
                      <div class="card-body d-flex justify-content-between align-items-center w-100 mt-3">
                          <p class="fw-bold">N<span id="clothPrice">${price}</span></p>
                        
                          <button id="addToCart" class=" btn-sm btn border-primary rounded-circle border-opacity-50 text-primary"><i class="fa-solid fa-cart-shopping"></i></button>
  
                      </div>
                  </div>
  
  `;
}).join("") : `<div class="text-center fw-normal fs-5 my-5">Coming soon...</div>`

// Call displayCart to show the cart when the page loads
displayCart();
console.log("StoredItems on page load:", cart);
