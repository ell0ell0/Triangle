var Triangles = function(iterations, triangleSize, positionChance, colorChance, orientChance) {

	this.currentIteration = 0;

	// set as you please
	this.iterations = iterations || 100;
	this.triangleSize = triangleSize || 20;

	// probability of stuff happening
	this.positionChance = positionChance || 0.1;
	this.colorChance = colorChance || 0.95;
	this.orientChance = orientChance || 0.8;

	// the colors, duke, the colors
	this.colors = [
		{ r: 67, g: 146, b: 42, a: 0.75 },
		{ r: 99, g: 102, b: 106, a: 0.75 },
		{ r: 208, g: 208, b: 206, a: 0.75 },
		{ r: 173, g: 220, b: 145, a: 0.75 },
		{ r: 219, g: 237, b: 212, a: 0.75 }
	];

	// get context and find container widths
	this.context = document.querySelector('#canvas').getContext('2d');
	this.context.canvas.width  = window.innerWidth;
	this.context.canvas.height = window.innerHeight;
	this.containerWidth = this.containerHeight = this.context.canvas.height/2;
	this.conX = Math.round( (this.context.canvas.width/2) - (this.containerWidth/2) );
	this.conY = Math.round( (this.context.canvas.height/2) - (this.containerHeight/2) );

};

Triangles.prototype.isInBox = function(inputPosX, inputPosY) {
	console.log(inputPosX + ' ' + this.conX);
	console.log(inputPosY + ' ' + this.conY);
	if (inputPosX >= this.conX && inputPosX <= this.conX + this.containerWidth && inputPosY >= this.conY && inputPosY <= this.cony + this.containerHeight) {
		console.log('in box');
		return true;
	} else {
		console.log('not in box');
		return false;
	}
};

Triangles.prototype.createTriangle = function(posX, posY, color, orientation) {

	this.context.save();
	this.context.beginPath();

	var size = this.triangleSize;

	if(orientation == "left") {
		this.context.moveTo( posX, posY );
		this.context.lineTo( posX - size, posY - size );
		this.context.lineTo( posX - size, posY + size );
	} else if(orientation == "up") {
		this.context.moveTo(posX, posY);
		this.context.lineTo( posX - size, posY - size );
		this.context.lineTo( posX + size, posY - size );
	} else if(orientation == "right") {
		this.context.moveTo(posX, posY);
		this.context.lineTo( posX + size, posY - size );
		this.context.lineTo( posX + size, posY + size );
	} else if(orientation == "down") {
		this.context.moveTo(posX, posY);
		this.context.lineTo( posX - size, posY + size );
		this.context.lineTo( posX + size, posY + size );
	}

	this.context.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
	this.context.fill();
	this.context.closePath();
	this.context.restore();

};

Triangles.prototype.logic = function(posX, posY, color, orientation) {

	var self = this,
			newPos = this.choosePos(posX, posY),
			newColor = this.chooseColor(color),
			newOrientation = this.chooseOrientation(orientation);

	if(this.currentIteration <= this.iterations) {

		if(newPos.x === posX && newPos.y === posY && newOrientation === orientation) {

				self.logic(posX, posY, color, orientation);

		} else {

			this.createTriangle(newPos.x, newPos.y, newColor, newOrientation);
			this.currentIteration++;
			window.setTimeout( function(){
				self.logic(newPos.x, newPos.y, newColor, newOrientation);
			}, 100);

		}
	}
};

Triangles.prototype.choosePos = function(posX, posY) {

	var pos = { x: posX, y: posY },
			diameter = this.triangleSize * 2,
			rando = Math.random();

	if(rando <= this.positionChance) {
		return pos;
	} else {
		var ranDir = Math.random();
		//move left
		if (ranDir <= 0.25) {
			if(this.isInBox(pos.x - diameter, pos.y)){
				pos.x -= diameter;
			}
		}
		//move up
		else if(ranDir > 0.25 && ranDir <= 0.5) {
			if(this.isInBox(pos.x, pos.y - diameter)){
				pos.y -= diameter;
			}
		}
		//move right
		else if(ranDir > 0.5 && ranDir <= 0.75) {
			if(this.isInBox(pos.x + diameter, pos.y)){
				pos.x += diameter;
			}
		}
		//move down
		else if(ranDir > 0.75 && ranDir <= 1) {
			if(this.isInBox(pos.x, pos.y + diameter)){
				pos.y += diameter;
			}
		}
		return pos;
	}
};

Triangles.prototype.chooseColor = function(color) {

	var tmpColors = this.colors.slice(0),
			newColor = tmpColors.pop(),
			oldColor = color;

	if (Math.random() <= this.colorChance) {
		return oldColor;
	}

	while (newColor === oldColor) {
		newColor = tmpColors.pop();
		var rand = Math.round(Math.random() * (tmpColors.length - 1));
		newColor = tmpColors[rand];
	}

	return newColor;

};

Triangles.prototype.chooseOrientation = function(orientation) {
	// var rando = Math.random();

	// if(rando <= orientChance) {
	// return orientation;
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
};


$(document).ready(function() {
	//create initial seed
	//
	
	var TRIANGLES = new Triangles();

	TRIANGLES.logic(200, 250, { r: 67, g: 146, b: 42, a: 0.75 }, 'right');

});