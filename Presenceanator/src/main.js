const DiscordRPC = require('discord-rpc');
var $ = require('jquery');

var started = false;
started = false;

startButton = document.getElementById('start_button');
clientId = document.getElementById('client_input').value;
details = document.getElementById('detail_input').value;
state = document.getElementById("state_input").value;
button1_label = document.getElementById("button_label");
button1_url = document.getElementById("button_url");

var confirmStart = false;
confirmStart = false;

var lines = 0;

var client = new DiscordRPC.Client({ transport: 'ipc' });

startButton.onclick = start;

//837340971284824144

function start() {

    if (started == true) { 
        stop(); 
        confirmStart = false;
        return; 
    }

    var clientId = document.getElementById('client_input').value;
    var details = document.getElementById('detail_input').value;
    var state = document.getElementById("state_input").value;
    var button1_label = document.getElementById("button_label").value;
    var button1_url = document.getElementById("button_url").value;

    if (!hasLetters(clientId)) {
        updateConsole('You must have an "Application ID"', 1);
        confirmStart = false;
        return;
    }

    if (!hasLetters(button1_label) && hasLetters(button1_url) && !confirmStart) {
        confirmStart = true;
        updateConsole('There is something in "Button Url" but not in "Button Label", press start again to confirm that you ACTUALLY want to start.', 2)
        return;
    }

    if (confirmStart) {
        confirmStart = false;
    }

    started = true;
    startButton.innerHTML = "Stop";

    var elapsedTime = $("#formCheck-1").is(":checked");
    const startTimestamp = new Date();

    client = new DiscordRPC.Client({ transport: 'ipc' });

    client.on('ready', () => {

        if (!hasLetters(state)) state = undefined;
        if (!hasLetters(details)) details = undefined;
        if (!hasLetters(button1_label)) button1_label = undefined;
        if (!hasLetters(button1_url)) button1_url = undefined;
        if (!elapsedTime) startTimestamp = undefined;

        client.setActivity({
            largeImageKey: 'test',
            details: details,
            state: state,
            buttons: [{label: button1_label, url: button1_url}],
            startTimestamp
        });

        updateConsole('Signed in as "' + client.user.username + '"', 1);
    });

    client.login({ clientId: clientId });
}

function stop() {
    started = false;
    startButton.innerHTML = "Start";
    client.clearActivity();
    updateConsole('Stopped', 1);
}

function updateConsole(added, addedLines) {
    output = document.getElementById("console_logs");

    if (lines >= 21 || lines + addedLines >= 21)  { 
        output.innerHTML = ""; lines = 0; 
    }

    lines = lines + addedLines;

    if (output.innerHTML == "") output.innerHTML = added;
    else output.innerHTML = output.innerHTML + "<br>" + added;
}

function hasLetters(stringToCheck) {
    if (stringToCheck.innerHTML == "" || !stringToCheck.replace(/\s/g, '').length) return false;
    else return true;
}

function checkLines(string) {
    var lines = string.split(/<br\/?>/)
    return lines.length;
}
