var modeAuto = false;
var tirEtat = false;
var ammoMax = 10;
var vieMax = 0;

// function random nombre
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onAgentUpdate (agent){

    if(agent.ammo > ammoMax) {
        ammoMax = agent.ammo;
    }
    if(agent.life > vieMax){
        vieMax = agent.life;
    }

    // rotation de l'image
    if (agent.dir === 0){
        img = document.getElementById('batman').style.transform = 'rotate(-90deg)';
    }else if (agent.dir === 1){
        img = document.getElementById('batman').style.transform = 'rotate(0deg)';
    }else if (agent.dir === 2){
        img = document.getElementById('batman').style.transform = 'rotate(90deg)';
    }else if (agent.dir === 3){
        img = document.getElementById('batman').style.transform = 'rotate(180deg)';
    }

    // ModeAuto
    if (modeAuto === true){
        let dx = randomInt(-1,1);
        let dy = randomInt(-1,1);
        agent.move(dx, dy);
        agent.lookTo(randomInt(0,3));
        if(agent.d === 0){
            agent.fire(false);
        }else{
            agent.fire(true);
        }
    }

    var pourcentHp = (agent.life / vieMax)*100;
    let hp = document.getElementById("hp").innerHTML //Pourcentage rélié au HTML batman
    document.getElementById("hp").innerHTML = document.getElementById("hp").innerHTML.replace(hp,pourcentHp);
    objectJavascript = document.getElementById("hp");
    objectJavascript.style.width = pourcentHp + "%"; //Barre de vie descend lorsque le pourcentage est impacté par les tires

    var pourcentMp = (agent.ammo / ammoMax )*100;
    let mp = document.getElementById("mp").innerHTML //Pourcentage rélié au HTML batman
    document.getElementById("mp").innerHTML = document.getElementById("mp").innerHTML.replace(mp,agent.ammo);
    objectJavascript = document.getElementById("mp");
    objectJavascript.style.width = pourcentMp + "%"; //Barre de vie descend lorsque le pourcentage est impacté par les tires
}

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
    if (readOnly === "1"){
        readOnly = true;
    }else{
        readOnly = false;
    } 

    // si le button automatique est clicker
    const auto = document.querySelector("#btnAuto");
    const manette = document.querySelector("#manette");

    auto.addEventListener("click",function(e){
        manette.classList.toggle('close');
        modeAuto = !modeAuto;
    })

    console.log("Création de l'agent");
    let monAgent = new Agent(agentId, "demo", "demo", "iframebattlefx",8080,"mqtt.jusdeliens.com",2,readOnly);
    monAgent.connect();
    monAgent.executeOnUpdate(onAgentUpdate);

    // déplacement avec les button du site
    const haut = document.querySelector("#triangle-code");
    const gauche = document.querySelector("#triangle-code2");
    const droite = document.querySelector("#triangle-code3");
    const bas = document.querySelector("#triangle-code4");
    const tir = document.querySelector("#tir");

    haut.addEventListener("click",function(e){
        monAgent.move(0,-1);
    })
    gauche.addEventListener("click",function(e){
        monAgent.move(-1,0);
    })
    droite.addEventListener("click",function(e){
        monAgent.move(1,0);
    })
    bas.addEventListener("click",function(e){
        monAgent.move(0,1);
    })
    tir.addEventListener("click",function(e){
        tirEtat = !tirEtat;
        monAgent.fire(tirEtat);
    })
    
    // déplacement avec les touches du clavier
    document.addEventListener("keydown", function(event) {
        if (event.key == "ArrowLeft"){
            monAgent.move(-1,0); 
        } else if (event.key == "ArrowUp"){
            monAgent.move(0,-1); 
        } else if (event.key == "ArrowRight"){
            monAgent.move(1,0);
        } else if (event.key == "ArrowDown"){
            monAgent.move(0,1);
        } else if (event.key === "Enter"){
            tirEtat = !tirEtat;
            monAgent.fire(tirEtat);
        }
    });
}

document.addEventListener("DOMContentLoaded", onLoad);