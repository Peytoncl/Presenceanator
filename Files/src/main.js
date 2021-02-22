const DiscordRPC = require('discord-rpc');
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
    });

    client.login({ clientId: clientId });
}
