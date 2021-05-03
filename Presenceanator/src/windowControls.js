const remote = require('electron').remote;
const electron = require("electron");
var { application } = require('electron');
const win = remote.getCurrentWindow();
const path = require('path');

const Tray = remote.Tray;
const iconPath = path.join(__dirname, 'presenceanator_logo.png');

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => {
    win.removeAllListeners();
}

function handleWindowControls() {
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.hide();
        
        var contextMenu = [
            {
                label: "Show",
                click: function(){
                    win.show();
                    newTray.destroy();
                }
            },
            {
                label: "Quit",
                click: function(){
                    win.destroy();
                }
            }
        ];
        let newTray = new Tray(iconPath);
        const ctxMenu = remote.Menu.buildFromTemplate(contextMenu);
        newTray.setContextMenu(ctxMenu);

        newTray.on('click', function(e) {
            win.show();
            newTray.destroy();
        });
    });

    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}