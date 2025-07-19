 let allproducts = document.querySelector("#userproducts");
let productsIncart = JSON.parse(localStorage.getItem("productsIncart")) || [];

if (productsIncart) {
  draw(productsIncart);
}

function draw(product) {
 let total=0;
 
  let y = product.map((item) => {
    total+=item.price*item.count
    return `
      <div class="card mb-3 cartcard" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${item.img}" class="card-img-top" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body pt-3">
              <p>Product: ${item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Category: ${item.category}</p>
               <a class="pluss" onclick="increaseCount(event,${item.id})"href="#" class="pluss"><i class="fas fa-plus text-success" ></i></a>
                <span class="mynum">${item.count}</span>
                <a  class="pluss"onclick="decreaseCount(event,${item.id})" href="#" class="minus"><i class="fas fa-minus text-danger"></i></a>
              <a href="#" class="btn btn-danger delete-item" id="${item.id}000"
                 onclick="remove_from_chart(event, ${item.id})">
                Remove
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  allproducts.innerHTML = y;
  let totalDiv = document.querySelector("#totalPrice");
  if (totalDiv) {
    totalDiv.innerHTML = `<p >Total Price : <span >${total} $</span></p>`;
  }
}

function remove_from_chart(event, id) {
  event.preventDefault(); // ✅ يمنع السلوك الافتراضي للـ <a>

  let filtterdItems = productsIncart.filter((item) => item.id !== id);
  localStorage.setItem("productsIncart", JSON.stringify(filtterdItems));
  productsIncart = filtterdItems; // ✅ حدّث النسخة اللي فوق
  draw(filtterdItems);
}
function increaseCount(event,id){
  event.preventDefault();

let item=productsIncart.find((item)=>item.id==id)
if(item){
  item.count++
  localStorage.setItem("productsIncart",JSON.stringify(productsIncart))
  draw(productsIncart)
}
}
 function decreaseCount(event,id){
  event.preventDefault()
  let item=productsIncart.find((item)=>item.id==id)
  if(item){
    if(item.count>1){
      item.count--;
    }else{
      productsIncart=productsIncart.filter((item)=>item.id !==id)
    }
    localStorage.setItem("productsIncart",JSON.stringify(productsIncart))
    draw(productsIncart)
  }

 }
