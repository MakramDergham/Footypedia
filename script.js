football = {
  searchTeam: function (teamName, data) {
    let teams = data.teams;
    teams.forEach((team) => {
      if (team.strTeam.toLowerCase().includes(teamName.toLowerCase())) {
        localStorage.setItem("favTeam", JSON.stringify(team));
        return
      }
    });
    if (localStorage.getItem("favTeam") === null) {
        alert("team not found")
      }else{
        document.getElementById("team-ask").style.display = "none";
        this.displayTeam(JSON.parse(localStorage.getItem("favTeam")))
      }
      
  },
  displayTeam: function (team) {
    document.getElementById("my-team").style.display = "block";
    let teamName = team.strTeam
    let teamLeague = team.strLeague
    let teamLogo = team.strTeamBadge
    let teamStadium = team.strStadium
    let stadiumPic = team.strStadiumThumb
    let stadiumDescription = team.strStadiumDescription
    let instagram = team.strInstagram
    let website = team.strWebsite
    let youtube = team.strYoutube
    let teamFormed = team.intFormedYear
    let myTeamContainer = document.getElementById("my-team")
    let banner = document.createElement("div")
    banner.innerHTML = `<img src="${teamLogo}" alt="${teamName}"><div><h3>${teamName}</h3><p>${teamLeague}</p></div>`
    banner.classList.add('banner')
    myTeamContainer.appendChild(banner)
    
    let socialInfo = document.createElement('div')
    socialInfo.innerHTML = `<a href="https://${instagram}"><i class="bi bi-instagram"></i></a><a href="https://${youtube}"><i class="bi bi-youtube"></i></a><a href="https://${website}"><i class="bi bi-browser-chrome"></i></a>`
    socialInfo.classList.add('social-info')
    myTeamContainer.appendChild(socialInfo)
    const bannerElement = document.querySelector(".banner");
const socialInfoElement = document.querySelector(".social-info");
}
}
document.querySelector('.cta').addEventListener('click', function() {
  window.scrollTo({
    top: 700,
    behavior: 'smooth'
  });
});
function showNav() {
  document.querySelector(".menu-nav-items").style.display = "flex";
  setTimeout(() => {
    document.querySelector(".menu-nav-items").style.width = "200px";
  }, 100);
}
function exitNav() {
  document.querySelector(".menu-nav-items").style.display = "none";
  setTimeout(() => {
    document.querySelector(".menu-nav-items").style.width = "0";
  }, 100);
}
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 0) {
    nav.style.backdropFilter = "blur(10px)";
  } else {
    nav.style.backdropFilter = "none";
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const introSection = document.getElementById('intro');
  const listItems = introSection.querySelectorAll('li');

  const observerOptions = {
      root: null, // Use the viewport as the container
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the section is visible
  };

  const observerCallback = (entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              listItems.forEach((item, index) => {
                  setTimeout(() => {
                      item.classList.add('show');
                  }, index * 100); // Delay for a staggered effect
              });
          } else {
              listItems.forEach((item, index) => {
                  setTimeout(() => {
                      item.classList.remove('show');
                  }, index * 100); // Delay for a staggered effect
              });
          }
      });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(introSection);
});

const teamInput = document.getElementById("teamInput");
const chooseButton = document.getElementById("chooseButton");
chooseButton.addEventListener("click", () => {
  let favTeamInput = teamInput.value;
  if (favTeamInput.trim() === "") {
    alert("Please enter a team name");
  } else {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${
        document.querySelector("select").value
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        football.searchTeam(favTeamInput, data);
      })
      
  }
});
if (localStorage.getItem("favTeam") !== null) {
  document.getElementById("team-ask").style.display = "none";
  football.displayTeam(JSON.parse(localStorage.getItem("favTeam")))
}
function displayDescription(){
  if(document.querySelector(".stadium-description").style.display !== "block"){
  document.querySelector(".stadium-description").style.display = "block"
  document.querySelector(".vm-text").innerHTML = "View Less"
  }else{
    document.querySelector(".stadium-description").style.display = "none"
  document.querySelector(".vm-text").innerHTML = "View more"
  }

}

document.addEventListener('DOMContentLoaded', function () {
  //Define variables for relevant DOM objexts
  const ball = document.getElementById("ball"),
      innerBall = document.getElementById("innerBall"),
      gameDiv = document.getElementById("game-div"),
      scoreBoard = document.getElementById("scoreBoard"),
      recordBoard = document.getElementById("recordBoard"),
      theBallShadow = document.getElementById("ballShadow"),
      loaderScreen = document.getElementById("loader");
  scoreBoard.innerText = "0";
  recordBoard.innerText = "0";

  //define variables relevant to the physics and position of the ball
  let timeInterval,
      bounces = 0,
      record = 0,
      speedX = 10,
      speedY = 0,
      positionX = 0,
      positionY = gameDiv.clientHeight + 300,
      stopY = false,
      recordMode = false;

  //loading screen
  setTimeout(() => {
      gameDiv.style.opacity = '1';
  }, 500);
  

  ball.addEventListener("click", function (event) {
      //remember the bounces count and update the current record (maximum bounces in a single attempt)
      bounces++;
      if (bounces > record) {
          record = bounces;
          if (!recordMode) {
              //crate an element which looks identical to the record num element for and animation to mark the new record
              let recordbehind = document.createElement("div");
              recordbehind.setAttribute("id", "recnum" + bounces);
              recordbehind.innerText = record.toString();
              recordbehind.setAttribute("class", "recordBoard-behind");
              gameDiv.appendChild(recordbehind);
              recordMode = true;
          }
      }

      //change the speed of the ball both vertically and horizontally acording to the mouse X,Y position at the moment of clicking
      speedX = (45 - event.layerX) / 5;
      speedY = (event.layerY + 30) / 6;
      if (speedY > 1) {
          stopY = false;
      } else {
          speedY = 0;
      }
  });

  //continuous update of the position and speed according to the physical state of the ball
  timeInterval = setInterval(() => {
      if (speedY < 3 && speedY > -3 && positionY < 0.2) {
          stopY = true;
          speedY = 0;
          positionY = 0;
          bounces = 0;
          recordMode = false;
      }

      if (!stopY) {
          speedY -= 0.5;
      }
      if (positionY <= 0 && !stopY) {
          if (speedY < 0) {
              bounces = 0;
              recordMode = false;
          }
          positionY = Math.abs(positionY);
          speedY = Math.abs(speedY) / 2;
      }
      if (positionX <= 0) {
          positionX = Math.abs(positionX);
          speedX = Math.abs(speedX) / 1.5;
      }
      if (positionX + 90 > gameDiv.clientWidth) {
          positionX = 2 * gameDiv.clientWidth - Math.abs(positionX) - 180;
          speedX = 0 - speedX / 1.5;
      }
      positionY += speedY;
      if (speedX < 0.1 && speedX > -0.1 && stopY) {
          speedX = 0;
      }
      if (speedX > 0 && stopY) {
          speedX -= 0.1;
      }
      if (speedX < 0 && stopY) {
          speedX += 0.1;
      }
      positionX += speedX;
      //actual update of the elements' style attributes to change his position
      ball.style.bottom = positionY.toString() + "px";
      ball.style.left = positionX.toString() + "px";
      innerBall.style.transform =
          "rotate(" + (positionX * (360 / 282.74)).toString() + "deg)";
      //move the ball shadow element according to ball's positionX
      theBallShadow.style.left = (positionX + 45).toString() + "px";
      theBallShadow.style.filter =
          "blur(" + ((positionY + 80) / 40).toString() + "px)";
      theBallShadow.style.width = ((positionY + 225) / 5).toString() + "px";
      //update record number and style according to the current number of bounces
      if (recordMode) {
          recordBoard.classList.add("recordmode");
          scoreBoard.classList.add("scorerecordmode");
      } else {
          recordBoard.classList.remove("recordmode");
          scoreBoard.classList.remove("scorerecordmode");
      }
      scoreBoard.innerText = bounces;
      recordBoard.innerText = record;
  }, 20);
})