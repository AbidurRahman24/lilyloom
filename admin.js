const loadAdminOrder = () => {
    fetch(`https://lilyloom.onrender.com/order/orders/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        displayUserOrder(data)
      })
      .catch((err) => console.log(err));
      
  };
const displayUserOrder = (products) => {
    const parent = document.getElementById("admin-product-container");
    const table = document.createElement("table");
    table.classList.add("table", "table-bordered","p-3");
  
    // Table header
    table.innerHTML = `
      <thead class='text-center'>
        <tr>
          <th scope="col">Product Serial</th>
          <th scope="col">Product Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Status</th>
          <th scope="col">Cancel</th>
        </tr>
      </thead>
      <tbody>
    `;
  
    // Table rows
    products.forEach((product) => {
      // console.log(product);
      table.innerHTML += `
        <tr class='text-center'>
          <td>${product.id}</td>
          <td>${product.flower}</td>
          <td>${product.quantity}</td>
          <td>$ ${product.price}</td>
          <td>${product.status}</td>
          <td>X</td>
        </tr>
      `;
    });
  
    // Close table body and table
    table.innerHTML += `
      </tbody>
    `;
    
    parent.appendChild(table);
  };
  
  const loadAdminDetails = () => {
    const user_id = localStorage.getItem("user_id");
  
    // Fetch user data
    fetch(`https://lilyloom.onrender.com/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
  
        if (data.is_superuser) {
          const parent = document.getElementById("admin-details-container");
          const div = document.createElement("div");
          div.classList.add("user-all");
          div.innerHTML = `
            <section>
              <div class="container">
                <div class="row d-flex justify-content-center align-items-center">
                  <div class="col-md-12">
                    <div class="">

                      <div class="card-body">
                        <h4 class="mb-2">${data.username}</h4>
                        <p class="text-muted mb-2">${data.email} <span class="mx-2"></a></p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          `;
  
          parent.appendChild(div);
        } else {
          console.log("User is not an admin");
          // Handle the case where the user is not an admin
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Handle the error, e.g., show an error message to the user
      });
  };
  loadAdminOrder()
  loadAdminDetails()