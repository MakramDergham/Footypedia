teams = {
     fetchTeams: function(){
        teamName = convertText(document.getElementById("team-request").value)
        console.log(teamName)
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamName}`)
        .then(response => response.json())
        .then(data =>{console.log(data); this.displayTeam(data)})
     },
     displayTeam: function(data){
        let teamContainer = document.getElementById("team-container")
        teamContainer.innerHTML = ""
        if(data.teams !== null){
            let team = data.teams[0]
            let container = document.getElementById("team-container")
            container.innerHTML = `
            <div id="main-info">
              <img src="${team.strTeamBadge}" alt="${team.strTeam} logo">
              <div id="team-info">
                <h3>${team.strTeam}</h3>
                <p>League: ${team.strLeague}</p>
                <p>Formed: ${team.intFormedYear}</p>
                <p>Stadium: ${team.strStadium}</p>
                <p>Stadium Capacity: ${team.intStadiumCapacity}</p>
              </div>
            </div>
            <div id="description">
              <h3>Team description</h3>
              <p>${team.strDescriptionEN}</p>
            </div>
            <div>
              <h3>Stadium Description</h3>
              <p>${team.strStadiumDescription}</p>
            </div>
            <h3>Media</h3>
            <div class="media">
               <img src="${team.strStadiumThumb}" alt="${team.strStadium}" class="media-image"></img>
               <img src="${team.strTeamFanart1}" alt="Fanart" class="media-image"></img>
               <img src="${team.strTeamFanart2}" alt="Fanart" class="media-image"></img>
            </div>`
            

        }else{
            let container = document.getElementById("team-container")
            container.innerHTML = '<p style="color:red; text-align:center">Please select a valid team'
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


  const teamInput = document.getElementById("popup-team");
  const chooseButton = document.getElementById("popup-btn");
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
        searchTeam(favTeamInput, data);
      })
      
  }
});

function searchTeam(teamName, data) {
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
        document.getElementById("popup").style.display = "none";
        location.reload()
      }
}

if(!localStorage.getItem("favTeam") && !localStorage.getItem("searchedTeam")){
  document.getElementById("popup").style.display = "flex";
}

document.getElementById("team-btn").addEventListener("click", ()=>{
    teams.fetchTeams()
})

function convertText(text) {
    const words = text.toLowerCase().split(' ');
    const formattedText = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_');
    return formattedText;
}

if(localStorage.getItem('searchedTeam')){
  document.getElementById("team-request").value =localStorage.getItem('searchedTeam');
  teams.fetchTeams();
  window.scrollTo({
    top: 1000,
    behavior: 'smooth'
  });
  setTimeout(()=>{
    localStorage.removeItem('searchedTeam');
  },1000)
} else if(localStorage.getItem('favTeam')){
    document.getElementById("team-request").value = JSON.parse(localStorage.getItem('favTeam')).strTeam;
    teams.fetchTeams();
}