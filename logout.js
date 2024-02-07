const handlelogOut = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  fetch("https://lilyloom.onrender.com/account/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
    });
};