leagues = {
    fetchLeagues: function(){
        let leagueId = document.getElementById("select-league").value
        let season = document.getElementById("select-year").value
        fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueId}&s=${season}`)
        .then(response => response.json())
        .then(data => {console.log(data); this.showTable(data);})
    },
    showTable: function(data) {
        let {table} = data
        let leagueTable = document.getElementById("league-table")
        leagueTable.innerHTML = ""
        table.forEach(team=>{
            leagueTable.innerHTML += `<div class="table-row"><div class="l-logo"><img src="${team.strTeamBadge}"></div><p class="l-team-name" onclick="searchTeam('${team.strTeam}')">${team.intRank}. ${team.strTeam}</p><p class="stat">${team.intPlayed}</p><p class="stat">${team.intWin}</p><p class="stat">${team.intDraw}</p><p class="stat">${team.intLoss}</p><p class="stat">${team.intGoalsFor}</p><p class="stat">${team.intGoalsAgainst}</p><p class="stat">${team.intGoalDifference}</p><p class="stat">${team.intPoints}</p></div>`
        })
    }
}
leagues.fetchLeagues()
document.getElementById('search-button').addEventListener("click", ()=>{
    leagues.fetchLeagues()
})
window.addEventListener('load', function() {
  document.querySelector('.preloader').style.display = 'none';
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

function searchTeam(teamName) {
  localStorage.setItem("searchedTeam" , teamName)
  window.location.href = "teams.html"
}