const loadCategoryArticle = (search) => {
  document.getElementById("cat-details").innerHTML = "";
  document.getElementById("article-container").innerHTML = "";

    // console.log(search);
    fetch(`https://sunexpress.onrender.com/article/list/?search=${
        search
      }`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        displayCategoryArticle(data)
      })
      .catch((err) => console.log(err));
};

const displayCategoryArticle = (catArticles) => {
    // console.log(catArticles);
    catArticles?.forEach((catArticle) => {
      // console.log(doctor);
      const parent = document.getElementById("cat-details");
      const div = document.createElement("div");
      div.classList.add("doc-card");
      div.innerHTML = `
      <div class="card p-3" style="width: 50rem;">
          <img class="card-img-top" src=${catArticle.image} alt="" />
          <div class="card-body">
                <h4 class="card-title">${catArticle?.headline}</h4>
                <p class="card-text">${catArticle?.body.slice(0, 150)}</p>
            </div>
        </div>      
          `;
      parent.appendChild(div);
    });
  };


const loadCategoryArticleByRating = (search) => {
  // console.log(search);
    // document.getElementById("rating-details").innerHTML = "";
    document.getElementById("cat-details").innerHTML = "";
    document.getElementById("article-container").innerHTML = "";
  
      // console.log(search);
      fetch(`https://sunexpress.onrender.com/article/reviews/?search=${
          search
        }`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          displayCategoryArticleByRating(data)
        })
        .catch((err) => console.log(err));
  };

const displayCategoryArticleByRating = (catArticles) => {
    console.log(catArticles);
    catArticles?.forEach((catArticle) => {
      console.log(catArticle);
      const parent = document.getElementById("cat-details");
      const div = document.createElement("div");
      div.classList.add("doc-card");
      div.innerHTML = `
      <div class="card p-3" style="width: 50rem;">
          <div class="card-body">
                <h4 class="card-title">${catArticle?.article}</h4>
            </div>
        </div>      
          `;
      parent.appendChild(div);
    });
  };
loadCategoryArticle()
loadCategoryArticleByRating()














// const getCatparams = () => {
//     const param = new URLSearchParams(window.location.search).get("catId");
//     console.log(param);
//     // loadTime(param);
//     fetch(`https://sunexpress.onrender.com/category/list/${param}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         displayDetails(data)});
  
//     // fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
//     //   .then((res) => res.json())
//     //   .then((data) => doctorReview(data));
// };


// getCatparams()