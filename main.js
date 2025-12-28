function show() {
  const nav = document.querySelector(".nav-list-mobile");

  nav.style.left = "50%";
}

function hide() {
  const nav = document.querySelector(".nav-list-mobile");

  nav.style.left = "-50%";
}

var cl = document.querySelector(".icl");

function showcl() {
  var cl = document.querySelector(".icl");
  cl.classList.add("icl-active");
}

function closecl() {
  var cl = document.querySelector(".icl");
  cl.classList.remove("icl-active");
}

var items = "";
var foodmenu = document.querySelector(".food-containor");

product.forEach((product) => {
  items += `
            <div class="food-item">
              <img src="${product.Image}"/>
              <h2>${product.name}</h2>
              <p>$${product.price}</p>
              <div class="cart-button">
                <a class="button btn1 additem" href="#" onclick="event.preventDefault(); addtocart(${product.id});">Add to Cart</a>
              </div>
            </div>
          </div>`;

  foodmenu.innerHTML = items;
});

var cartitemobj = [];
var itemId = [];

function addtocart(id) {
  if (itemId.includes(id)) {
    alert("Item Already Added In Cart");
  } else {
    itemId.push(id);
    itemToObject();
    printitemincart();
    bagitem();
    totalprice();
  }
}

function itemToObject() {
  cartitemobj = itemId.map((itemId) => {
    for (i = 0; i < product.length; i++) {
      if (itemId == product[i].id) {
        return product[i];
      }
    }
  });
}

var itemquantity = document.querySelector(".bag-item");
function bagitem() {
  itemquantity.innerHTML = cartitemobj.length;
}

var cartitems = document.querySelector(".cart-item");
var itemsincart = "";

function printitemincart() {
  itemsincart = "";
  if(cartitemobj.length>=1){
      cartitemobj.forEach((cartitem, index) => {
    itemsincart += `
            <div class="item flex">
                    <img src="${cartitem.Image}">
                    <div class="about-item">
                      <h4 class="item-name">${cartitem.name}</h4>
                      <h3 class="item-price">$${cartitem.price}</h3>
                    </div>

                    <div class="add-btn flex center">
                     <i onclick="decreaseqty(${index});"  class="fa-solid fa-minus"></i>
                     
                      <span class="qty">${cartitem.quantity}</span>
                      <i onclick="increaseqty(${index});" class="fa-solid fa-plus"></i>

                    </div>
             </div>`;
    cartitems.innerHTML = itemsincart;
  });
  }else{ 
    cartitems.innerHTML='';
    itemId = [];
    cartitemobj = [];
  }

}

var Totalprice = document.querySelector(".toal-price");
function totalprice() {
  var price = 0;
  cartitemobj.forEach((item) => {
    price += item.price * item.quantity;
  });

  Totalprice.innerHTML = price.toFixed(2);
}

var qty = document.querySelector(".qty");
var quantity = 1;
function increaseqty(index) {
  cartitemobj[index].quantity++;
  printitemincart();
  totalprice();
}

function decreaseqty(index) {
 
  if(cartitemobj[index].quantity > 1){
      cartitemobj[index].quantity--;
  }
  else{

      cartitemobj.splice(index, 1);
  }
   printitemincart();
   totalprice();
   bagitem();
}
