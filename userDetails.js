const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  // console.log(user_id);
  fetch(`https://lilyloom.onrender.com/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const parent = document.getElementById("user-details-container");
      const div = document.createElement("user-all");
      div.classList.add("user-all");
      div.innerHTML = `
        <section>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-12 col-xl-12">
        <div class="card" style="border-radius: 15px;">
          <div class="card-body text-center">
            <div class="mt-3 mb-4">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="rounded img-fluid" style="width: 100px;" />
            </div>
            <h4 class="mb-2">${data.username}</h4>
            <p class="text-muted mb-4">${data.email} <span class="mx-2">|</span> <a
                href="#!">${data.first_name + ' ' + data.last_name}</a></p>
            <div class="mb-4 pb-2">
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-facebook-f fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-twitter fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-skype fa-lg"></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
            `;
      parent.appendChild(div);
    });
};
const loadUserOrder = () => {
  const user_id = localStorage.getItem("user_id");
  // console.log(user_id);
  fetch(`https://lilyloom.onrender.com/order/orders/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayUserOrder(data)
    })
    .catch((err) => console.log(err));
};
const displayUserOrder = (products) => {
  const parent = document.getElementById("product-details-container");

  if (products.length === 0) {
    // Display a message when no products are purchased
    const noProductMessage = document.createElement("div");     
    noProductMessage.innerHTML = `
    <p class="text-muted m-3 p-5 shadow">You haven't purchased any products yet. Start <a href="index.html">shopping now</a>!</p>`;
    parent.appendChild(noProductMessage);
    return;
  }

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("col-md-4",'p-1', 'm-2', 'h-100');
    div.innerHTML = `
      <div class="card text-dar" style="max-width: 18rem; max-height: 15rem; border: 2px solid #3498db; border-radius: 15px; overflow: hidden;">
        <div class="card-header bg-primary text-white" style="border-bottom: 2px solid #3498db;"><span class='font-weight-bold'>${product.flower}</span></div>
        <div class="card-body">
          <h5 class="card-text">Order ID: ${product.quantity}</h5>
          <p class="card-text text-info mb-0">Status: ${product.status}</p>
        </div>
      </div>
    `;
    parent.appendChild(div);
  });
};



loadUserDetails();
loadUserOrder()
