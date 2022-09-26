function onLoad(){
    // pour récuper les paramètres de url
    let href = window.location.href;
    let url = new URL(href);

    let agentId = url.searchParams.get('agentid');
    let readOnly = url.searchParams.get('readonly');

    if (agentId === null){
        console.log("agentId manquant");
        return;
    }    
    if (readOnly === null){
        console.log("readonly manquant");
        return;
    }

    console.log("Création de l'agent");
    let monagent = new Agent(agentId, "demo", "demo", 
    "ifrramebattlefx",8000,"mqtt.jusdeliens.com",4,readOnly);

}

document.addEventListener("DOMContentLoaded", onLoad);