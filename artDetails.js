const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("articleId");
  // console.log(param);
  // loadTime(param);
  fetch(`https://sunexpress.onrender.com/article/list/${param}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displayDetails(data)
    });
  fetch(`https://sunexpress.onrender.com/article/reviews/?article_id=${param}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      articleReview(data)
    });
    
};
const articleReview = (reviews) => {
  let totalRating = 0;
  const parent = document.getElementById("art-details-review");

  // Display average rating
  const averageRating = calculateAverageRating(reviews);
  const averageDiv = document.createElement("div");
  averageDiv.classList.add("average-rating");
  averageDiv.innerHTML = `
  <h6>Average Rating: ${averageRating.toFixed(2) || 0}</h6>
  `;

  parent.appendChild(averageDiv);


  reviews.forEach((review) => {
    console.log(review);
    const { rating, viewer, viewer_email } = review;

    const div = document.createElement("div");
    div.classList.add("card", "review-card"); // Add Bootstrap card class along with custom class
    div.innerHTML = `
      <div class="card-body ">
        <h6 class="card-title">${viewer}</h6>
        <p class="card-text">Email: ${viewer_email}</p>
        <p class="card-text">Rating: ${rating}</p>
      </div>
    `;
    parent.appendChild(div);

    totalRating += rating;
  });

  console.log(`Total Reviews: ${reviews.length}`);
};

const calculateAverageRating = (reviews) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

const displayDetails = (article) => {
  // console.log(article);
  const parent = document.getElementById("art-details");
  const div = document.createElement("div");
  const publishingTime = new Date(article.publishing_time);
  div.classList.add("art-details-container");
  div.innerHTML = `
  <div class="card">
    <p class='text-info'>${publishingTime.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })}</p>
      <div class="article-img">
      <img class="card-img-top" src=${article.image} alt="Card image cap" />
    </div>
    <div class="card-body">
      <h1 class="card-title">${article.headline} </h1>
      <p  class="card-text"> ${article.body} </p>
  
      <h4 class='card-text text-primary'>${article.category} </h4>
      <h6 class='card-text text-warning'>${article.editor} </h6>
      
      </div>
    </div>
      `;
  parent.appendChild(div);
};

getparams()