var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
guiScale = 20;
minimapSize = 0;
var yoffset = 0;
var xoffset = 0;
guioffset =0;
pi=Math.PI;
res=8;
va = 60;
handFrame=1;
movementBob=0;
var ryoffset = 0;
var cyoffset = 0;

var Entity = function(x,y){
    this.x = x;
    this.y = y;
}



var Thing = new Entity(4,4)

//sound effects
var gunshot = new Audio('gunshot.mp3');

//images
const sky = document.createElement("img");
sky.src = "./textures/sky.png";
const hand = document.createElement("img");
hand.src = "./textures/placeholderPistol.png";

const spritesheet = document.createElement("img");
spritesheet.src = "./textures/surfaces/lab.png";

const transparentBlocks = [50,51,5,53]


let renderWidth = 2048-minimapSize-guioffset*2
let renderStartingPosition = minimapSize+guioffset*2
window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)}

function circle(x,y,radius,color)
{
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(x,y,radius,0,pi*2,false);
    ctx.fill();
}

//generate world map
var world = 
[[25,25,25,28,25,25,25,28,25,25,25,28,25,25,25,28,25,25,25,28,25,25,25,28,25,25,25,28,25,25,25,28,25,25,25,28,25,25,25,28],[46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27],[6,25,25,28,25,53,25,28,25,53,25,28,25,53,25,28,25,53,25,28,26,53,26,28,26,53,26,28,26,53,26,28,26,53,26,28,26,53,26,28],[9,9,9,9,45,0,45,1,1,0,1,1,1,1,1,1,1,1,1,1,14,0,14,0,0,0,0,0,0,0,0,0,14,0,14,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,14,0,14,0,0,0,0,0,0,0,0,0,14,0,14,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,14,0,14,0,0,0,0,0,0,0,0,0,14,0,14,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,14,0,14,0,0,0,0,0,0,0,0,0,14,0,14,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,14,0,15,14,14,14,14,15,0,15,14,0,15,0,14,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,14,0,0,0,0,0,0,0,0,0,0,0,0,0,14,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,14,0,0,0,0,0,0,0,0,0,0,0,0,0,14,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,15,14,14,14,14,14,14,15,0,15,14,14,14,14,15,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0,16,1,1,1,1,1,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0,16,1,1,1,1,1,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0,16,1,1,1,1,1,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0,16,1,1,1,1,1,1,1,1,1,1],[9,0,0,9,45,0,45,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0,16,1,1,1,1,1,1,1,1,1,1],[9,0,0,9,38,0,38,39,39,39,39,38,39,39,39,39,38,39,39,39,39,38,39,1,1,1,1,16,0,16,1,1,1,1,1,1,1,1,1,1],[9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,39,41,41,41,41,16,0,16,1,1,1,1,1,1,1,1,1,1],[9,0,9,9,39,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,1,1,1,1,1,1,1,1,1,1],[3,0,3,3,39,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,39,41,41,41,41,16,0,16,1,1,1,1,1,1,1,1,1,1],[3,0,0,3,39,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,39,1,1,1,1,11,0,11,1,1,1,1,1,1,1,1,1,1],[3,3,0,3,39,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,39,1,1,1,1,10,0,10,1,1,1,1,1,1,1,1,1,1],[3,0,0,3,39,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,39,1,1,1,1,11,0,11,1,1,1,1,1,1,1,1,1,1],[3,0,3,3,39,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,39,1,1,1,1,10,0,10,1,1,1,1,1,1,1,1,1,1],[3,0,0,3,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38,1,1,1,1,11,0,11,1,1,1,1,1,1,1,1,1,1],[3,3,0,3,39,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,1,1,1,1,10,0,10,1,1,1,1,1,1,1,1,1,1],[3,0,0,3,39,39,38,39,39,39,39,38,39,39,39,39,38,39,39,39,39,38,45,1,1,1,1,11,0,11,1,1,1,1,1,1,1,1,1,1],[3,0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,0,10,1,1,1,1,1,1,1,1,1,1],[3,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,0,11,1,1,1,1,1,1,1,1,1,1],[3,3,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,0,10,1,1,1,1,1,1,1,1,1,1],[3,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,0,11,1,1,1,1,1,1,1,1,1,1],[3,0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,51,10,1,1,1,1,1,1,1,1,1,1],[3,0,0,3,34,34,34,34,34,34,34,34,34,34,34,1,1,1,1,1,1,1,1,1,1,1,1,28,0,28,1,1,1,1,0,0,1,1,1,1],[3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,34,1,1,1,1,1,1,1,1,1,1,1,28,0,28,1,1,1,1,0,0,1,1,1,1],[3,0,0,3,34,34,34,34,34,34,34,34,34,34,34,1,1,1,1,1,1,1,1,1,1,1,1,28,0,28,1,1,1,1,0,0,1,1,1,14],[3,0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,28,0,28,1,1,1,1,0,0,1,1,1,14],[3,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14,0,14,1,1,1,1,0,0,1,1,1,14],[3,3,0,3,4,6,6,6,6,6,8,10,15,10,15,10,15,1,1,1,1,1,1,1,1,1,1,14,52,14,49,49,49,49,0,0,49,49,49,14],[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14],[3,3,3,3,4,6,6,6,6,6,8,10,15,10,15,10,15,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14]]

const worldHeight = world.length;
const worldWidth = world[0].length;


//keyboard input handler
var heldKeys = [];
document.addEventListener('keydown', (event)=> 
{
    heldKeys.push(event.key);
}
);
document.addEventListener('keyup', (event)=> 
{
    heldKeys = heldKeys.filter(function(l){return l!==event.key})
})
function keydown(k)
{
    if(heldKeys.includes(k))
    {return true}
    else{return false}
}

//mouse input handler
canvas.addEventListener("click", async () => {
    await canvas.requestPointerLock();
  });
document.addEventListener('mousemove',(e)=>
{
    if(document.pointerLockElement === canvas){
    var movementX = e.movementX||e.mozMovementX||e.webkitMovementX||0;
    var movementY = e.movementY||e.mozMovementY||e.webkitMovementY||0;
    pa+=movementX/600
    if(pa>pi*2){pa-=pi*2;}
    if(pa<0){pa+=pi*2;}
    if(xoffset<0){xoffset+=2048}
    if(xoffset>2048){xoffset-=2048}
    if(cyoffset<-800){cyoffset=-800}
    if(cyoffset>800){cyoffset=800}
    cyoffset+=movementY*2;
    xoffset-=movementX*4;
    }
})
document.addEventListener('click',()=>{
    pxv-=pcx/100;
    pyv-=pcy/100;
    gunshot.currentTime=0;
    gunshot.play()
    cyoffset-=12
    handFrame=2;
    setTimeout(() => {
        handFrame=1;
      }, 100);
    let hitP=hitscan()
    console.log(hitP)
    if(world[hitP[1]][hitP[2]]==1){
        world[hitP[1]][hitP[2]]=0
    }
})


//Handle player movement
function movePlayer()
{
    if(keydown('w'))
    {
        pxv+=pcx/100;
        pyv+=pcy/100;

    }
    if(keydown('s'))
    {
        pxv-=pcx/100;
        pyv-=pcy/100;
    }
    if(keydown('d'))
    {
        pxv+=psx/100;
        pyv+=psy/100;
    }
    if(keydown('a'))
    {
        pxv-=psx/100;
        pyv-=psy/100;
    }
    let wi=world[Math.floor(py+pyv)][Math.floor(px+pxv)]
    if(wi==0||transparentBlocks.includes(wi)){px+=pxv;}
    if(wi==0||transparentBlocks.includes(wi)){py+=pyv;}
    pcy = Math.sin(pa);
    pcx = Math.cos(pa);
    psy = Math.sin(pa+pi/2)*0.8;
    psx = Math.cos(pa+pi/2)*0.8;
    pxv/=1.2;
    pyv/=1.2;
    movementBob+=Math.abs(pxv*pyv);
    ryoffset+=(Math.sin(movementBob)*40)*Math.abs(pxv*pyv);
    yoffset=cyoffset+ryoffset;
}

var drawSky=()=>{    
ctx.fillStyle='Grey'
ctx.drawImage(sky,xoffset-2048,-900-yoffset,2048,2048)
ctx.drawImage(sky,xoffset,-900-yoffset,2048,2048)
ctx.drawImage(sky,2048+xoffset,-900-yoffset,2048,2048)
ctx.fillStyle='#140c07'
ctx.fillRect(renderStartingPosition, 512-yoffset, renderWidth, 2048)
}

var hitscan=()=>{
    var ra,rx,ry,dist;
    rx=px;
    ry=py;
    dist=0;
    hit=0;
    ra = pa;
    rdx=Math.cos(ra);
    rdy=Math.sin(ra);
    mx=Math.floor(rx);
    my=Math.floor(ry);
    surface = 0;
    stepsize = 0.01;
    let xof=0;
    let yof=0;
    //cast ray
    if(mx<worldWidth&&my<worldHeight&&mx>0&&my>0){
        while(hit==0){
            rx+=rdx*stepsize;
            ry+=rdy*stepsize;
            if(world[Math.floor(ry)][Math.floor(rx)]!=0){
                xof = rx-(Math.floor(rx)+0.5);
                yof = ry-(Math.floor(ry)+0.5);
                hit=1;
            }
        }
            
    }

    //get ray distance
    let dx=rx-px;
    let dy=ry-py;
    let ca=pa-ra
    dist = Math.sqrt((dx*dx)+(dy*dy))*Math.cos(ca);
    return([dist,Math.floor(ry), Math.floor(rx)])

}
//this is where the magic happens
var drawRays=()=>{
    var zbuffer=[]
    var ra,rx,ry,dist;
    for (let i = 0; i<va*res; i++) {
        rx=px;
        ry=py;
        dist=0;
        hit=0;
        ra = (va*res)/(2*res)*(pi/180)+(pa+(i/res)*-(pi/180));
        rdx=Math.cos(ra);
        rdy=Math.sin(ra);
        mx=Math.floor(rx);
        my=Math.floor(ry);
        surface = 0;
        stepsize = 0.01;
        let xof=0;
        let yof=0;

        //cast ray
        if(mx<worldWidth&&my<worldHeight&&mx>0&&my>0){
            while(hit==0){
                rx+=rdx*stepsize;
                ry+=rdy*stepsize;
                if(world[Math.floor(ry)][Math.floor(rx)]!=0){
                    xof = rx-(Math.floor(rx)+0.5);
                    yof = ry-(Math.floor(ry)+0.5);
                    hit=1;
                }
            }
            
        }

        //get ray distance
        let dx=rx-px;
        let dy=ry-py;
        let ca=pa-ra
        dist = Math.sqrt((dx*dx)+(dy*dy))*Math.cos(ca);

        zbuffer.push(dist);
        let mapTexture =world[Math.floor(ry)][Math.floor(rx)]

        //sprite handling

        var entityDistance


        //draw column
        let textureoffset=yof;
        if(Math.abs(yof)-Math.abs(xof)<0.001){textureoffset=yof+0.5;}else{textureoffset=xof+0.5}
        let cm = 1.6
        let columnWidth = renderWidth/va/res;
        let columnHeight = 1024/dist*cm
        let drawStart = 512-columnHeight/2-yoffset

        //mapTexture*400-(columnWidth*res)+(Math.floor(400/columnWidth)+Math.floor(400*textureoffset))
        let ih=256
        ctx.drawImage(spritesheet,-ih+mapTexture*ih+ih*textureoffset,0,res/(ih/columnWidth),ih,renderStartingPosition+renderWidth-(columnWidth*i),drawStart,-columnWidth-2,columnHeight);
        ctx.fillStyle = 'rgba(0,0,0,'+dist/70+')'
        ctx.fillRect(renderStartingPosition+renderWidth-(columnWidth*i),drawStart,-columnWidth,columnHeight);
        ctx.fillRect(0,0,columnWidth,columnWidth)
        ctx.fillRect(0,0,400*res,columnWidth)

    }
}

var getMinimapPosition=(x)=>{
    return guioffset+(x)*(minimapSize/worldWidth);
}
var minimaptextures=['#571d07','#852c09','#222222','#333333','#444444','#555555','#666666','#777777','#888888','#999999']

drawHand=()=>{
    let handSize=400
    ctx.drawImage(hand, 70+handFrame*60,0,60,48,1800-handSize,1024-handSize,handSize,handSize)
    ctx.fillStyle="white"
    ctx.fillRect(2048/2-1,1020/2-1,2,2)
}
function drawMiniMap()
{
    for (let y = 0; y < world.length; y++) {
        for (let x = 0; x < world[y].length; x++) {
            ctx.fillStyle = minimaptextures[world[x][y]]
            ctx.fillRect(guioffset+minimapSize/worldHeight*y,guioffset+minimapSize/worldWidth*x,minimapSize/worldHeight,minimapSize/worldWidth);
        }
        
    }
    let pmx = getMinimapPosition(px)
    let pmy = getMinimapPosition(py)
    circle(pmx,pmy,minimapSize/100,'Red');
    ctx.strokeStyle='Red'
    ctx.beginPath();
    ctx.moveTo(pmx,pmy)
    ctx.lineTo(pmx+pcx*12,pmy+pcy*12);
    ctx.stroke();
}

//set values of stuff

var px,py,pa,pcx,pcy;
px=2;
py=px;
pa=pi/2-pi
pcy = Math.sin(pa);
pcx = Math.cos(pa);
psy = Math.cos(pa+pi);
psx = Math.sin(pa+pi);
playerMovementSpeedModifier = 1;
pVel = 0;
pxv=0;
pyv=0;


const gameTick =()=>{
    ctx.clearRect(0,0,2048,1024)
    drawMiniMap();
    drawSky();
    drawRays();
    movePlayer();
    drawHand();
}

//game loop and frames
let msPrev = window.performance.now();
const fps = 1000/60;
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
