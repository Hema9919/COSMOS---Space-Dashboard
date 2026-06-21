// WRITE YOUR JS CODE HERE
//==============================================
// ^ HTML Elements
//==============================================
var apoddate = document.querySelector("#apod-date");
var apodimage = document.querySelector("#apod-image");
var apodexplanation = document.querySelector("#apod-explanation");
var apoddatedetail = document.querySelector("#apod-date-detail");
var apodtitle = document.querySelector("#apod-title");
var apodcopyright = document.querySelector("#apod-copyright");
var apoddateinfo = document.querySelector("#apod-date-info");

var apodloading = document.querySelector("#apod-loading");
var viewFullImage = document.querySelector("#view-full-image");

var todayapodbtn = document.querySelector("#today-apod-btn");
var loadDateBtn = document.querySelector("#load-date-btn");

var apodDateInput = document.querySelector("#apod-date-input");
var dateText = document.querySelector("#searchdate");

var loadingText = document.querySelector("#loading-text");

//sections
var todayinspace = document.querySelector("#today-in-space");
var launches = document.querySelector("#launches");
var planets = document.querySelector("#planets");
//Launches
var todayLink = document.querySelector('[data-section="today-in-space"]');
var launchesLink = document.querySelector('[data-section="launches"]');
var planetsLink = document.querySelector('[data-section="planets"]');

var featuredlaunch = document.querySelector("#featured-launch");
var launchesgrid = document.querySelector("#launches-grid");
//PLanests
var planetsGrid = document.querySelector("#planets-grid");
var planetDetailImage = document.querySelector("#planet-detail-image");
var planetDetailName = document.querySelector("#planet-detail-name");
var planetDetailDescription = document.querySelector(
  "#planet-detail-description",
);
var planetDistance = document.querySelector("#planet-distance");
var planetRadius = document.querySelector("#planet-radius");
var planetMass = document.querySelector("#planet-mass");
var planetDensity = document.querySelector("#planet-density");
var planetOrbitalPeriod = document.querySelector("#planet-orbital-period");
var planetRotation = document.querySelector("#planet-rotation");
var planetMoons = document.querySelector("#planet-moons");
var planetGravity = document.querySelector("#planet-gravity");

var planetDiscoverer = document.querySelector("#planet-discoverer");

var planetDiscoveryDate = document.querySelector("#planet-discovery-date");

var planetBodyType = document.querySelector("#planet-body-type");

var planetVolume = document.querySelector("#planet-volume");

var planetFacts = document.querySelector("#planet-facts");

var planetPerihelion = document.querySelector("#planet-perihelion");

var planetAphelion = document.querySelector("#planet-aphelion");

var planetEccentricity = document.querySelector("#planet-eccentricity");

var planetInclination = document.querySelector("#planet-inclination");

var planetAxialTilt = document.querySelector("#planet-axial-tilt");

var planetTemp = document.querySelector("#planet-temp");

var planetEscape = document.querySelector("#planet-escape");
//==============================================
// ^ Variables
//==============================================

var fullImageUrl = "";

var today = new Date().toISOString().split("T")[0];

// تحديد أقصى تاريخ
apodDateInput.max = today;

var result;

var selectedPlanet = "terre";

var resultplanet;
//==============================================
// ^ Functions
//==============================================
//helper function
//togle between section
function toggleSection(section) {
  // اقفل كل السيكشنات
  todayinspace.classList.add("hidden");
  launches.classList.add("hidden");
  planets.classList.add("hidden");

  // افتح المطلوب
  if (section === "today-in-space") {
    todayinspace.classList.remove("hidden");
  }

  if (section === "launches") {
    launches.classList.remove("hidden");
  }

  if (section === "planets") {
    planets.classList.remove("hidden");
  }
}
function setActive(link) {
  // رجّع الشكل الطبيعي لكل اللينكات
  todayLink.className =
    "nav-link flex items-center space-x-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg font-medium transition-colors";

  launchesLink.className =
    "nav-link flex items-center space-x-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg font-medium transition-colors";

  planetsLink.className =
    "nav-link flex items-center space-x-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg font-medium transition-colors";

  link.className =
    "nav-link flex items-center space-x-3 px-3 py-2.5 bg-blue-500/10 text-blue-400 rounded-lg font-medium transition-colors";
}
function showLoading() {
  apodloading.classList.remove("hidden");
  loadingText.classList.remove("hidden");
}

function hideLoading() {
  apodloading.classList.add("hidden");
  loadingText.classList.add("hidden");
}

function showError() {
  apodloading.classList.add("hidden");
  loadingText.classList.remove("text-slate-400");
  loadingText.classList.add("text-red-400");
  loadingText.innerHTML = "Failed to get data, please try again";
}

//hide data
function hidedata() {
  apoddate.innerHTML = "";
  apodtitle.innerHTML = "";
  apoddatedetail.innerHTML = "";
  apodexplanation.innerHTML = "";
  apodcopyright.innerHTML = "";
  apoddateinfo.innerHTML = "";
  fullImageUrl = "";
  apodimage.classList.remove("w-full", "h-full", "object-cover");
  apodimage.src = "";
}
// Get Today's APOD
async function getTodayAPOD() {
  try {
    showLoading();

    var res = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=dTenBJ8EDAy22QAfnMHm7gGE5fy9EB9lC0Hs7HPb",
    );

    res = await res.json();

    displayTodayAPOD(res);

    // تحديث التاريخ في الـ input
    apodDateInput.value = today;
    dateText.innerHTML = today;
  } catch (error) {
    console.log(error);
    showError();
  }
}

getTodayAPOD();

// Display Data

function displayTodayAPOD(res) {
  apoddate.innerHTML = `${res.title} - ${res.date}`;

  apodtitle.innerHTML = res.title;

  apoddatedetail.innerHTML = res.date;

  apodexplanation.innerHTML = res.explanation;

  apodcopyright.innerHTML = res.copyright ? `&copy; ${res.copyright}` : "";

  apoddateinfo.innerHTML = res.date;

  fullImageUrl = res.hdurl;

  // إزالة الكلاسات أثناء التحميل
  apodimage.classList.remove("w-full", "h-full", "object-cover");

  // وضع الصورة
  apodimage.src = res.hdurl;

  // بعد تحميل الصورة
  apodimage.onload = function () {
    apodimage.classList.add("w-full", "h-full", "object-cover");

    hideLoading();
  };
}

// Get APOD By Date
async function getAPODByDate(date) {
  try {
    hidedata();
    showLoading();
    var res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=dTenBJ8EDAy22QAfnMHm7gGE5fy9EB9lC0Hs7HPb&date=${date}`,
    );
    res = await res.json();
    displayTodayAPOD(res);
  } catch (error) {
    console.log(error);
    showError();
  }
}

//Get All Launches
async function getAllLanches() {
  try {
    var res = await fetch(
      `https://lldev.thespacedevs.com/2.3.0/launches/upcoming`,
    );
    res = await res.json();
    result = res;
    displayAllLanches(res);
  } catch (error) {
    console.log(error);
  }
}
getAllLanches();

function dateformat(x) {
  var date = new Date(result.results[x].window_start);
  var launchDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  var launchTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: launchDate,
    time: launchTime,
  };
}
function displayAllLanches(res) {
  var launchDateDay = new Date(res.results[0].window_start);
  var now = new Date();
  var diffTime = launchDateDay - now;
  var daysUntilLaunch = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  var cartona = `
     <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${res.results[0].status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                        ${res.results[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>                        ${res.results[0].launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>                        ${res.results[0].rocket.configuration.full_name}
</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${daysUntilLaunch}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">                        ${dateformat(0).date}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${dateformat(0).time}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${res.results[0].pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${res.results[0].pad.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                     ${res.results[0].mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                   <img
  id="launch-image"
  class="w-full h-full object-cover min-h-[400px]"
  src=${res.results[0].image.image_url}
  alt="Launch Image"
/>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
    `;
  featuredlaunch.innerHTML = cartona;
  var cartona2 = "";
  for (var i = 1; i < res.results.length; i++) {
    cartona2 += `
         <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                                   <img
class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  src=${res.results[i].image.image_url}
  alt="Launch Image"
/>
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                   ${res.results[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                  ${res.results[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                   ${res.results[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${dateformat(i).date}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${dateformat(i).time}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${res.results[i].rocket.configuration.full_name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${res.results[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
        `;
  }
  launchesgrid.innerHTML = cartona2;
}

//Get Planets
async function getPlanets() {
  try {
    var res = await fetch(
      `https://solar-system-opendata-proxy.vercel.app/api/planets`,
    );
    res = await res.json();
    res = res.bodies;
    getPlanet(res);
    resultplanet = res;
  } catch (error) {
    console.log(error);
  }
}
getPlanets();
function getPlanet(res) {
  for (var i = 0; i < res.length; i++) {
    if (res[i].id == selectedPlanet) {
      diplayPalent(res[i]);
    }
  }
}

//Display Palent
function diplayPalent(newPalent) {
  console.log(newPalent);

  // Main Info
  planetDetailImage.src = newPalent.image;

  planetDetailName.textContent = newPalent.englishName;

  planetDetailDescription.textContent = newPalent.description;

  planetDistance.textContent = `${(newPalent.semimajorAxis / 1000000).toFixed(1)}M km`;

  planetRadius.textContent = `${newPalent.meanRadius.toLocaleString()} km`;

  planetMass.textContent = `${newPalent.mass.massValue} × 10^${newPalent.mass.massExponent} kg`;

  planetDensity.textContent = `${newPalent.density} g/cm³`;

  planetOrbitalPeriod.textContent = `${newPalent.sideralOrbit} days`;

  planetRotation.textContent = `${Math.abs(newPalent.sideralRotation)} hours`;

  planetMoons.textContent = newPalent.moons ? newPalent.moons.length : 0;

  planetGravity.textContent = `${newPalent.gravity} m/s²`;

  // Discovery Info
  planetDiscoverer.textContent =
    newPalent.discoveredBy || "Known since antiquity";

  planetDiscoveryDate.textContent = newPalent.discoveryDate || "Ancient";

  planetBodyType.textContent = newPalent.bodyType;

  planetVolume.textContent = `${newPalent.vol.volValue} × 10^${newPalent.vol.volExponent} km³`;

  // Orbital Characteristics
  planetPerihelion.textContent = `${(newPalent.perihelion / 1000000).toFixed(1)}M km`;

  planetAphelion.textContent = `${(newPalent.aphelion / 1000000).toFixed(1)}M km`;

  planetEccentricity.textContent = newPalent.eccentricity;

  planetInclination.textContent = `${newPalent.inclination}°`;

  planetAxialTilt.textContent = `${newPalent.axialTilt}°`;

  planetTemp.textContent = `${newPalent.avgTemp}°C`;

  planetEscape.textContent = `${(newPalent.escape / 1000).toFixed(2)} km/s`;
}

//==============================================
// ^ Events
//==============================================
todayLink.addEventListener("click", function (e) {
  e.preventDefault();

  toggleSection("today-in-space");
  setActive(todayLink);
});

launchesLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleSection("launches");
  setActive(launchesLink);
});

planetsLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleSection("planets");
  setActive(planetsLink);
});
// Open Full Image

viewFullImage.addEventListener("click", function () {
  if (fullImageUrl) {
    window.open(fullImageUrl, "_blank");
  }
});
// Today Button
todayapodbtn.addEventListener("click", function () {
  apodDateInput.value = today;

  dateText.innerHTML = today;

  getAPODByDate(today);
});

// Load Date Button
loadDateBtn.addEventListener("click", function () {
  var selectedDate = apodDateInput.value;
  if (selectedDate) {
    getAPODByDate(selectedDate);
  } else {
    dateText.innerHTML = "Search by date";
  }
});

// Change Date
apodDateInput.addEventListener("change", function () {
  dateText.innerHTML = this.value;
});

planetsGrid.addEventListener("click", function (e) {
  var card = e.target.closest(".planet-card");

  if (!card) return;

  selectedPlanet = card.dataset.planetId;
  getPlanet(resultplanet);
});

//=======================================
//             Mobile
//=======================================
var sidebar = document.querySelector("#sidebar");
var sidebarToggle = document.querySelector("#sidebar-toggle");

sidebarToggle.addEventListener("click", function () {
  sidebar.classList.toggle("sidebar-open");
});

// قفل لما تضغط خارج الـ sidebar
document.addEventListener("click", function (e) {
  var clickInsideSidebar = sidebar.contains(e.target);
  var clickOnButton = sidebarToggle.contains(e.target);

  if (!clickInsideSidebar && !clickOnButton) {
    sidebar.classList.remove("sidebar-open");
  }
});
