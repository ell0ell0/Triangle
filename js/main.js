var canvas = document.querySelector('#canvas'),
	readout = document.querySelector('#readout'),
    context = canvas.getContext('2d');
    context.canvas.width  = window.innerWidth;
 	context.canvas.height = window.innerHeight;

var screenX = window.innerWidth;
var screenY = window.innerHeight;
var	containerH = screenY/2;
var containerW = containerH;

var size = 50;

var conX = Math.round( (screenX/2) - (containerW/2) );
var conY = Math.round( (screenY/2) - (containerH/2) );

var posChance = 0.9;
var colorChance = 0.95;
var orientChance = 0.8;

var maxIterations = 100;
var iteration = 0;

var colors = [
	{
		r: 67,
		g: 146,
		b: 42,
		a: 0.75
	},{
		r: 99,
		g: 102,
		b: 106,
		a: 0.75
	},{
		r: 208,
		g: 208,
		b: 206,
		a: 0.75
	},{
		r: 173,
		g: 220,
		b: 145,
		a: 0.75
	},{
		r: 219,
		g: 237,
		b: 212,
		a: 0.75
	}
];

function createTriangle(posX, posY, color, orientation) {
	context.save();
	context.beginPath();

	if(orientation == "left") {
		context.moveTo(posX, posY);
		context.lineTo( posX - size, posY - size );
		context.lineTo( posX - size, posY + size );
	} else if(orientation == "up") {
		context.moveTo(posX, posY);
		context.lineTo( posX - size, posY - size );
		context.lineTo( posX + size, posY - size );
	} else if(orientation == "right") {
		context.moveTo(posX, posY);
		context.lineTo( posX + size, posY - size );
		context.lineTo( posX + size, posY + size );
	} else if(orientation == "down") {
		context.moveTo(posX, posY);
		context.lineTo( posX - size, posY + size );
		context.lineTo( posX + size, posY + size );
	};

 	context.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
 	context.fill();
 	context.closePath();
 	context.restore();

}

function logic(posX, posY, color, orientation) {
	var newPos = choosePos(posX, posY);
	var newColor = chooseColor(color);
	var newOrientation = chooseOrientation(orientation);

	if(iteration <= maxIterations) {
		if(newPos.x === posX && newPos.y === posY && newOrientation === orientation) {

				logic(posX, posY, color, orientation);

		} else {
			createTriangle(newPos.x, newPos.y, newColor, newOrientation);
			iteration += 1;
			window.setTimeout( function(){
				logic(newPos.x, newPos.y, newColor, newOrientation);
			}, 5);
		}
	}
}

function choosePos(posX, posY) {
	var pos = {
		x: posX,
		y: posY
	}

	var rando = Math.random();
	if(rando <= posChance) {
		return pos;
	} else {
		var ranDir = Math.random();
		//move left
		if (ranDir <= 0.25) {
			if(withinBox(conX, conY, containerW, containerH, pos.x - size*2, pos.y)){
				pos.x -= size*2;
			} 
		} 
		//move up
		else if(ranDir > 0.25 && ranDir <= 0.5) {
			if(withinBox(conX, conY, containerW, containerH, pos.x, pos.y - size*2)){
				pos.y -= size*2;
			} 
		}
		//move right
		else if(ranDir > 0.5 && ranDir <= 0.75) {
			if(withinBox(conX, conY, containerW, containerH, pos.x + size*2, pos.y)){
				pos.x += size*2;
			} 
		}
		//move down
		else if(ranDir > 0.75 && ranDir <= 1) {
			if(withinBox(conX, conY, containerW, containerH, pos.x, pos.y + size*2)){
				pos.y += size*2;
			} 
		}
		return pos;
	}
}

function chooseColor (color) {
	var tmpColors = colors.slice(0),
		newColor = tmpColors.pop(),
		oldColor = color;

	if (Math.random() <= colorChance) {
		return oldColor;
	}
	while (newColor === oldColor) {
		newColor = tmpColors.pop()
		var rand = Math.round(Math.random() * (tmpColors.length - 1));
		newColor = tmpColors[rand];
	}
	return newColor;
}

function chooseOrientation (orientation) {
	// var rando = Math.random();

	// if(rando <= orientChance) {
	// 	return orientation;
	// } else {
		var randOr = Math.random();
		//left
		if(orientation != "left" && randOr <= 0.25) {
			return "left";
		}
		//up
		else if(orientation != "up" && randOr > 0.25 && randOr <= 0.5) {
			return "up";
		}
		//right
		else if(orientation != "right" && randOr > 0.5 && randOr <= 0.75) {
			return "right";
		}
		//down
		else if(orientation != "down" && randOr > 0.75 && randOr <= 1) {
			return "down";
		} 
		else {
			return orientation;
		}
	//}
}


$(document).ready(function() {
	//create initial seed
	var startX = conX + Math.round( Math.random() * containerW );
	var startY = conY + Math.round( Math.random() * containerH );
	var randC = colors[Math.round( Math.random() * (colors.length - 1) )];
	var randO = Math.random();
	var startOrientation;
	if (randO <= 0.25) {startOrientation = "left"};
	if (randO > 0.25 && randO <= 0.5) {startOrientation = "up"};
	if (randO > 0.5 && randO <= 0.75) {startOrientation = "right"};
	if (randO > 0.75 && randO <= 1) {startOrientation = "down"};

	logic(startX, startY, randC, startOrientation);
	logic(startX, startY, colors[0], startOrientation);
	logic(startX, startY, colors[0], startOrientation);
	logic(startX, startY, randC, startOrientation);
	// logic(startX, startY, randC, startOrientation);
	// logic(startX, startY, randC, startOrientation);
	// logic(startX, startY, randC, startOrientation);
	// logic(startX, startY, randC, startOrientation);
	// logic(startX, startY, randC, startOrientation);
});