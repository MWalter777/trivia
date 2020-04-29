
/*
** Variables globales
*/

let username = ""
let user_valid = false
let tipo = 0
let dificultad = 0
let ver_resultado = false
let ver_respuesta = true
let elemento_actual = 0
let total = 0
let correctas = 0, incorrectas = 0
let tiempo_total=20, time= 0
let elemento_evaluar = {numero:0, nombre:"None", simbolo:"NAN", posicion_correcta : 0}


function validar(){
    if(tipo!=0 && dificultad!=0){
        if(total<20){
            if(document.getElementById("opcion"+elemento_evaluar.posicion_correcta).checked){
                console.log("Correcto")
                correctas++
            }else{
                console.log("Incorrecto")
                incorrectas++
            }
            total++
            document.getElementById("restantes").textContent=total+"/20"
            if(ver_respuesta){
                document.getElementById("respuesta").textContent = "Simbolo: "+elemento_evaluar.simbolo
                document.getElementById("respuesta1").textContent = "Nombre: "+elemento_evaluar.nombre
                document.getElementById("respuesta2").textContent = "Numero Atomico: "+elemento_evaluar.numero
            }
            empezarJuego()
        }else{
            document.getElementById("juego").style="display:none"
            document.getElementById("resultados_finales").style="display:flex"
            if(correctas>10){
                document.getElementById("total_correctas").textContent="Felicidades, tienes "+correctas+" respuestas correctas y tan solo "+incorrectas+" incorrectas"
            }else{
                document.getElementById("total_correctas").textContent="Sigue intentandolo, tienes "+correctas+" respuestas correctas y "+incorrectas+" incorrectas"
            }
        }
    }else{
        alert("Primero debes darle \"Jugar\" al boton")
    }
    document.getElementById("opcion1").checked=false
    document.getElementById("opcion2").checked=false
    if(tipo==1){
        document.getElementById("opcion3").checked=false
        document.getElementById("opcion4").checked=false
    }
    if(ver_resultado){
        document.getElementById("res_correctas").textContent = "Correctas: "+correctas
        document.getElementById("res_incorrectas").textContent = "Inocorrectas: "+incorrectas
    }
}

function empezar(){
    if(document.getElementById("tipo1").checked){
        tipo=1
    }
    if(document.getElementById("tipo2").checked){
        tipo=2
    }
    if(document.getElementById("tipo3").checked){
        tipo=parseInt(Math.floor(Math.random()* 2 + 1))
    }
    if(document.getElementById("dificultad1").checked){
        dificultad=1
        elementos.splice(40)
    }
    if(document.getElementById("dificultad2").checked){
        dificultad=2
        elementos.splice(80)
        tiempo_total = 15
    }
    if(document.getElementById("dificultad3").checked){
        dificultad=3
        tiempo_total = 10
    }
    if(tipo==2){
        document.getElementById("option3").remove()
        document.getElementById("option4").remove()
    }
    time = tiempo_total
    ver_resultado = document.getElementById("ver_resultado").checked
    ver_respuesta = document.getElementById("ver_respuesta").checked
    if(tipo!=0 && dificultad!=0){
        empezarJuego()
        gestionar_tiempo()
    }
    else
    alert("tienes que seleccionar un modo de juego")
}


function empezarJuego(){
    elemento_actual = getNumber()
    let element = elementos[elemento_actual]
    if(tipo==1){
        elemento_evaluar.numero = element[0]
        elemento_evaluar.nombre = element[1]
        elemento_evaluar.simbolo = element[2]
        let pos = getPosition()
        let option = "option_"+ pos
        if(dificultad>2){
            elemento_evaluar.posicion_correcta = pos
            for(let i=1;i<5;i++){
                let aux_option = "option_"+ i
                let num = getNumber()
                while(num == elemento_actual){
                    num = getNumber()
                }
                if(pos!=i)
                document.getElementById(aux_option).textContent = elementos[num][1]
            }
            document.getElementById(option).textContent = elemento_evaluar.nombre
        }else{
            elemento_evaluar.posicion_correcta = pos
            for(let i=1;i<5;i++){
                let aux_option = "option_"+ i
                let num = getNumber()
                while(num == elemento_actual){
                    num = getNumber()
                }
                if(pos!=i)
                document.getElementById(aux_option).textContent = elementos[num][2]
            }
            document.getElementById(option).textContent = elemento_evaluar.simbolo
        }
    } 
    if(tipo==2){
        elemento_evaluar.numero = element[0]
        elemento_evaluar.nombre = element[1]
        elemento_evaluar.simbolo = element[2]
        document.getElementById("option_1").textContent = "Verdadero"
        document.getElementById("option_2").textContent = "Falso"
        if(Math.random()<0.7){
            document.getElementById("res").textContent = elementos[getNumber()][2]
            elemento_evaluar.posicion_correcta = 2
        }else{
            document.getElementById("res").textContent = elemento_evaluar.simbolo
            elemento_evaluar.posicion_correcta = 1
        }
    } 
    if(dificultad>2 && tipo==1){
        document.getElementById("pregunta").textContent =" "+ elemento_evaluar.simbolo+" pertenece al elemento: "
    }
    else{
        document.getElementById("pregunta").textContent =" del "+elemento_evaluar.nombre +" es: "
    }
    tiempo_total = time
    document.getElementById("tiempo").textContent = "0:"+tiempo_total+"s"
    console.log(elemento_evaluar)
    elementos.splice(elemento_actual,1)
    disable_button()
}

function gestionar_tiempo() {
    setInterval(cronometro, 1000);
}

function cronometro() {
    tiempo_total--
    if(tiempo_total>=0){
        document.getElementById("tiempo").textContent = "0:"+tiempo_total+"s"
    }else{
        validar()
        //document.getElementById("siguiente").innerHTML="Mostrar Resultados"
    }
}


function disable_button() {
    botones = document.querySelectorAll("button")
    for(let i=0; i<botones.length;i++){
        if(botones[i].innerHTML != "Siguiente" && botones[i].innerHTML != "Volver a jugar")
        botones[i].disabled=true;
    }
}

function getNumber() {
    return parseInt(Math.floor(Math.random() * elementos.length - 1))
}

function getPosition() {
    return parseInt(Math.floor(Math.random() * 4 + 1))
}

function iniciar_juego() {
    username = document.getElementById("username").value.trim()
    if(username==null || username == ""){
        document.getElementById("ingresar_username").textContent = "Debe ingresar un nombre de usuario para continuar"
    }else{
        document.getElementById("ingresar_username").textContent = ""
        document.getElementById("user").textContent = username
        document.getElementById("juego").style="display:flex"
        document.getElementById("informacion").style="display:none"
        user_valid = true
    }
}


