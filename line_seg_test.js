var start_point = new Point2D(100, 250);
var end_point = new Point2D(400, 250);
var not_move_line = new Line2D(start_point, end_point);

var draw_point_a;
//var draw_point_b;

var g_canvas_ctx;

var g_lines_arr = new Array();

function Init()
{
	var div_canvas = document.getElementById("div_canvas");
	var theCanvas = document.createElement("canvas");
	// theCanvas.style.width = "500px";
	// theCanvas.style.height = "500px";
	// 解决线段模糊
	theCanvas.width = 500;
	theCanvas.height = 500;

	div_canvas.appendChild(theCanvas);
	g_canvas_ctx = theCanvas.getContext('2d');

	initLines();

	// 监听鼠标移动
	div_canvas.onmousemove = function(e){
		g_lines_arr[1].point_b.x = e.clientX;
		g_lines_arr[1].point_b.y = e.clientY;
		console.log("mouse coor is " + e.clientX + ", " + e.clientY);
 	};

	window.setInterval(updateOneFrame, 30);
}

function initLines()
{
	//解决线段模糊
	var pt_one = new Point2D(100.5, 100.5);
	var pt_two = new Point2D(200.5, 100.5);
	var templine = new Line2D(pt_one, pt_two);
	g_lines_arr.push(templine);
	pt_one = new Point2D(150.5, 50.5);
	pt_two = new Point2D(150.5, 150.5);
	templine = new Line2D(pt_one, pt_two);
	console.log("temp line is " + templine);
	g_lines_arr.push(templine);
}

// return null or intersect point
function isTwoLineIntersected(line_one, line_two)
{
	return line_one.intersectWith(line_two);
}

function lineLen(point1, point2)
{
	return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
}

function drawLine(canvas_ctx, line)
{
	canvas_ctx.lineWidth = 1;
	canvas_ctx.beginPath();
	canvas_ctx.moveTo(line.point_a.x, line.point_a.y);
	canvas_ctx.lineTo(line.point_b.x, line.point_b.y);
	canvas_ctx.stroke();
}

function drawIntersectPoint(canvas_ctx, point)
{
	canvas_ctx.beginPath();
	canvas_ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
	canvas_ctx.stroke();
}

function clearCanvas()
{
	g_canvas_ctx.fillStyle="#000000";  
	g_canvas_ctx.clearRect(0, 0, 500, 500);
	console.log("clear canvas");
}

function updateOneFrame()
{
	var g_intersectPoint = null;

	clearCanvas();
	for (x in g_lines_arr)
	{
		drawLine(g_canvas_ctx, g_lines_arr[x]);
	}
	var p = isTwoLineIntersected(g_lines_arr[0], g_lines_arr[1]); 
	if (p.isIntersect)
	{
		//draw circle;
		g_intersectPoint = new Point2D(p.intersectVec.x, p.intersectVec.y);
		console.log("intersected !!! ");
	}
	else
	{
		console.log("not intersected !!! ");
	}
	if (g_intersectPoint)
	{
		drawIntersectPoint(g_canvas_ctx, g_intersectPoint);
	}
}


Init();