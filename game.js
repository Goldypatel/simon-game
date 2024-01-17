var buttoncolors = ["red", "blue", "green", "yellow"]; 
var gamepattern = [];
var userClickedPattern =[];

var started=false;
var level=0;

function playsound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();    
}

function animatepress(currentcolor){
            $(".btn").on('click', function () {
            $(this).addClass('pressed');

            setTimeout(function(){
                $(".btn").removeClass('pressed');
            }, 100);
 
    
        });
    }

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("level "+ level);
        nextsequence();
        started = true;
    }
});

$('.btn').click(function(){
    var userchosencolor = $(this).attr('id');
    userClickedPattern.push(userchosencolor);

    playsound(userchosencolor);
    animatepress(userchosencolor);
    checkanswer(userClickedPattern.length-1);
});
 


function checkanswer(currentlevel){
    if (gamepattern[currentlevel]===userClickedPattern[currentlevel]){
        console.log("success");
        if(userClickedPattern.length===gamepattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
            
        }
    }
    else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("press any key to start restart");
        startover();
    }

    console.log(gamepattern);
    console.log(userClickedPattern);
}



function nextsequence(){
    userClickedPattern=[];
    level++;

    $("#level-title").text("level "+ level); 

    var randomnumber=Math.floor(Math.random() *4);
    var randomchosencolor = buttoncolors[randomnumber];
    gamepattern.push(randomchosencolor);


    $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomchosencolor);  
    animatepress(randomchosencolor);
}

function startover(){
    level=0;
    gamepattern=[];
    started=false;

    $(document).keypress(function(){
        if (!started){
            $("#level-title").text("level "+ level);
            nextsequence();
            started = true;
        }
    });
}



 
