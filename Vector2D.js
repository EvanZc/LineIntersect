function Vector2D(x, y)
{
	this.x = x;
	this.y = y;
}

Vector2D.prototype.crossProduct = function(vec) {
	return this.x * vec.y - this.y * vec.x;
};

Vector2D.prototype.normalVector = function()
{
	var vec = new Vector2D(0, 0);
	vec.x = this.y;
	vec.y = -this.x;
	return vec;
}

Vector2D.prototype.substractVec = function(vec)
{
	this.x -= vec.x;
	this.y -= vec.y;
}

Vector2D.prototype.addVec = function(vec)
{
	this.x += vec.x;
	this.y += vec.y;
}

Vector2D.prototype.multiplyConstant = function(constant)
{
	this.x *= constant;
	this.y *= constant;
}