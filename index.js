// const cart = document.getElementById("");
const cartItems = document.getElementById("cartItem");
const addToCartBtn = document.getElementById("addToCart")
let cart = [];
addToCartBtn.addEventListener("click",()=>{
  const parent = addToCartBtn.parentElement
  const title = parent.parentElement.querySelector("h1").textContent
  const price = parent.querySelector("#clothPrice").textContent
 cart.push({...cart,price, title})
console.log(cart);

})
// function addToCart(){
//    cart.push()
//   displayCart()
// }

// function displayCart(a) {
//   let i = 0;
//   if (cart.length === 0) {
//     cartItems.innerHTML = "Your Cart is empty";
//   } else {
//     addToCartBtn.addEventListener("click",()=>{
//       i++
//     })
//     console.log(addToCartBtn.parentNode)
//     cartItems.innerHTML = `<div>
    
//     </div>`;
//   }
// }
