const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("productId");
  // console.log(param);
  // loadTime(param);
  fetch(`https://lilyloom.onrender.com/flower/flower/${param}`)
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
        <p class="card-text"><small class="text-muted">Available Quantity: ${product.quantity}</small></p>
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


const getproduct = () => {
  const param = new URLSearchParams(window.location.search).get("productId");
  fetch(`https://lilyloom.onrender.com/flower/flower/${param}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.id);
      localStorage.setItem("flower", data.id);
      localStorage.setItem("price", data.price);
    });
};
getproduct()
const handleOrder = () => {
  const param = new URLSearchParams(window.location.search).get("productId");

  // Show item name and price in model box
  


  const csrfToken = getCookie("csrftoken");
  const quantity = document.getElementById("quantity").value;
  const user = localStorage.getItem("user");
  const price = localStorage.getItem("price");
  const totalPrice = price * quantity;
  console.log(price, "quantity:", quantity);



  const info = {
    quantity: quantity,
    price: totalPrice,
    status: "Pending",
    cancel: false,
    user: user,
    flower: param,
  };
  console.log(info);

  fetch(`https://lilyloom.onrender.com/flower/flower/${param}`)
    .then((res) => res.json())
    .then((product) => {
      // Update modal box content with product details
      document.getElementById("productName").innerText = product.title;
      document.getElementById("productPrice").innerText = `$${product.price * quantity}`;
    });
  // https://lilyloom.onrender.com/order/orders/
  fetch(`https://lilyloom.onrender.com/order/orders/`, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-CSRFToken": csrfToken,
    }
  })
    .then(response => response.json())
    .then(json => console.log(json));
};


const loadUsertId = () => {
  const user = localStorage.getItem("user_id");

  fetch(`https://lilyloom.onrender.com/users/${user}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('data User: ', data.id);
      localStorage.setItem("user", data.id);
    });
};
loadUsertId()
getparams()
