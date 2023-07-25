let playerAlive = true;

colores = ["green", "red", "yellow", "blue"];

secuencia = [];
secuenciaUser=[];
difficulty=500

$(".btn").click(handleClickButton);


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
   
   
    setTimeout(function () {
        $("." + colores[indexOfColor]).addClass("pressed");
        playSound(colores[indexOfColor])
    }, difficulty);
    //$("." + colores[indexOfColor]).addClass("pressed");
    setTimeout(function () {
        $("." + colores[indexOfColor]).removeClass("pressed");
    }, difficulty+250);

    
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
    switch (color) {
        case "green":
            let greenSound = new Audio("sounds/green.mp3");
            greenSound.play();

            break;
        case "blue":
            let blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            break;

        case "red":
            let redSound = new Audio("sounds/red.mp3");
            redSound.play();
            break;

        case "yellow":
            let yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;

        case "wrong":
            let wrongSound = new Audio("sounds/wrong.mp3");
            wrongSound.volume=0.1
            wrongSound.play();
            break;

        default:
            break;
    }
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
