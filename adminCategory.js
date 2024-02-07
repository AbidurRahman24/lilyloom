// const handleCategory = (event) => {
//     console.log('event');
//     event.preventDefault();
//     const value = document.getElementById('category-name').value;
//     console.log(value);
//     if ((value)) {
      
//     }
//   };

  const handleCategory = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const categoryName = document.getElementById('category-name').value;
    const categorySlug = document.getElementById('category-slug').value;
    console.log(categoryName,categorySlug);
    fetch("https://lilyloom.onrender.com/flower/list/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            name: categoryName,  
            slug: categorySlug, 
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
            // window.location.href = "adminCategory.html";
        });
    // Add your logic here (e.g., fetch request or other operations)
};
