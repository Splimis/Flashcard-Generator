//basic card constructor function
exports.BasicCard = function(front, back) {
	this.front = front;
	this.back = back;
}

//cloze card constructor function. Takes in two arguements, the full sentence, and a cloze
exports.ClozeCard = function(text, cloze) {
	var textToLower = text.toLowerCase();
	var clozeToLower = cloze.toLowerCase();

	this.full = text;
	this.cloze = cloze;
	this.partial = text.replace(cloze, '...');
}