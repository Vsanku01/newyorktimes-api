let navItems = [];
// Get  references
const home = document.getElementById("home");
const world = document.getElementById("world");
const politics = document.getElementById("politics");
const magazine = document.getElementById("magazine");
const technology = document.getElementById("technology");
const science = document.getElementById("science");
const health = document.getElementById("health");
const sports = document.getElementById("sports");
const arts = document.getElementById("arts");
const fashion = document.getElementById("fashion");
const food = document.getElementById("food");
const travel = document.getElementById("travel");
const main = document.querySelector("main");
const loader = document.getElementById("loader");
navItems.push(
  home,
  world,
  politics,
  magazine,
  technology,
  science,
  health,
  sports,
  arts,
  fashion,
  food,
  travel
);

// Iterating each item and calling the fetch function
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.add("active");
    navItems.forEach((comp) => {
      if (comp.id !== item.id) {
        comp.classList.remove("active");
      }
    });
    console.log(`Clicked ${item.id}`);
    getData(item.id);
  });
});

document.body.onload = getData("home");
// API response
let abstract = "";
let byLine = "";
let createdDate = "";
let itemType = "";
let section = "";
let title = "";
let shortUrl = "";
let imgUrl = "";

function getData(category) {
  fetch(
    `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=bJfuD07a2jhmDJwjGWfMGenE3jzwyk3G`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      html = "";
      section = data.section;
      data.results.forEach((result) => {
        // extracting data from api
        abstract = result.abstract;
        byLine = result.byLine;
        createdDate = result.created_date;
        itemType = result.item_type;
        title = result.title;
        shortUrl = result.short_url;
        imgUrl = result.multimedia[4].url;
        if (section === "home") {
          section = "HEADLINES";
        }
        // Rendering Dynamic Content
        html += `
        <div class="card mb-3" style="width: 100%">
        <div class="row no-gutters">
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title section-card">${section}</h5>
              <p class="card-text titlecard">${title}</p>
              <p class="card-text date-card">${createdDate.slice(0, 10)}</p>
              <p class="card-text">
              ${abstract}
              </p>
              <a class="card-text continueReading" href=${shortUrl}>
                Continue Reading..
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <img
              src=${imgUrl}
              class="img-thumbnail"
              alt="inline-image"
            />
          </div>
        </div>
      </div>
        `;

        document.getElementById("main-row").innerHTML = html;
      });
      main.classList.remove("hidden");
      loader.style.display = "none";
    })
    .catch((err) => console.log(err));
}
