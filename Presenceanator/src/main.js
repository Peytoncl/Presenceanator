const DiscordRPC = require('discord-rpc');
var $ = require('jquery');
var started = false;
started = false;
startButton = document.getElementById('start_button');
clientId = document.getElementById('client_input').value;
details = document.getElementById('detail_input').value;
startButton.onclick = start;
var client = new DiscordRPC.Client({ transport: 'ipc' });

function start() {

    if (started == true) { 
        stop(); 
        return; 
    }

    started = true;
    startButton.innerHTML = "Stop";

    var clientId = document.getElementById('client_input').value;
    var details = document.getElementById('detail_input').value;
    var elapsedTime = $("#formCheck-1").is(":checked");
    const startTimestamp = new Date();

    client = new DiscordRPC.Client({ transport: 'ipc' });

    client.on('ready', () => {
        if (elapsedTime == true) {
            client.setActivity({
                largeImageKey: 'test',
                details: details,
                startTimestamp
            });
        }
        else {
            client.setActivity({
                largeImageKey: 'test',
                details: details
            });
        }
        updateConsole('Signed in as "' + client.user.username + '"');
    });

    client.login({ clientId: clientId });
}

function stop() {
    started = false;
    startButton.innerHTML = "Start";
    client.clearActivity();
    updateConsole('Stopped');
}

function updateConsole(added) {
    output = document.getElementById("console_logs");
    console.log(checkLines(output.innerHTML));

    if (checkLines(output.innerHTML) == 21) {
        output.innerHTML = "";
    }

    if (output.innerHTML == "") {
        output.innerHTML = added;
    }
    else {
        output.innerHTML = output.innerHTML + "<br>" + added;
    }
}

function checkLines(string) {
    var lines = string.split(/<br\/?>/)
    return lines.length;
}
