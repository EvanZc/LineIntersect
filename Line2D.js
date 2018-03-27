/*
	need: 
        Point.js
        Vector.js
*/

function Line2D(point1, point2)
{
	this.point_a = point1;
	this.point_b = point2;
	this.lineLength = 0;

	this.updateLength();
}

Line2D.prototype.intersectWith = function(anotherLine)
{
	//注意必须是先this, anotherLine.point_b再this, anotherLine.point_a
	var tri1 = triangleArea2D(this, anotherLine.point_b);
	var tri2 = triangleArea2D(this, anotherLine.point_a);
	if (tri1 * tri2 < 0)
	{
		var tri3 = triangleArea2D(anotherLine, this.point_a);
		//var tri4 = triangleArea2D(anotherLine, this.point_b);
		//必须是这个顺序
		var tri4 = tri3 + tri2 - tri1;
		if (tri3 * tri4 < 0)
		{
			var ax_ratio = tri3 / (tri3 - tri4);
			//计算交点
            var intersectPoint = new Vector2D(this.point_b.x, this.point_b.y);
            intersectPoint.substractVec(this.point_a);
            intersectPoint.multiplyConstant(ax_ratio);
            intersectPoint.addVec(this.point_a);
			return {isIntersect : true, intersectVec : intersectPoint};
		}
	}
	return {isIntersect : false, intersectVec : null};
};

Line2D.prototype.toString = function() 
{
	return "Line is (" + this.point_a.x + ", " + this.point_a.y + ")->(" + this.point_b.x + ", " + this.point_b.y + ").";
}; 

Line2D.prototype.length = function() 
{
	return this.lineLength;
};

Line2D.prototype.updateLength = function() {
	this.lineLength = Math.sqrt((this.point_a.x - this.point_b.x) * (this.point_a.x - this.point_b.x) + (this.point_a.y - this.point_b.y) * (this.point_a.y - this.point_b.y));
};

Line2D.prototype.normalVector = function()
{
	var vec = new Vector2D(0, 0);
	vec.x = this.point_b.y - this.point_a.y;
	vec.y = this.point_a.x - this.point_b.x;
	return vec;
}

//https://www.cnblogs.com/hongru/archive/2012/03/31/2427590.html
/*
	数学上可以证明，如果a， b 两点分布在 cd 的两侧的话，那么 S_acd 和S_bcd 一定是反向的。即 S_acd*S_bcd < 0;

	同理，为了避免类似这种， 虽然 S_abc * S_abd < 0 , 但是 S_acd*S_bcd > 0;

	同样不能判定相交。
*/

//line ab , point c,d
//line cd , point a,b
function triangleArea2D(line_one, point_other)
{
	var res;
	// c to line_one's to point vectors.
	var vec_ca = new Vector2D(line_one.point_a.x - point_other.x, line_one.point_a.y - point_other.y);
	var vec_cb = new Vector2D(line_one.point_b.x - point_other.x, line_one.point_b.y - point_other.y);

	res = vec_ca.crossProduct(vec_cb);
	return res;
}