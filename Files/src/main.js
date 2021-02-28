const DiscordRPC = require('discord-rpc');
var $ = require('jquery');
startButton = document.getElementById('start_button');
clientId = document.getElementById('client_input').value;
details = document.getElementById('detail_input').value;
startButton.onclick = start;

function start() {
  clientId = document.getElementById('client_input').value;
  details = document.getElementById('detail_input').value;

    const client = new DiscordRPC.Client({ transport: 'ipc' });

    client.on('ready', () => {
        client.setActivity({
            largeImageKey: 'test',
            details: details
        });
        updateConsole('Signed in as "' + client.user.username + '"');
    });

    client.login({ clientId: clientId });
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
        output.innerHTML = output.innerHTML + "<br>/" + added;
    }
}

function checkLines(string) {
    var lines = string.split(/<br\/?>/)
    return lines.length;
}
