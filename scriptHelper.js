// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
        let missionTarget = document.getElementById('missionTarget');
        missionTarget.innerHTML = `
                    <h2>Mission Destination</h2>
                    <ol>
                        <li>Name: ${name}</li>
                        <li>Diameter: ${diameter} </li>
                        <li>Star: ${star}</li>
                        <li>Distance from Earth: ${distance}</li>
                        <li>Number of Moons: ${moons}</li>
                    </ol>
                    <img src='${imageUrl}'>
                    `
}

function validateInput(testInput) { 

        if (testInput === ""){
            return `Empty`;
            } else if (isNaN(testInput)){
                return `Not a Number`;
                } else {
                    return `Is a Number`;
                    };
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    const fuelStatus = document.getElementById('fuelStatus');
    const cargoStatus = document.getElementById('cargoStatus');
    const pilotStatus = document.getElementById('pilotStatus');
    const copilotStatus = document.getElementById('copilotStatus');
    const lauchStatus = document.getElementById('launchStatus');

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All Fields Must Be Filled");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number"){
        alert("Pilot and Copilot must be a word");
        } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
            alert("Fuel and Cargo Levels must be a number");
            } else {
                list.style.visibility = "visible";
                pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
                copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            };
    
    if (Number(fuelLevel) < 10000){
        fuelStatus.style.color = "rgb(199, 37, 78)";
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        lauchStatus.innerHTML = `Shuttle Not Ready For Launch`;
        } else if (Number(cargoLevel) > 10000){
            cargoStatus.style.color = "rgb(199, 37, 78)";
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`; 
            lauchStatus.innerHTML = `Shuttle Not Ready For Launch`; 
            } else if ((Number(fuelLevel)) >= 10000 && (Number(cargoLevel)) <= 10000){
                fuelStatus.innerHTML = `Fuel level high enough for launch`;
                fuelStatus.style.color = "rgb(65, 159, 106)";
                cargoStatus.innerHTML = `Cargo mass low enough for launch`;
                cargoStatus.style.color = "rgb(65, 159, 106)";
                lauchStatus.innerHTML = `Shuttle is Ready For Launch`;
            };
};

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json()    
        });
    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random() * planets.length);
    return planets[randomPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
