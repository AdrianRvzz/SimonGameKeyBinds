let playerAlive = true;

colores = ["green", "red", "yellow", "blue"];

secuencia = [];
secuenciaUser=[];
let difficulty=50
let volume = 0.05; 
$(".btn").click(handleClickButton);

const volumeInput = document.getElementById("volumeInput");
const volumeOnIcon = document.getElementById("volumeOn");
const volumeOffIcon = document.getElementById("volumeOff");


const difficultyInput = document.getElementById("difficultyInput");
const difficultyValue = document.getElementById("difficultyValue");

const getDifficultyWord = (value) => {
    if (value == 5) return "Super Hardcore";
    if (value >= 6 && value <= 305) return "Difícil";
    if (value >= 306 && value <= 605) return "Relativamente Difícil";
    if (value >= 606 && value <= 905) return "Moderado";
    if (value >= 906 && value <= 1205) return "Fácil";
    if (value >= 1206 && value <= 1500) return "Muy Fácil";
    if (value === "1500") return "Extremadamente Fácil";
    return value; 
};


volumeInput.addEventListener("input", function() {
    const volumeValue = parseFloat(volumeInput.value);
    volume = volumeValue
    if (volumeValue === 0) {
        volumeOnIcon.style.display = "none";  
        volumeOffIcon.style.display = "inline"; 
    } else {
        volumeOnIcon.style.display = "inline"; 
        volumeOffIcon.style.display = "none";  
    }
});

difficultyInput.addEventListener("input", function() {
    const invertedValue = difficultyInput.max - difficultyInput.value + parseInt(difficultyInput.min);
    difficulty = invertedValue; // Invertir el valor para que los valores más altos sean más difíciles
    difficultyValue.textContent = getDifficultyWord(difficulty);
});

difficultyValue.textContent = getDifficultyWord(difficultyInput.value);

$(document).keydown(function (e) {
    if(playerAlive==false){
        $(".btn").fadeIn();
        playerAlive=true
        if($('.score')){
            $(".score").remove()
        }
        handleSequence(secuencia)
        $("#level-title").text("Level "+secuencia.length);
    }
    if ((e.key === "a" || e.key==="A")  && secuencia.length==0) {
        handleSequence(secuencia)
        $("#level-title").text("Level "+secuencia.length);
    }
    else{
        if (e.key === "w" || e.key === "W") {
            handleColorSelection("green");
          } else if (e.key === "e" || e.key === "E") {
            handleColorSelection("red");
          } else if (e.key === "s" || e.key === "S") {
            handleColorSelection("yellow");
          } else if (e.key === "d" || e.key === "D") {
            handleColorSelection("blue");
          }
    }
           
 
});




function handleSequence(secuencia) {
    secuenciaUser=[]
    indexOfColor = Math.floor(Math.random() * colores.length);
    secuencia.push(colores[indexOfColor]);
    let animationDuration = Math.max(difficulty, 50)
   
    setTimeout(function () {
        $("." + colores[indexOfColor]).addClass("pressed");
        playSound(colores[indexOfColor])
    }, animationDuration);
    //$("." + colores[indexOfColor]).addClass("pressed");
    setTimeout(function () {
        $("." + colores[indexOfColor]).removeClass("pressed");
    }, animationDuration+250);

    
    //console.log("Secuencia: " +secuencia)
    handleTitle("Level "+secuencia.length)
  
}

function handleClickButton() {
    
    switch (this.id) {
        case "green":
            handleColorSelection("green")
            break;
        case "red":
            handleColorSelection("red")
        break;
    
        case "yellow":
            handleColorSelection("yellow")
        break;
    
        case "blue":
            handleColorSelection("blue")
        break;

        default:
            break;
    }
  
}

let index=-1
function handleColorSelection(color){
    if(playerAlive){

        index++;
        //console.log("Num "+(index+1))
       
        if(secuenciaUser.length<secuencia.length){
            secuenciaUser.push(color)
    
            //console.log(color)
    
    
    
            $("."+color).addClass("clicked")
            playSound(color)
            setTimeout(()=>{
                $("."+color).removeClass("clicked")
            }, 100)
    
    
    
            //console.log(secuenciaUser)
            if(secuenciaUser[index]==secuencia[index]){
                //
                
                //console.log("acerto en la posicion "+index)
                if(secuenciaUser.length==secuencia.length){
                    //console.log("Agregando una mas")
                    
                    handleSequence(secuencia)
                    
                    index=-1;
                }
            }
            else{
                gameOver()
                
            }
           
            
        }
}


    
    
}
function handleTitle(text){
    $("#level-title").text(text);
}
function playSound(color) {
    let sound;
    switch (color) {
        case "green":
            sound = new Audio("sounds/green.mp3");
            break;
        case "blue":
            sound = new Audio("sounds/blue.mp3");
            break;
        case "red":
            sound = new Audio("sounds/red.mp3");
            break;
        case "yellow":
            sound = new Audio("sounds/yellow.mp3");
            break;
        case "wrong":
            sound = new Audio("sounds/wrong.mp3");
            volume = Math.min(volume, 0.015);
            break;
        default:
            return;
    }
    sound.volume = volume; 
    sound.play();
}


function gameOver(){
    
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},500)
    handleTitle("Game Over, Press Any Key To Start")
    $("#level-title").append("<h2 id='level-title' class='score'>Score:"+secuencia.length +"</h2>");
    $(".btn").fadeOut();
    playerAlive=false
    secuenciaUser=[]
    secuencia=[]
   
}
