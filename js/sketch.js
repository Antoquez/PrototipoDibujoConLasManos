let video;
let handPose;
let hands = [];
let painting;
let px=0;
let py=0;

function preload() {
    handPose = ml5.handPose({ flipped: true });
}

function gotHands(results) {
    hands = results;
}

function setup() {
    createCanvas(640, 480);
    painting = createGraphics(640,480);
    painting.clear()
    video = createCapture(VIDEO, { flipped: true });
    video.hide();
    handPose.detectStart(video, gotHands);
}

function draw() {
    image(video, 0, 0)
    if (hands.length > 0) {
        let hand = hands[0];
        let index = hand.index_finger_tip;
        let thumb = hand.thumb_tip;
        let d = dist(index.x,index.y,thumb.x,thumb.y);
        let x = (index.x+thumb.x)*0.5;
        let y = (index.y+thumb.y)*0.5;

        if(d<25){
            painting.stroke(0,0,0);
            painting.strokeWeight(8);
            painting.line(px,py,x,y);
        }
        px=x;
        py=y;
    }
    image(painting,0,0)
}
