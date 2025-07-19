let userinfo = document.querySelector("#user-info");
let userD = document.querySelector("#user");
let links = document.querySelector("#links");
let allproducts = document.querySelector("#allproducts");

if (localStorage.getItem("firstname")) {
  links.remove();
  userinfo.style.display = "flex";
  userD.innerHTML = "welcome " + localStorage.getItem("firstname");
}

let logout_btn = document.querySelector("#logout");
logout_btn.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
});

let product = [];
class Product {
  constructor(name, price, category, img, id) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.img = img;
    this.id = id;
    product.push(this);
  }
}

// المنتجات
new Product('T-shirt adidas', 80 , 'fashion', 'images/product1.jpg', 1);
new Product('earpods', 150 , 'Phone accessories ', 'images/product2.jpg', 2);
new Product('Jacket', 120 , 'fashion', 'images/product3.jpg', 3);
new Product('Adidas bottle', 50 , 'Sport', 'images/product4.jpg', 4);
new Product('Glasses', 80 , 'Men accessories', 'images/product5.jpg', 5);
new Product('Cap', 20 , 'Men accessories', 'images/product6.jpg', 6);
new Product('Bag adidas', 110 , 'Bags', 'images/product7.jpg', 7);
new Product('Shoes adidas', 80 , 'sport', 'images/product8.jpg', 8);
new Product('Bag', 100 , 'fashion', 'images/product9.png', 9);
new Product('Hoddie', 200 , 'fashion', 'images/hjoddie.avif', 10);
new Product('Football kit', 150 , 'sport', 'images/kit.avif', 11);
new Product('Footbal shoes', 300 , 'sport', 'images/footshoes.avif', 12);

// عناصر السلة
let cartproductdiv = document.querySelector(".carts_products div");
let badge = document.querySelector(".baddge");
let addedItem = JSON.parse(localStorage.getItem("productsIncart")) || [];

function draw() {
  allproducts.innerHTML = product.map((item) => {
    return `
      <div class="card col-lg-3 col-md-6 col-sm-12 mt-1 mb-1" style="width: 23rem;">
        <img src="${item.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <p>Product: ${item.name}</p>
          <p>Price: ${item.price} $</p>
          <p>Category: ${item.category}</p>
          <button class="btn btn-dark home-bttn" id="${item.id}" onclick="addToCart(${item.id}, event)">Add to cart</button>
          <button class="btn btn-danger home-bttn" id="${item.id}000" onclick="remove_from_cart(${item.id})" style="display:none;">Remove from cart</button>
        </div>
      </div>
    `;
  }).join('');

  addedItem.forEach((item) => {
    let addBtn = document.getElementById(item.id);
    let removeBtn = document.getElementById(item.id + '000');
    if (addBtn && removeBtn) {
      addBtn.style.display = "none";
      removeBtn.style.display = "inline-block";
    }
  });
}

draw();
drawCartItems();

function addToCart(id, event) {
  event.preventDefault(); // تمنع الانتقال لأعلى الصفحة
  let selected = product.find(p => p.id === id);
  let exist = addedItem.find(p => p.id === id);

  if (exist) {
    exist.count += 1;
  } else {
    let itemToAdd = { ...selected, count: 1 };
    addedItem.push(itemToAdd);
  }

  localStorage.setItem("productsIncart", JSON.stringify(addedItem));
  drawCartItems();

  document.getElementById(id).style.display = "none";
  document.getElementById(id + '000').style.display = "inline-block";
}

function remove_from_cart(id) {
  addedItem = addedItem.filter(item => item.id !== id);
  localStorage.setItem("productsIncart", JSON.stringify(addedItem));
  drawCartItems();

  document.getElementById(id).style.display = "inline-block";
  document.getElementById(id + '000').style.display = "none";
}

function drawCartItems() {
  cartproductdiv.innerHTML = "";

  addedItem.forEach((item) => {
    cartproductdiv.innerHTML += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <span>${item.name}</span>
        <div style="display:flex; gap:8px; align-items:center;">
          <a href="#" onclick="increaseCount(${item.id})"><i class="fas fa-plus text-success"></i></a>
          <span>${item.count}</span>
          <a href="#" onclick="decreaseCount(${item.id})"><i class="fas fa-minus text-danger"></i></a>
        </div>
      </div>
    `;
  });

  let totalCount = addedItem.reduce((acc, cur) => acc + cur.count, 0);
  badge.style.display = totalCount > 0 ? "block" : "none";
  badge.innerHTML = totalCount;
}

function increaseCount(id) {
  let item = addedItem.find(p => p.id === id);
  if (item) {
    item.count++;
    localStorage.setItem("productsIncart", JSON.stringify(addedItem));
    drawCartItems();
  }
}

function decreaseCount(id) {
  let item = addedItem.find(p => p.id === id);
  if (item) {
    if (item.count > 1) {
      item.count--;
    } else {
      addedItem = addedItem.filter(p => p.id !== id);
      document.getElementById(id).style.display = "inline-block";
      document.getElementById(id + '000').style.display = "none";
    }

    localStorage.setItem("productsIncart", JSON.stringify(addedItem));
    drawCartItems();
  }
}

// فتح و إغلاق السلة
let shoppingCartIcon = document.querySelector(".shopping_cart i");
let cartsproducts = document.querySelector(".carts_products");
shoppingCartIcon.addEventListener("click", () => {
  if (cartsproducts.style.display === "block") {
    cartsproducts.style.display = "none";
  } else {
    cartsproducts.style.display = "block";
  }
});
