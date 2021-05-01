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

    if (!validURL(button1_url)) {
        updateConsole('"Button Url" is not a valid URL, and therefor will not work.');
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

        if (hasLetters(button1_url)) {
            if (elapsedTime) {
                client.setActivity({
                    largeImageKey: 'test',
                    details: details,
                    state: state,
                    buttons: [{label: button1_label, url: button1_url}],
                    startTimestamp
                });
            }
            else {
                client.setActivity({
                    largeImageKey: 'test',
                    details: details,
                    state: state,
                    buttons: [{label: button1_label, url: button1_url}],
                });
            }
        }
        else {
            if (elapsedTime) {
                client.setActivity({
                    largeImageKey: 'test',
                    details: details,
                    state: state,
                    startTimestamp
                });
            }
            else {
                client.setActivity({
                    largeImageKey: 'test',
                    details: details,
                    state: state,
                });
            }
        }

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

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
