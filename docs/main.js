function start() {
	document.getElementById('button').style.visibility = 'hidden';
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	setInterval(game,1000/15); // calls game function 15 times per second
}

px=py=10; // position
gs=tc=20; // grid size / tile count
ax=ay=15; // apple (goal) position
xv=yv=0; // velocity
trail=[]; // array for player trail
tail = 5; // length of snake tail

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

			break;

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
		ax=Math.floor(Math.random()*tc);
		ay=Math.floor(Math.random()*tc);
	}

	// colour apple
	ctx.fillStyle="red";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}

// controls
function keyPush(evt) {
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
