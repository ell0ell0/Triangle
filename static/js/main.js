/**
 *  Triangles class
 **/

var Triangles = function() {

	this.currentIteration = 0;

	// the colors, duke, the colors
	this.colors = [
		{ r: 67, g: 146, b: 42, a: 0.75 },
		{ r: 99, g: 102, b: 106, a: 0.75 },
		{ r: 208, g: 208, b: 206, a: 0.75 },
		{ r: 173, g: 220, b: 145, a: 0.75 },
		{ r: 219, g: 237, b: 212, a: 0.75 }
	];

	// orientations
	this.orientations = ['up', 'right', 'down', 'left'];

	// get context and set canvas width
	this.context = document.querySelector('canvas').getContext('2d');
	this.context.canvas.width  = window.innerWidth/2;
	this.context.canvas.height = window.innerHeight/1.5;

};


/**
 *  Initialize this mother
 **/

Triangles.prototype.init = function(speed, iterations, triangleSize, positionChance, colorChance, orientChance) {

	// ms between drawing
	this.speed = speed || 5;
	// number of times to draw
	this.iterations = iterations || 100;
	// width of triangle
	this.triangleSize = triangleSize || 50;

	// probability of stuff happening
	this.positionChance = positionChance || 90/100;
	this.colorChance = colorChance || 95/100;
	this.orientChance = orientChance || 80/100;

	var startX = Math.round( Math.random() * this.context.canvas.width ),
			startY = Math.round( Math.random() * this.context.canvas.height );

	this.loop(startX, startY, this.chooseColor(), this.chooseOrientation());

};


/**
 *  The main loop
 **/

Triangles.prototype.loop = function(posX, posY, color, orientation) {

	var self = this,
			newPos = this.choosePos(posX, posY),
			newColor = this.chooseColor(color),
			newOrientation = this.chooseOrientation(orientation);

	if (this.currentIteration <= this.iterations) {

		if (newPos.x === posX && newPos.y === posY && newOrientation === orientation) {

				self.loop(posX, posY, color, orientation);

		} else {

			this.drawTriangle(newPos.x, newPos.y, newColor, newOrientation);
			this.currentIteration++;

			window.setTimeout(function(){
				self.loop(newPos.x, newPos.y, newColor, newOrientation);
			}, self.speed);

		}
	}

};


/**
 *  Draws a triangle given coordinates, color and orientation
 **/

Triangles.prototype.drawTriangle = function(posX, posY, color, orientation) {

	this.context.save();
	this.context.beginPath();

	var size = this.triangleSize;

	if(orientation === 'up') {
		this.context.moveTo(posX, posY);
		this.context.lineTo( posX - size, posY - size );
		this.context.lineTo( posX + size, posY - size );
	} else if(orientation === 'right') {
		this.context.moveTo(posX, posY);
		this.context.lineTo( posX + size, posY - size );
		this.context.lineTo( posX + size, posY + size );
	} else if(orientation === 'down') {
		this.context.moveTo(posX, posY);
		this.context.lineTo( posX - size, posY + size );
		this.context.lineTo( posX + size, posY + size );
	} else if(orientation === 'left') {
		this.context.moveTo( posX, posY );
		this.context.lineTo( posX - size, posY - size );
		this.context.lineTo( posX - size, posY + size );
	}

	this.context.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
	this.context.fill();
	this.context.closePath();
	this.context.restore();

};


/**
 *  Returns a position next to the current position
 **/

Triangles.prototype.choosePos = function(posX, posY) {

	if (Math.random() <= this.positionChance && this.isOnCanvas(posX, posY)) {
		return { x: posX, y: posY };
	}

	var _posX, _posY,
			diameter = this.triangleSize * 2;

	do {
		_posX = posX;
		_posY = posY;
		var rand = Math.round( Math.random() * 3 ) + 1;
		if (rand === 1) {
			_posY -= diameter;
		} else if (rand === 2) {
			_posX += diameter;
		} else if (rand === 3) {
			_posY += diameter;
		} else if (rand === 4) {
			_posX -= diameter;
		}
	} while (!this.isOnCanvas(_posX, _posY));

	return { x: _posX, y: _posY };
	
};


/**
 *  Returns a color different from the current color
 **/

Triangles.prototype.chooseColor = function(color) {

	var tmpColors = this.colors.slice(0),
			oldColor = color || tmpColors[0];

	if (Math.random() <= this.colorChance) {
		return oldColor;
	}

	var newColor;

	do {
		var rand = Math.round(Math.random() * (tmpColors.length - 1));
		newColor = tmpColors[rand];
	} while (newColor === oldColor);

	return newColor;

};


/**
 *  Returns an orientation different from the current orientation
 **/

Triangles.prototype.chooseOrientation = function(orientation) {

	var newOrientation;

	do {
		newOrientation = this.orientations[Math.round( Math.random() * (this.orientations.length - 1) )];
	} while (newOrientation === orientation);

	return newOrientation;

};


/**
 *  Utility function to check if point is on the canvas
 **/

Triangles.prototype.isOnCanvas = function(inputPosX, inputPosY) {

	return (inputPosX > this.triangleSize && inputPosX < (this.context.canvas.width - this.triangleSize) && inputPosY > this.triangleSize && inputPosY < (this.context.canvas.height - this.triangleSize)) ? true : false;
	
};


/**
 *  When the DOM is ready...
 **/

$(function() {
	
	var TRIANGLES = new Triangles();
	TRIANGLES.init();

});