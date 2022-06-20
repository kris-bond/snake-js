
px=py=10; // position
gs=tc=20; // grid size / tile count
ax=ay=15; // apple (goal) position
xv=yv=0; // velocity
trail=[]; // array for player trail
tail = 5; // length of snake tail
var gameInterval; // game interval used to start/ stop
score = 0;

function start() {
	score = 0; // reset score
	document.querySelector('.score').textContent = score;
	gamestarted = false;
	document.getElementById('button').style.visibility = 'hidden';
	document.getElementById('button-instructions').style.visibility = 'hidden';
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	gameInterval = setInterval(game,1000/15); // calls game function 15 times per second
	
}

function stop() {
	clearInterval(gameInterval); // stop calling game function
	px=py=10; // position
	gs=tc=20; // grid size / tile count
	ax=ay=15; // apple (goal) position
	xv=yv=0; // velocity
	trail=[]; // array for player trail
	tail = 5; // length of snake tail
	document.getElementById('button').style.visibility = 'visible';
	document.getElementById('button-instructions').style.visibility = 'visible';
}

function updateScore() {
	document.querySelector('.score').textContent = score;
}

// game logic
function game() {

	// player velocity
	px+=xv;
	py+=yv;

	// wrapping around board
	if(px<0) {
		px= tc-1;
	}
	if(px>tc-1) {
		px= 0;
	}
	if(py<0) {
		py= tc-1;
	}
	if(py>tc-1) {
		py= 0;
	}

	// background colour
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);

	// snake colour
	ctx.fillStyle="lime";
	for(var i=0;i<trail.length;i++) {
		ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);

		// if player collides with tail
		if(trail[i].x==px && trail[i].y==py) {
			tail = 5;

			// check to see if user has started game
			if(gamestarted){
				stop();
			}
			
		}
	}

	// add on to trail for movement
	trail.push({x:px,y:py});

	// reduce trail when penalised
	while(trail.length>tail) {
		trail.shift();
	}

	// if player eats apple
	if(ax==px && ay==py) {
		tail++;
		score++;
		document.querySelector('.score').textContent = score;
		ax=Math.floor(Math.random()*tc);
		ay=Math.floor(Math.random()*tc);
	}

	// colour apple
	ctx.fillStyle="red";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}

// controls
function keyPush(evt) {
	gamestarted = true;
	switch(evt.keyCode) {
		case 37:
			xv=-1;yv=0;
			break;
		case 38:
			xv=0;yv=-1;
			break;
		case 39:
			xv=1;yv=0;
			break;
		case 40:
			xv=0;yv=1;
			break;
	}
}

// instructions
function showInstructions() {
	document.getElementById("instructions").style.display = "block";
}

function hideInstructions() {
	document.getElementById("instructions").style.display = "none";
}