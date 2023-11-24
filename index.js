// const cart = document.getElementById("");
const cartItems = document.getElementById("cartItem");
const addToCartBtn = document.getElementById("addToCart")
let cart = [];
addToCartBtn.addEventListener("click",()=>{
  const grandParent = addToCartBtn.parentElement.parentElement
  const title = grandParent.querySelector("h1").textContent
  const price = grandParent.querySelector("p").textContent
 


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
