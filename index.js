// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const button = document.getElementById("fetch-alerts");
const input = document.getElementById("state-input");
const alertsDisplay = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");


//  Fetch Alerts
function fetchWeatherAlerts(state) {
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch weather alerts");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // required for testing
            displayAlerts(data);
            clearUI();
        })
        .catch(error => {
            console.log(error.message); // required for testing
            displayError(error.message);
        });
}


// Display Alerts
function displayAlerts(data) {
    alertsDisplay.innerHTML = "";

    const alerts = data.features;


    const summary = document.createElement("h2");
    summary.textContent = `Weather Alerts: ${alerts.length}`;
    alertsDisplay.appendChild(summary);

    const ul = document.createElement("ul");

    alerts.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    });

    alertsDisplay.appendChild(ul);
}


//  Clear & Reset UI
function clearUI() {
    input.value = "";
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
}


// Error Handling
function displayError(message) {
    alertsDisplay.innerHTML = "";
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}


// Event Listener
button.addEventListener("click", () => {
    const state = input.value.trim();

    if (state === "") {
        displayError("Please enter a state abbreviation");
        return;
    }

    fetchWeatherAlerts(state);
});


// OPTIONAL: Press Enter to trigger fetch
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        button.click();
    }
});






