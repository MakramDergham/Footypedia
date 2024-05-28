matches = {
   fetchMatch: function(){
    let team1 = convertText(document.getElementById('team1').value);
    let team2 = convertText(document.getElementById('team2').value);
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=${team1}_vs_${team2}`)
    .then(response => response.json())
    .then(data => {console.log(data); this.displayMatches(data)})
   },
   displayMatches: function(data){
    document.getElementById("match-container").innerHTML = ""
    let {event} = data
    if(event !== null){
      document.querySelector(".match-animation").style.display = "none"
      document.getElementById("error-msg").innerHTML = ''
      let matchContainer = document.getElementById("match-container");
      matchContainer.innerHTML = ""
      let limit = 15;
      if(event.length < limit){
        limit = event.length
      }
      for(let i = 0; i < limit; i++) {
          let homeLogo =  data.event[0].strHomeTeamBadge 
          let awayLogo = data.event[0].strAwayTeamBadge
          let match = data.event[i]
          let stadium = match.strVenue ? match.strVenue : "";
          if(homeLogo === null || awayLogo === null){
            if(match.intHomeScore === match.intAwayScore){
              homeLogo = "assets/draw-icon.png"
              awayLogo = "assets/draw-icon.png"
            } else if(match.intHomeScore > match.intAwayScore){
              homeLogo = "assets/winner-icon.png"
              awayLogo = "assets/loser-icon.png"
            } else{
              homeLogo = "assets/loser-icon.png"
              awayLogo = "assets/winner-icon.png"
            }
          }
          matchContainer.innerHTML += `
          <div class="match-card">
            <div class="match-result">
            <img src="${homeLogo}" class="match-logo"><h3>${match.strHomeTeam} </h3><h3 class="match-score">${match.intHomeScore} - ${match.intAwayScore}</h3><h3> ${match.strAwayTeam}</h3><img src="${awayLogo}" class="match-logo">
            </div>
            <hr>
            <div class="match-details">
              <p>${match.dateEvent}</p><p>${stadium}</p><p>${match.strLeague}</p>
            </div>
          </div>`
      }
    
  } else{
    document.getElementById("error-msg").innerHTML = "Selected teams have not played together or were named unproperly. Try again."
    document.querySelector(".match-animation").style.display = "block"
  }
}
}
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
function convertText(text) {
    const words = text.toLowerCase().split(' ');
    const formattedText = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_');
    return formattedText;
}

document.querySelector(".chooseButton").addEventListener("click",()=>{
    matches.fetchMatch();
})

