var tab = [];
var d1 = document.getElementById("druzyna1");
var d2 = document.getElementById("druzyna2");
var iloscZawodnikow = document.getElementById("iloscZawodnikow");
var resetButton = document.getElementById("reset");
iloscZawodnikow.value = 10;
var iloscDruzyn = document.getElementById("iloscDruzyn");
iloscDruzyn.value = 2;

function submit(){
    updateNumOfTeams();
    tab = [];
    iloscDruzyn.addEventListener("change", function() {
        updateNumOfTeams(); 
    });
    
    document.querySelectorAll(".zawodnik").forEach((zawodnik) => {
        tab.push(zawodnik.value || `Zawodnik ${tab.length + 1}`);
    });

    shuffle(tab);

    let liczbaDruzyn = parseInt(iloscDruzyn.value);
    let druzyny = document.querySelectorAll("#wynik .t");

    druzyny.forEach((druzyna, index) => {
        druzyna.innerHTML = `Drużyna ${index + 1}:<br>`;
    });

    for (let i = 0; i < liczbaDruzyn; i++) {
        let druzynaDiv = document.getElementById(`druzyna${i+1}`);
        if (druzynaDiv) {
            druzynaDiv.innerHTML = `Drużyna ${i+1}:<br>`;
        }
    }

    tab.forEach((player, i) => {
        let teamIndex = i % liczbaDruzyn;
        druzyny[teamIndex].innerHTML += `<h3>${player}</h3>`;
    });

}

function reset(){
    d1.innerHTML = "Drużyna 1:";
    d2.innerHTML = "Drużyna 2:";

    iloscZawodnikow.value = 10;
    iloscDruzyn.value = 2;
    updateNumOfPlayers();
    updateNumOfTeams();
    tab = [];
}

function savePlayerData(){
    const players = [];
    document.querySelectorAll(".zawodnik").forEach((input) => {
        players.push(input.value || "");
    });
    localStorage.setItem("players", JSON.stringify(players));
}

function loadPlayerData(){
    const savedPlayers = JSON.parse(localStorage.getItem("players"));
    if(savedPlayers){
        iloscZawodnikow.value = 10;
        updateNumOfPlayers();
        document.querySelectorAll(".zawodnik").forEach((input, index) => {
            input.value = savedPlayers[index] || "";
        });
    }else{
        updateNumOfPlayers(); 
    }
}

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateNumOfPlayers(){
    var zawodnicy = document.getElementById("zawodnicy");
    zawodnicy.innerHTML = "";
    for (var i = 0; i < iloscZawodnikow.value; i++) {
        zawodnicy.innerHTML += `<input type="text" class="zawodnik" placeholder="Zawodnik ${i + 1}"><br>`;
    }

    document.querySelectorAll(".zawodnik").forEach((input, index, inputs) => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (index < inputs.length - 1){
                    inputs[index + 1].focus();
                } else {
                    submit();
                    input.blur();
                }
            }

            if (event.key === "Backspace"){
                if (!input.value && index > 0) { 
                    event.preventDefault();
                    inputs[index - 1].focus();
                }
            }
        });
    });
}

updateNumOfPlayers();

iloscZawodnikow.addEventListener("change", updateNumOfPlayers);

document.addEventListener("input", savePlayerData);

window.addEventListener("load", loadPlayerData);

/*------------------*/

function saveTeamData(){
    const teams = [];
    document.querySelectorAll("#wynik").forEach((input) => {
        teams.push(input.value || "");
    });
    localStorage.setItem("teams", JSON.stringify(teams));
}

function loadTeamData(){
    const savedTeam = JSON.parse(localStorage.getItem("teams"));
    if(savedTeam){
        iloscDruzyn.value = 2;
        updateNumOfTeams();
        document.querySelectorAll("#wynik").forEach((input, index) => {
            input.value = savedTeam[index] || "";
        });
    }else{
        updateNumOfTeams(); 
    }
}

function updateNumOfTeams(){
    let dr = document.getElementById("wynik");
    dr.innerHTML = "";

    for (let i = 0; i < iloscDruzyn.value; i++) {
        let teamDiv = document.createElement("div");
        teamDiv.id = `druzyna${i + 1}`;
        teamDiv.classList.add("t");
        teamDiv.innerHTML = `Drużyna ${i + 1}:<br>`;
        dr.appendChild(teamDiv);
    }

    document.querySelectorAll("#wynik").forEach((input, index, inputs) => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (index < inputs.length - 1){
                    inputs[index + 1].focus();
                } else {
                    submit();
                    input.blur();
                }
            }

            if (event.key === "Backspace"){
                if (!input.value && index > 0) { 
                    event.preventDefault();
                    inputs[index - 1].focus();
                }
            }
        });
    });
}

updateNumOfTeams();

iloscDruzyn.addEventListener("change", updateNumOfTeams);

document.addEventListener("input", saveTeamData);

window.addEventListener("load", loadTeamData);
