var dots = [], post, target, vel, spring, speed; //variaveis para esfera
var animate = false, open = false, ctx; //configs de iniciação

function setup() {
  ctx = createCanvas(windowWidth, windowHeight);
  ctx.touchStarted(flip);
  
 background(2, 2, 2);
   colorMode(RGB, 50); //cor + fade de movimentação (300+ == parece o flash)
   noStroke();
  	
	translate(width/2, height/2); // posição de iniciamento das esferas == meio da janela
    pos = new p5.Vector(0,0), //vetor de posição em relação ao meio da janela
	target = new p5.Vector(0,0),
	vel = new p5.Vector(0,0),
	//OBS.: valores de spring e speed tem que ser baixos!!!
	spring= 0.9, //alterar de acordo com o ritmo da música e notas
	speed = 0.03; //alterar de acordo com a intensidade da música e notas

   	var maxDots = 7; // número de esferas
    var startHue = 45;
  
	for (var i=0; i<maxDots; i++) {
	    var offsetAngle = (2*PI)/maxDots; //angulo de desvio das esferas
		var angle = offsetAngle;											
		var radius = 135; //espaçamento entre as esferas ao expandir relacionada com a nota

		target = new p5.Vector(radius*sin(angle*i),radius*cos(angle*i));
	
		var dot = new Dot(pos.x, pos.y, target, startHue+(i*6));
		dots.push(dot);
		dot.render(); 
	}
  
}

function draw() {
if(animate == true){
  transp = 125; //variavel que controla tal fluidez da movimentação	
  fill(2,2,2,transp); //transparência na movimentação da esfera relacionada com a nota
  translate(width/2, height/2);
  rect(-windowWidth/2,-windowHeight/2, windowWidth, windowHeight);

		for(var i =0; i < dots.length; i ++) {
			var p = dots[i];
			
				if (open) {
					target.set(0,0);					
				}else {
					target.set(p.target.x, p.target.y);	
				}
						
			pos.set(p.posX, p.posY);
			vel.set(p.velX, p.velY);
			vel.mult(spring);
				
			var diff = p5.Vector.sub(target, pos);
			diff.mult(speed);
			vel.add(diff);
			pos.add(vel);

			p.posX = pos.x;
			p.posY = pos.y;
			
			p.velX = vel.x;
			p.velY = vel.y;	

			p.render();
										
											
	 	}
	}
}

function flip() {
    if (!animate){
			animate = true;			
		} else {
			if (!open) {

				open = true
								
			} else if (open) {
		
				open = false

			}
		}
}


 function touchStarted(){ //rodar animação ao clique do mouse, ou seja, podemos alterar para rodar a função quando
	//						uma nota nova chegar. Alterando variáveis de cor, velocidade, movimentação e etc...
	timer = 500; //tempo para a esfera voltar relacionado com a nota
	flip();
	setTimeout(() => {  flip(); }, timer);
 }

//esferas
function Dot(posx, posy,t,h) {

	this.posX = posx; 
	this.posY = posy; 
	
	this.target = new p5.Vector(0,0,0);
	this.target.set(t);
	this.velX = 0; //direção x da primeira "explosão" 
	this.velY = 0;  //direção Y da primeira "explosão"
	this.size = 90; //tamanho das esferas	
  	this.hue = h;
	
	//use 'h' para cores com fade e "degradê" entre elas.
	R = random(0,255); // vermelho
	G = random(0,255); // verde
	B = random(0,255); // azul
	this.render = function() {
    fill(R, G, B);//cor das esferas (notas)
		ellipse(this.posX, this.posY,this.size,this.size);					
	}
} 


/* shadding ball
var Ypos = 500;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	background(frameCount, frameCount, frameCount, frameCount);
	var c;
	noStroke();
	c = color(0, 0, frameCount);
	fill(c);
	ellipse(window.innerWidth/2, Ypos, 300);
	if (Ypos > 250){
        Ypos--;
        Ypos--;
    }   
} */


/*  desenhando e etc

function setup(){
    createCanvas(window.innerWidth, window.innerHeight)
    background (200, 200, 200)
}

function mousePressed(){
    noStroke();
    fill(255, 5, 255, 50);
    ellipse(mouseX, mouseY, 30, 30)
   
} */


/* bolas quicantes 

var balls = [];
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for (var i = 0; i < 10; i++) {
        balls[i] = new Balls();
    }
}
function draw() {
    background(255);
    for (i = 0; i < 10; i++) {
        balls[i].update();
        balls[i].show();
    }
}
function Balls() {
    this.x = random(width);
    this.y = random(height);
    this.xspeed = 5;
    this.yspeed = 5;
    this.update = function () {
        if (this.x > width || this.x < 0) { this.xspeed *= -1; }
        if (this.y > height || this.y < 0) { this.yspeed *= -1; }
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
    }
    this.show = function () {
        push();
        fill(0, 153, 200);
        ellipse(this.x, this.y, 15, 15);
        pop();
    }
}
 */
