var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
guiScale = 20;
minimapSize = 1024;
guioffset =512;
selectedSquareX=0;
selectedSquareY=0;
selectedTexture=1;

//images
const spritesheet = document.createElement("img");
spritesheet.src = "./textures/surfaces/lab.png";


let renderWidth = 2048-minimapSize-guioffset*2
let renderStartingPosition = minimapSize+guioffset*2
window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)}

//generate world map
var world = 
[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

const worldHeight = world.length;
const worldWidth = world[0].length;


//keyboard input handler
var heldKeys = [];
document.addEventListener('keydown', (event)=> 
{
    if(event.key=='ArrowDown')
    {
        selectedSquareY+=1
    }
    if(event.key=='ArrowUp')
    {
        selectedSquareY-=1
    }
    if(event.key=='ArrowRight')
    {
        selectedSquareX+=1
    }
    if(event.key=='ArrowLeft')
    {
        selectedSquareX-=1
    }
    if(event.key=='a')
    {
        selectedTexture-=1
    }
    if(event.key=='s')
    {
        selectedTexture+=1
    }
    if(event.key=='z')
    {
        world[selectedSquareY][selectedSquareX]=selectedTexture
    }
    if(event.key=='x')
    {
        world[selectedSquareY][selectedSquareX]=0
    }
    if(event.key=='t')
    {
        console.log(printm())
        }
})
var printm=()=>{
        let po="[[";
        for (let i=0;i<world.length;i++) {
            for (let j=0;j<world[i].length;j++) {
                po+=world[i][j];
                if(j<=world[i].length-2){po+=","}
            }
            po+="]"
            if(i<=world.length-2){po+=",["}
        }
        po+="]"
        return po;
}
var drawSky=()=>{    
ctx.fillStyle='Grey'
ctx.drawImage(sky,xoffset-2048,-900-yoffset,2048,2048)
ctx.drawImage(sky,xoffset,-900-yoffset,2048,2048)
ctx.drawImage(sky,2048+xoffset,-900-yoffset,2048,2048)
ctx.fillStyle='#140c07'
ctx.fillRect(renderStartingPosition, 512-yoffset, renderWidth, 2048)
}


var getMinimapPosition=(x)=>{
    return guioffset+(x)*(minimapSize/worldWidth);
}
var minimaptextures=['#571d07','#852c09','#222222','#333333','#444444','#555555','#666666','#777777','#888888','#999999']


function drawMiniMap()
{
    let ih=256;
    for (let y = 0; y < world.length; y++) {
        for (let x = 0; x < world[y].length; x++) {
            ctx.fillStyle = minimaptextures[world[x][y]]
            ctx.fillRect(guioffset+minimapSize/worldHeight*y,minimapSize/worldWidth*x,minimapSize/worldHeight,minimapSize/worldWidth);
            mapTexture = world[x][y]
            ctx.drawImage(spritesheet,-ih+mapTexture*ih,0,ih,ih,guioffset+minimapSize/worldHeight*y,minimapSize/worldWidth*x,minimapSize/worldHeight,minimapSize/worldWidth)
        }
    }
    ctx.drawImage(spritesheet,-ih+(selectedTexture-2)*ih,0,ih,ih,100,0,50,50) 
    ctx.drawImage(spritesheet,-ih+(selectedTexture-1)*ih,0,ih,ih,100,50,50,50) 
    ctx.drawImage(spritesheet,-ih+selectedTexture*ih,0,ih,ih,100,100,100,100)  
    ctx.fillStyle='White'
    ctx.fillText(selectedTexture, 50,50)
    ctx.drawImage(spritesheet,-ih+(selectedTexture+1)*ih,0,ih,ih,100,200,50,50) 
    ctx.drawImage(spritesheet,-ih+(selectedTexture+2)*ih,0,ih,ih,100,250,50,50) 
    ctx.fillStyle="Yellow"
    ctx.fillRect(guioffset+minimapSize/worldHeight*selectedSquareX,minimapSize/worldWidth*selectedSquareY,minimapSize/worldHeight,3);
    ctx.fillRect(guioffset+minimapSize/worldHeight*selectedSquareX,minimapSize/worldWidth*(selectedSquareY+1)-3,minimapSize/worldHeight,3);
}

//set values of stuff

vel = 0;


const gameTick =()=>{
    ctx.clearRect(0,0,2048,1024)
    drawMiniMap();
}

//game loop and frames
let msPrev = window.performance.now();
const fps = 1000/20;
function gameloop()
{
    window.requestAnimationFrame(gameloop);
    const msNow = window.performance.now();
    const msPassed = msNow-msPrev;
    if(msPassed<fps)return;
    const excessTime = msPassed % fps;
    msPrev = msNow - excessTime;
    gameTick();
}
  
gameloop()
