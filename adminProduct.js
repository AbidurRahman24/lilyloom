const loadAllProduct = () => {
    fetch("https://lilyloom.onrender.com/flower/flower/")
      .then((res) => res.json())
      .then((data) => 
      {
        //   console.log(data);
          displayProductsTable(data)
      }
      )
      .catch((err) => console.log(err));
  };
  loadAllProduct()
const displayProductsTable = (products) => {
    const parent = document.getElementById("admin-all-product-container");

    // Create the table
    const table = document.createElement("table");
    table.classList.add("table");

    // Create the table header
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create the table body
    const tbody = document.createElement("tbody");
    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${product.id}</th>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>$${product.quantity}</td>
            <td>
            <button class='btn btn-warning font-weight-bold' > <a onclick="handleDelete(${product.id})" class='text-decoration-none text-dark'>Delete</a> </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Append the table to the parent
    parent.appendChild(table);
};
// console.log(param);

// const loadTime = (id) => {
//     fetch(
//       `https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         data.forEach((item) => {
//           const parent = document.getElementById("time-container");
//           const option = document.createElement("option");
//           option.value = item.id;
//           option.innerText = item.name;
//           parent.appendChild(option);
//         });
//         console.log(data);
//       });
//   };

const handleDelete = (id) => {
    fetch(`https://lilyloom.onrender.com/flower/flower/${id}`, {
        method: 'DELETE',
      })
    .then((res) => res.json())
    .then((data) => 
    {
        console.log(data);
    }
    )
    .catch((err) => console.log(err));
    
};


