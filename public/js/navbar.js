const navbarsocket = io();
navbarsocket.on('pseudo', setpseudo)


$(() => {
    navbarsocket.emit("askpseudo");
})

function setpseudo(pseudo){
    document.getElementById('pseudo').innerHTML = "Pseudo: " + pseudo;
}
