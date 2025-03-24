// script.js

// Function to display the current time and update it every second
function displayCurrentTime() {
    const timeDisplay = document.getElementById("timeDisplay");
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.innerText = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

// Call the displayCurrentTime function on page load
displayCurrentTime();

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    if (taskInput && startTime && endTime) {
        const taskList = document.getElementById("taskList");

        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "complete-checkbox";

        const taskDetails = document.createElement("div");
        taskDetails.className = "task-details";
        taskDetails.innerHTML = `
            <strong>${taskInput}</strong>
            <p>Start: ${startTime}, End: ${endTime}</p>
            <p class="timer">Time Remaining: <span id="timer${taskInput}">Calculating...</span></p>
        `;

        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                taskDiv.style.textDecoration = "line-through";
                taskDiv.style.opacity = "0.6";
            } else {
                taskDiv.style.textDecoration = "none";
                taskDiv.style.opacity = "1";
            }
        });

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskDetails);
        taskList.appendChild(taskDiv);

        startTimer(endTime, `timer${taskInput}`);

        document.getElementById("taskInput").value = "";
        document.getElementById("startTime").value = "";
        document.getElementById("endTime").value = "";
    }
}

function startTimer(endTime, timerId) {
    const end = new Date();
    const [hours, minutes] = endTime.split(":");
    end.setHours(hours, minutes, 0);

    function updateTimer() {
        const now = new Date();
        const timeRemaining = end - now;

        if (timeRemaining <= 0) {
            document.getElementById(timerId).innerText = "Time's up!";
            return;
        }

        const hoursLeft = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutesLeft = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const secondsLeft = Math.floor((timeRemaining / 1000) % 60);

        document.getElementById(timerId).innerText = `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    }

    setInterval(updateTimer, 1000);
}
