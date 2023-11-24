// const cart = document.getElementById("");
const cartItems = document.getElementById("cartItem");
const addToCartBtn = document.querySelectorAll("#addToCart")
let cart = [];
addToCartBtn.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const parent = btn.parentElement
    const title = parent.parentElement.querySelector("h1").textContent
    const price = parent.querySelector("#clothPrice").textContent
   cart.push({price, title})
  console.log(cart);
  })
})



function displayCart(){
  if (cart.length===0){
    cartItems.innerHTML ="Your cart is empty"
  }else{
  
    cartItems.innerHTML= cart.map(item=>{
      return(
        `<div class="d-flex w-100 justify-content-between align-items-center">
        <h4 class="fs-5">${item.title}</h4>
        <p class="fs-5">${item.price}</p>
        </div>
        `
      )
    })
    
  
  }
}

