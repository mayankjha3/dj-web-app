song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;



function preload(){
    song = loadSound('music.mp3');
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);

}

function draw(){
    image(video , 0 , 0 , 600 , 500);

    fill("#ff0000");
    stroke("#ff0000");

    circle(leftWristX , leftWristY , 20);

    number_leftWirstY = Number(leftWristY);

    remove_decimals = floor(number_leftWirstY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("model has loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("left wrist X " + leftWristX + " left wrist y " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("right wrist X " + rightWristX + " right wrist y " + rightWristY);
    }
}

