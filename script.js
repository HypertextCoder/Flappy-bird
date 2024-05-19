// Created by Abhinav

window.onload=()=>{
document.getElementById('loader').style.display = 'none'
let score = 0;
let gameOver = false;

var url = 'https://dl.dropbox.com/scl/fi/3m949puyimmg3qxwa6nd2/Monkeys-Spinning-Monkeys-chosic.com.mp3?rlkey=doun77nz8xhw7ehlqif8zbkiz&dl=1';
    window.AudioContext = window.AudioContext||window.webkitAudioContext; //fix up prefixing
    var context = new AudioContext(); //context
    var source = context.createBufferSource(); //source node
    source.connect(context.destination); //connect source to speakers so we can hear it
    var request = new XMLHttpRequest();
    request.open('GET', url, true); 
    request.responseType = 'arraybuffer'; //the  response is an array of bits
    request.onload = function() {
        context.decodeAudioData(request.response, function(response) {
            source.buffer = response;
            source.start(0); //play audio immediately
            source.loop = true;
        }, function () { console.error('The request failed.'); } );
    }
    request.send();
//__________________________________






   const canvas = document.getElementById("canvas");
   const ctx = canvas.getContext('2d');
   canvas.height = window.innerHeight;
   canvas.width = window.innerWidth;
   let speed = 2;
  
   class Piller{
       constructor(){
           this.x = canvas.width + 50;
           this.y =  Math.random() * 400 - 400;
           this.height = 500;
           this.width = 30
           this.y2 = this.y + this.height + 150;
           this.height2 = 800;
           this.image = pillers
           
           this.color = 'green'
           this.speed = speed;
           
       }
       update(){
           this.draw()
           this.x -= this.speed;
           
           if(
           
this.x < player.x + player.width - 10&&
this.x + this.width  > player.x &&
this.y  < player.y + 10+ player.height - 20 &&
this.y + this.height > player.y + 10){
               gameOver = true;
           }
           if(
           
this.x < player.x + 10 + player.width -20 &&
this.x + this.width > player.x +10 &&
this.y2 < player.y + 10+ player.height -20&&
this.y2 + this.height2 > player.y + 10){
               gameOver = true;
           }
          // ctx.rect(player.x + 10, player.y +10 , player.width - 10, player.height - 20)
           ctx.stroke()
           
       }
       
    
       
       draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x, this.y2, this.width, this.height2)
        ctx.fill()
    }
       
   }
   
let obs = []

   
   class Player{
    constructor(){
        this.height = 40
        this.width = 40;
        this.y = canvas.height / 2 - this.height / 2
        this.x = 70;
        this.velocity = 3;
        this.color = "blue"
        this.image = bird;
        this.imageWidth = 132;
        this.imageHeight = 124
        this.frames = 0
        this.slowFrames = 5;
        this.gameFrame =0
        
    }
    
    update(){
        this.draw()
        this.y += this.velocity ;
        
        if(this.velocity < 3){
            this.velocity += 0.4
        }
        
        if(this.frames > 4){
            this.frames = 0;
        }
        if(this.slowFrames < this.gameFrame){
            this.frames++;
            this.gameFrame = 0
        }
        this.gameFrame++;
        
       if(this.y < 0 || this.y > canvas.height ) {
           gameOver = true 
       }
        
        
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.drawImage(this.image ,this.frames * this.imageWidth ,0, this.imageWidth, this.imageHeight , this.x, this.y, this.width, this.height)
        //ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()
    }
    force(){
    this.velocity = -5;
        this.y += this.velocity ;
        
    }
    
    
}
const player = new Player()
canvas.addEventListener('click', addForce);

function addForce(){
    player.force();
}


function addObsticle(){
    obs.push(new Piller())
}


class Background{
    constructor(){
        this.image = background ;
        this.x = 0;
        this.y = 0
        this.height = 810;
        this.width = 432;
    }
    
    draw(){
        ctx.beginPath()
        ctx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height)
    }
}

let scoreTime = 0;
function addTime(){
    scoreTime += deltaTime
    if(scoreTime > 1000){
        score++;
        scoreTime = 0;
    }
}




let lasttime =0;
let deltaTime = 0;
let newObstical = 0;
let timeInNewObstical = 2000;
const retry = document.getElementById('retry')
function animate(timestamps){
    if(gameOver == true){
        retry.style.display = 'block'
        return 
    }
    ctx.clearRect(0,0, canvas.width, canvas.height);
    player.update()
    obs.forEach(e =>{
        e.update()
    })
    if(obs.length  > 5){
        obs.shift()
    }
    
    deltaTime = timestamps - lasttime ;
    lasttime = timestamps ;
    
    if(newObstical  > timeInNewObstical ){
        addObsticle()
       // addObsticle()
        newObstical = 0;
    }
    ctx.fillStyle = 'red'
    ctx.font = '30px Impact'
    ctx.fillText("Score : " + score , 10, 30)
    addTime()
    newObstical+= deltaTime;
    requestAnimationFrame(animate )
    
}

retry.addEventListener('click', restart)

function restart(){
       retry.style.display = 'none'
       score = 0;
       gameOver = false ;
       player.x = 70
       player.y = canvas.height / 2;
       
       obs = []
       animate(0)
       
   }
   







animate(0)
   
}


