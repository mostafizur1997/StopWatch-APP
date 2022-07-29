$(function(){
//variable
var mode=0; //app 
var timeCounter=0;//timecounter
var lapCounter=0;//lapcounter
var action;//action
var lapNumber=0;//number of laps

//minutes, second, centisecond, for time and lap

var timeMinutes,timeSeconds, timeCentiseconds, lapMinutes,lapSeconds, lapCentiseconds;

//On app load show start and lap buttons
hideshowButtons("#startButton","#lapButton");

//click on the start button
$("#startButton").click(function(){
    // on the mode
    mode=1;
    // show startButton and lapButton
    hideshowButtons("#stopButton","#lapButton");
    //start counter
    startAction();
});

//click on the stopButton
$("#stopButton").click(function(){
    //show resume and reset button
    hideshowButtons("#resumeButton", "#resetButton");
    //stop counter
    clearInterval(action);
});

//click resumeButton
$("#resumeButton").click(function(){
    // show stopButton and lap button
    hideshowButtons("#stopButton","#lapButton");
    //startCounter
    startAction();
});

//click on lapButton
$("#resetButton").click(function(){
    //reload the page
    location.reload();
});

//click on lapButton
$("#lapButton").click(function(){
//if mode is on
    if(mode){
    //stop action
    clearInterval(action);
    //resetLap and print details    
    lapCounter=0;
    addLap();
    //start action
    startAction();

}
});


//mode on
//show startButton and lapButton
//start action


//function
function hideshowButtons(x,y){
    $(".control").hide();
    $(x).show();
    $(y).show();
}

//startAction function
function startAction(){
    action =setInterval(function(){
        timeCounter++;
        if(timeCounter==100*60*100){
            timeCounter=0;
        }
        lapCounter++;
        if(lapCounter==100*60*100)
        {
            lapCounter=0;
        }
        updateTime();
    },10);
}
//updateTime: converst counter to minute, second, centisecond

function updateTime(){
    // 1min =60*100=6000centiSecond
    timeMinutes=Math.floor(timeCounter/6000);
    // 1sec=100centiSecond
    timeSeconds=Math.floor((timeCounter%6000)/100);
    timeCentiseconds=(timeCounter%6000)%100;

    $("timeMinute").text(format(timeMinutes));
    $("timeSecond").text(format(timeSeconds));
    $("timeCentisecond").text(format(timeCentiseconds));

    // 1min =60*100=6000centiSecond
    lapMinutes=Math.floor(lapCounter/6000);
    // 1sec=100centiSecond
    lapSeconds=Math.floor((lapCounter%6000)/100);
    lapCentiseconds=(lapCounter%6000)%100;

    $("#lapMinute").text(format(lapMinutes));
    $("#lapSecond").text(format(lapSeconds));
    $("#lapCentisecond").text(format(lapCentiseconds));

}

//format number
function format(number){
    if(number<0){
        return '0'+number;
    }
    else{
        return number;
    }
}

//add lap function: print lap details and inside the lap
function addLap(){
    lapNumber++;
        var mylapDetails='<div class="lap">'+
        '<div class="lapTitle">'+'Lap'+lapNumber+'</div>'+

        '<div class="laptime">'+
        '<span>'+lapMinutes+'</span>'
        +':<span>'+lapSeconds+'</span>'
        +'<span>'+lapSeconds+'</span>'
        +'</div>'
    +'</div>';
    $(mylapDetails).prependTo("#laps");

}

});