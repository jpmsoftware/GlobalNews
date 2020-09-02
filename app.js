
var desplegado = false;
const settingsBody = document.getElementById('settings-body');

let map;

window.onclick = function (e) {
    switch (e.target.id) {
        case 'settings-header':
        case 'icon-settings':
        case 'heading':
            if (!desplegado) { openSettings(); }
            else { closeSettings(); }
            break;
    }
}

function loadMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: -50 },
        zoom: 3
    });
    map.setOptions({
        zoomControl: false,
        scrollwheel: false
    })

    //load markers
    fetch('markers.json')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data.length);
            for(var i = 0; i < data.length; i++) {
                var marker = new google.maps.Marker({
                    position: data[i].position,
                    map: map,
                    title: data[i].name
                });
            }
        });    
}

function openSettings() {
    settingsBody.classList.add('opened');
    settingsBody.classList.remove('closed');
    desplegado = true;
}

function closeSettings() {
    settingsBody.classList.add('closed');
    setTimeout(() => {
        settingsBody.classList.remove('opened');
    }, 500);
    desplegado = false;
}