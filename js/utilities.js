//utilities.....................................................
function getDist(x1, y1, x2, y2) {
	return Math.round( Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2)) );
}

function clamp(value, min, max) {
	return value < min ? min : value > max ? max : value;
}

function map(value, inputMin, inputMax, outputMin, outputMax, clamp){
	var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
	if( clamp ){
		if(outputMax < outputMin){
			if( outVal < outputMax )outVal = outputMax;
			else if( outVal > outputMin )outVal = outputMin;
		}else{
			if( outVal > outputMax )outVal = outputMax;
			else if( outVal < outputMin )outVal = outputMin;
		}
	}
	return outVal;
}

function withinBox(posX, posY, w, h, inputPosX, inputPosY) {
	if (inputPosX >= posX && inputPosX <= posX + w && 
		inputPosY >= posY && inputPosY <= posY + h) {
		return true;
	} else {
		false;
	}
}