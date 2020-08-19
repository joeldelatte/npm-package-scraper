var submitButton = document.querySelector("#submitButton");
var form = document.querySelector(".form");
var searchResults = document.querySelector(".searchResults");

submitButton.addEventListener("click", function () {
  event.preventDefault();
  var search = document.querySelector("#packageSearch");
  var packageSearch = search.value;

  async function getPackages() {
      searchResults.innerHTML = `<div></div><div><img src="https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"/></div><div></div>`;
      submitButton.value = "Loading"
      let response = await fetch("http://localhost:8080/npm-packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageSearch }),
      });

      let data = await response.json();
      
      return data;
  }

  getPackages()
  .then(async data=>{
      //ITERATE THROUGH DATA AND APPEND TO THE PAGE FROM HERE
      searchResults.innerHTML = "";
      for (var i = 0; i < data.length; i++) {
        //   searchResults.innerHTML += `<h3>${data[i].packageName}</h3>`;
        //   searchResults.innerHTML += `<a href="${data[i].packageURL}" target="_blank">${data[i].packageURL}</a>`;
        //   searchResults.innerHTML += `<p>Weekly Downloads: ${data[i].downloadNumber}</p>`;
          
          searchResults.innerHTML += `
            <div></div>
            <div class="resultCard">
                <h3>${data[i].packageName}</h3>
                <a href="${data[i].packageURL}" target="_blank">${data[i].packageURL}</a>
                <p>Weekly Downloads: ${data[i].downloadNumber}</p>
            </div>
            <div></div>
          `;

      }
      await console.log(data);
  }).then(async ()=>{
      submitButton.value = "Submit";
      await form.reset();
  })

});
