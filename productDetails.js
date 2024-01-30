const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("productId");
  // console.log(param);
  // loadTime(param);
  fetch(`http://127.0.0.1:8000/flower/flower/${param}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displayDetails(data)
    });
  };
const displayDetails = (product) => {
  // console.log(article);
  const parent = document.getElementById("product-details");
  const div = document.createElement("div");
  div.innerHTML = `
  <small class="text-muted">Product ID: ${product.id}</small>
  <div class="card mb-3 p-3" style="max-width: 100%;">
  <div class="row g-0">
    <div class="col-md-6">
      <img src=${product.image} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-6">
      <div class="card-body py-3">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text"><small class="text-muted">$${product.price}</small></p>
        <p class="card-text"><small class="text-muted">$${product.quentity}</small></p>
        <p class="card-text"><small class="text-muted">${product.category}</small></p>
        <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        >
        ADD TO BASKET
        </button>
      </div>
    </div>
  </div>
</div>
      `;
  parent.appendChild(div);
  
};
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
     const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
     for (const cookie of cookies) {
        if (cookie.startsWith(`${name}=`)) {
           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
           break;
        }
     }
  }
  return cookieValue;
}
const handleOrder = () => {
  // const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)(;|$)/)[1];
  const csrfToken = getCookie("csrftoken");
  console.log(csrfToken);
  const param = new URLSearchParams(window.location.search).get("productId");
  const address = document.getElementById("address").value;
  const productTitleElement = document.getElementById("product-title");
  const productPriceElement = document.getElementById("product-price");
  const user_name = localStorage.getItem("user_name");
  fetch(`http://127.0.0.1:8000/flower/flower/${param}`)
    .then((res) => res.json())
    .then((data) => {
      const title = data.title;
      const price = data.price;
      productTitleElement.innerHTML = title;
      productPriceElement.innerHTML = price;
      const postData = {
        
        quantity: 1,
        status: 'Pending',
        cancel: false,
        user: user_name,
        flower: title,
      };
      console.log(postData);
      fetch("http://127.0.0.1:8000/flower/order/", {
      method: "POST",
      headers: { 
        "content-type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(postData),
      })
    .then((res) => res.json())
    .then((data) => {
      
      // console.log(data);
    });
    })
}
const loadUsertId = () => {
  const user_id = localStorage.getItem("user_id");

  fetch(`http://127.0.0.1:8000/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.username);
      localStorage.setItem("user_name", data.username);
    });
};
loadUsertId()
getparams()
