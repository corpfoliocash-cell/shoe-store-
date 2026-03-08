const products = [
{
id:1,
name:"Running Shoe",
price:2999,
category:"running",
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
},
{
id:2,
name:"Casual Sneaker",
price:2499,
category:"casual",
image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"
},
{
id:3,
name:"Training Shoe",
price:3999,
category:"sports",
image:"https://images.unsplash.com/photo-1600180758890-6b94519a8ba4"
},
{
id:4,
name:"Running Pro",
price:4599,
category:"running",
image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
},
{
id:5,
name:"Street Sneaker",
price:2799,
category:"casual",
image:"https://images.unsplash.com/photo-1519741497674-611481863552"
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("total");
const cartCount = document.getElementById("cartCount");

function renderProducts(list){

productsContainer.innerHTML="";

list.forEach(product => {

const card=document.createElement("div");
card.className="product";

card.innerHTML=`
<img src="${product.image}">
<h3>${product.name}</h3>
<p>₹${product.price}</p>
<button onclick="addToCart(${product.id})">Add to Cart</button>
`;

productsContainer.appendChild(card);

});

}

renderProducts(products);

function addToCart(id){

const product=products.find(p=>p.id===id);

const existing=cart.find(item=>item.id===id);

if(existing){

existing.qty++;

}else{

cart.push({...product,qty:1});

}

saveCart();

}

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

}

function updateCart(){

cartItems.innerHTML="";

let sum=0;

cart.forEach(item=>{

sum+=item.price*item.qty;

const div=document.createElement("div");

div.className="cartItem";

div.innerHTML=`
${item.name} x ${item.qty}
<button onclick="removeItem(${item.id})">X</button>
`;

cartItems.appendChild(div);

});

total.innerText=sum;

cartCount.innerText=cart.length;

}

function removeItem(id){

cart=cart.filter(item=>item.id!==id);

saveCart();

}

updateCart();

document.getElementById("cartBtn").onclick=()=>{

const panel=document.getElementById("cartPanel");

panel.style.display = panel.style.display==="block" ? "none":"block";

};

document.getElementById("checkout").onclick=()=>{

if(cart.length===0){

alert("Cart empty");

}else{

alert("Order placed!");

cart=[];
saveCart();

}

};

document.getElementById("search").addEventListener("input",e=>{

const term=e.target.value.toLowerCase();

const filtered=products.filter(p=>p.name.toLowerCase().includes(term));

renderProducts(filtered);

});

document.getElementById("filter").addEventListener("change",e=>{

const value=e.target.value;

if(value==="all"){

renderProducts(products);

}else{

renderProducts(products.filter(p=>p.category===value));

}

});
