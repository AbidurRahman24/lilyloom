const loadCategory = () => {
  
    fetch("https://lilyloom.onrender.com/flower/list/")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        displaycategory(data)
      })
      .catch((err) => console.log(err));
};
  const displaycategory = (cats) => {
    //   console.log(services);
    cats.forEach((cat) => {
      const parent = document.getElementById("category-container");
      const li = document.createElement("li");
      li.classList.add("nav-item");
      li.innerHTML = `
                  <div class="nav-link text-white font-weight-bold">
                  <a target="_blank" onclick="loadCategoryProduct('${cat.name}')" style="cursor: pointer;"> ${cat.name}</a>
                  </div>
        `;
      parent.appendChild(li);
      // Create article container for each category
      
    });
  };


// load product
const loadProduct = () => {
  
  fetch("https://lilyloom.onrender.com/flower/flower/")
    .then((res) => res.json())
    .then((data) => 
    {
      displayProducts(data)
      // console.log(data);
    }
    )
    .catch((err) => console.log(err));
};

const displayProducts = (products) => {
  // console.log(products);
  const parent = document.getElementById("product-container");

  // Iterate over the last 4 prudct
  for (let i = Math.max(0, products.length - 4); i < products.length; i++) {
    const product = products[i];

    const col = document.createElement("div");
    col.classList.add("col-md-3", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card", "shadow", "h-100");

    card.innerHTML = `
      <div class="card p-3">
        <img src=${product.image} class="card-img-top" loading="lazy" alt="..." />
      </div>
      <div class="card-body">
        <h5 class="card-title font-weight-bold">
        <a class='text-decoration-none text-dark' target="_blank" href="productDetails.html?productId=${
          product.id
        }">${product.title}</a> 
        </h5>
        <p class="card-text">${product.description.slice(0, 30)}</p>
        <p class="card-text">$ ${product.price}</p>
        <button class='btn btn-warning font-weight-bold' > <a class='text-decoration-none text-dark' target="_blank" href="productDetails.html?productId=${
          product.id
        }">ADD TO BASKET</a> </button>
      </div>
    `;

    col.appendChild(card);
    parent.appendChild(col);
  }
};


const loadCategoryProduct = (search) => {
  document.getElementById("products").innerHTML = "";
  // document.getElementById("spinner").style.display = "block";
  // console.log(search);
  fetch(
    `https://lilyloom.onrender.com/flower/flower/?search=${
      search ? search : ""
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        // document.getElementById("spinner").style.display = "none";
        // document.getElementById("nodata").style.display = "none";
        displyProducts(data,search);
      } else {
        // document.getElementById("doctors").innerHTML = "";
        // document.getElementById("spinner").style.display = "none";
        // document.getElementById("nodata").style.display = "block";
      }
    });
};

const displyProducts = (products, searchText) => {
  const parent = document.getElementById("products");
  const catDiv = document.createElement("div")
  catDiv.innerHTML = ` <h3>${searchText}</h3>`
  parent.appendChild(catDiv)
  products?.forEach((product) => {
    const col = document.createElement("div");
    col.classList.add("col-md-3", "mb-4");

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
   
    <div class="p-3" style="height:400px;">
      <img src=${product.image} class="card-img-top" loading="lazy" alt="..." />
      <div class="card-body">
        <h4 class="card-title">${product?.title}</h4>
        <h6 class="card-subtitle mb-2 text-muted">${product?.description.slice(0, 100)}</h6>
        <button class="btn btn-warning text-center">  <a class='text-decoration-none text-dark' target="_blank" href="productDetails.html?productId=${
          product.id
        }">Details</a> </button>
      </div>
    </div>
    `;

    col.appendChild(div);
    parent.appendChild(col);
  });
 
};


const handleSearch = () => {
  const value = document.getElementById("search").value;
  loadCategoryProduct(value);
};

// load review rating

loadCategory()
loadProduct()
// loadCategoryProduct()
// loadReviewRating()