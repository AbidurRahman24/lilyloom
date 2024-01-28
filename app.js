const loadCategory = () => {
  
    fetch("http://127.0.0.1:8000/flower/list/")
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
                  <a target="_blank" onclick="loadCategoryArticle('${cat.name}')" style="cursor: pointer;"> ${cat.name}</a>
                  </div>
        `;
      parent.appendChild(li);
      // Create article container for each category
      
    });
  };


// load article
const loadArticle = () => {
  
  fetch("http://127.0.0.1:8000/flower/flower/")
    .then((res) => res.json())
    .then((data) => 
    {
      displayArticle(data)
      // console.log(data);
    }
    )
    .catch((err) => console.log(err));
};

const displayArticle = (articles) => {
  const parent = document.getElementById("article-container");

  // Iterate over the last 4 articles
  for (let i = Math.max(0, articles.length - 4); i < articles.length; i++) {
    const article = articles[i];

    const col = document.createElement("div");
    col.classList.add("col-md-3", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card", "shadow", "h-100");

    card.innerHTML = `
      <div class="card p-3">
        <img src=${article.image} class="card-img-top" loading="lazy" alt="..." />
      </div>
      <div class="card-body">
        <h5 class="card-title font-weight-bold">${article.title}</h5>
        <p class="card-text">${article.description.slice(0, 30)}</p>
        <p class="card-text">$ ${article.price}</p>
        <button class='btn btn-warning font-weight-bold' > <a class='text-decoration-none text-dark' target="_blank" href="artDetails.html?articleId=${
          article.id
        }">ADD TO BASKET</a> </button>
      </div>
    `;

    col.appendChild(card);
    parent.appendChild(col);
  }
};


const loadCategoryArticle = (search) => {
  document.getElementById("products").innerHTML = "";
  // document.getElementById("spinner").style.display = "block";
  // console.log(search);
  fetch(
    `http://127.0.0.1:8000/flower/flower/?search=${
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
        <button class="btn btn-warning text-center"> <a class='text-decoration-none text-dark' target="_blank" href="docDetails.html?doctorId=${product.id}">Details</a> </button>
      </div>
    </div>
    `;

    col.appendChild(div);
    parent.appendChild(col);
  });
 
};


const handleSearch = () => {
  const value = document.getElementById("search").value;
  loadCategoryArticle(value);
};

// load review rating
const loadReviewRating = () => {
  
  fetch("https://sunexpress.onrender.com/article/reviews/")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displayReviewRating(data)
    })
    .catch((err) => console.log(err));
};
const displayReviewRating = (ratings) => {
  ratings.forEach((rating) => {
    console.log(rating.rating);
    const parent = document.getElementById("rating-container");
    const li = document.createElement("li");
    li.innerHTML = `
                <div class='p-2'>
                
                <a target="_blank" onclick="loadCategoryArticleByRating('${rating.rating}')" style="cursor: pointer;"> ${rating.rating}</a>
                </div>
      `;
    parent.appendChild(li);
    
  });
};
loadCategory()
loadArticle()
// loadCategoryArticle()
// loadReviewRating()