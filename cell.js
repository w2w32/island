var can,ctx;
var cellAt=[];
var maxtop,maxbottom;
var leftbound;
var var1;
function Cell(altitude,type){
		this.altitude=altitude;
		this.type=type;
	}
function init(){
	can=document.getElementById("canvas");
	ctx=can.getContext("2d");
	maxtop=10;
	maxbottom=90;
	leftbound=10
	var1=0.1;
	var id = ctx.createImageData(1,1);
	var d  = id.data; 
	for(var i=0;i<=can.width;i++){
		cellAt[i]=[];
		for(var j=0;j<=can.height;j++){
			cellAt[i][j]=new Cell(null,null);
		}
	}
}
function run(){
	for(var c=0;c<leftbound;c++){
		for(var r=0;r<can.height;r++){
			cellAt[c][r]=new Cell(0,"beach");
		}
	}
	for(var r=0;r<can.height;r++){
		if(Math.random()<(.4*Math.pow(2,-Math.pow(r-can.width/2,2)/80))){
			cellAt[leftbound-1][r]=new Cell(1,"beach");
		}else{
			cellAt[leftbound-1][r]=new Cell(0,"beach");
		}
	}
	for(var c=leftbound;c<can.width;c++){
		for(var r=0;r<maxtop;r++){
			cellAt[c][r]=new Cell(0,"beach");
		}
		for(var r=maxtop;r<maxbottom;r++){
			var alt=2*cellAt[c-1][r].altitude+cellAt[c-1][r-1].altitude+cellAt[c-1][r+1].altitude;
			if(Math.random()>var1){
				if(Math.random()*can.width>c){
					cellAt[c][r]=new Cell(Math.ceil(alt*20/c*Math.random()),null)
				}else{
					cellAt[c][r]=new Cell(Math.floor(alt*20/c*Math.random()),null)
				}
			}else{
			cellAt[c][r]=new Cell(cellAt[c-1][r].altitude,null);
			}
		}
		for(var r=maxbottom;r<canvas.height;r++){
			cellAt[c][r]=new Cell(0,"beach");
		}
	}
}
function drawcell(x,y){
	if(cellAt[x][y].altitude===0){
	ctx.strokeStyle="#66f";
	}else if(cellAt[x][y].altitude<10){
	ctx.strokeStyle="#ed8";
	}else if(cellAt[x][y].altitude<20){
	ctx.strokeStyle="#dc7";
	}else if(cellAt[x][y].altitude<30){
	ctx.strokeStyle="#a85";
	}else if(cellAt[x][y].altitude<40){
	ctx.strokeStyle="#a97";
	}else if(cellAt[x][y].altitude<100){
	ctx.strokeStyle="#5c5";
	}else if(cellAt[x][y].altitude<1000){
	ctx.strokeStyle="#5a5";
	}else if(cellAt[x][y].altitude<10000){
	ctx.strokeStyle="#383";
	}else if(cellAt[x][y].altitude<100000){
	ctx.strokeStyle="#3b7";
	}else if(cellAt[x][y].altitude<1000000){
	ctx.strokeStyle="#999";
	}else{
	ctx.strokeStyle="#fff";
	}
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+1,y+1);	
	ctx.closePath();
	ctx.stroke();
}
var animate;
function draw(){
	run();
	/*var c=0;
	var r=0;
	animate=setInterval(function(){
	drawcell(c,r);
	r++;
	if(r>=can.height){c++;r=0}
	if(c>=can.width){clearInterval(animate)}
	},1)*/
	
	for(var c=0;c<can.width;c++){
		for(var r=0;r<can.height;r++){
			setTimeout(drawcell(c,r),1);
		}
	}
}
