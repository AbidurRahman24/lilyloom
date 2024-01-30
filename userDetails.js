const loadUserDetails = () => {
    const user_id = localStorage.getItem("user_id");
    // console.log(user_id);
    fetch(`http://127.0.0.1:8000/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const parent = document.getElementById("user-details-container");
        const div = document.createElement("user-all");
        div.classList.add("user-all");
        div.innerHTML = `

        <section  style="background-color: #eee;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-12 col-xl-4">

        <div class="card" style="border-radius: 15px;">
          <div class="card-body text-center">
            <div class="mt-3 mb-4">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="rounded img-fluid" style="width: 100px;" />
            </div>
            <h4 class="mb-2">${data.username}</h4>
            <p class="text-muted mb-4">${data.email} <span class="mx-2">|</span> <a
                href="#!">${data.first_name+' ' + data.last_name}</a></p>
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
  loadUserDetails();


  // <div class="card" style="width: 18rem;">
  //           <img src="./Images/profile-1.avif" class="rounded" alt="profile" />
  //         </div>
  //         <div class="card-body">
  //         <h5 class="card-title">Username: ${data.username}</h5>
  //         <h3 class="card-text">Full Name: ${data.first_name+' ' + data.last_name}</h3>
  //         <h3 class="card-text">${data.email}</h3>
  //         </div>