var row,cols,mstart=true;
var w=43,f=1;
var grid=[];
var stack=[],mstack=[];
var current,mnext;
var button1,button2;
function setup() {
	createCanvas(688,688);
  button1=createButton('start');
	button1.position(5,700);
	button2=createButton('reduce speed');
	button2.position(5,730)
	//frameRate(5);

	cols=floor(width/w);
	row=floor(height/w);
	for(var i=0;i<row;i++){
		for(var j=0;j<cols;j++){
			var b=new cell(i,j);
			grid.push(b);
		}
	}
	current=grid[0];
	button1.mousePressed(start);
	button2.mousePressed(reduce);
}
function reduce(){

	if(f>0){
	button2.html('increase speed');
	frameRate(6);
}else{
	button2.html('reduce speed');
	frameRate(24);
}
	f*=-1;
}
function start(){
	current=grid[0];
	mstart=false
	for(var i=0;i<grid.length;i++){
		grid[i].visited=false;
	}
}

function draw() {
	if(mstart){
		background(100);
	for(var i=0;i<grid.length;i++){
		grid[i].show();
	}
current.visited=true;
current.highlight();
var next= current.checkNeighbours();
if(next){
	next.visited=true;
	stack.push(current);
	removewall(current,next);
	current=next;
}else if(stack.length>0){
	current=stack.pop();
  }
}else{
	background(100);
for(var i=0;i<grid.length;i++){
	grid[i].show();
}
	current.visited=true;
	current.highlight();
	mnext=current.mouse_start();
	if(current.x!=7||current.y!=7){
		if(mnext){
		mnext.visited=true;
		mstack.push(mnext);
		current=mnext;
    //console.log('transfer working');
	}else if(mstack.length>0){
		current=mstack.pop();
	  }
}
	//console.log('this is happening');
}
}
function index(i,j){
  if(i<0||j<0||i>row-1||j>cols-1){
		return -1;
	}else{
	return j+i*cols;
   }
}
function cell(i,j){
	this.x=i;
	this.y=j;
	this.visited=false;
	this.wall=[true,true,true,true];
	this.highlight=function(){
		var x=this.x*w;
		var y=this.y*w;
		noStroke();
		fill(0,255,0);
		rect(x,y,w,w);
	}
	this.checkNeighbours = function() {
    var neighbours=[];
		var top=grid[index(i,j-1)];
		var right=grid[index(i+1,j)];
		var bottom=grid[index(i,j+1)];
		var left=grid[index(i-1,j)];
    if(top&&!top.visited){
			neighbours.push(top);
		}
		if(right&&!right.visited){
			neighbours.push(right);
		}
		if(bottom&&!bottom.visited){
			neighbours.push(bottom);
		}
		if(left&&!left.visited){
			neighbours.push(left);
		}
		if(neighbours.length>0){
			var r= floor(random(0,neighbours.length));
      return neighbours[r];
		}else{
			return undefined;
		}
	}
	this.show=function(){
     var x=this.x*w;
		 var y=this.y*w;
		 //noFill();
		 if(this.visited){
 			noStroke();
 			fill(0);
 			rect(x,y,w,w);
 		}
		stroke(255);
		if(this.wall[0]){
			line(x,y,x+w,y);
		}
		if(this.wall[1]){
			line(x+w,y,x+w,y+w);
		}
		if(this.wall[2]){
			line(x+w,y+w,x,y+w);
		}
		if(this.wall[3]){
			line(x,y+w,x,y);
		}


	}
this.mouse_start=function(){
	var neighbours=[50,50,50,50];
	var nextcell=[];
	var largest,d=50;
	var mtop=grid[index(this.x,this.y-1)];
	var mright=grid[index(this.x+1,this.y)];
	var mbottom=grid[index(this.x,this.y+1)];
	var mleft=grid[index(this.x-1,this.y)];
	if(!this.wall[0]){
		//console.log('top is working');
	if(mtop && !mtop.visited){
	neighbours[0]=(8-this.x)+(8-(this.y-1));
	nextcell[0]=mtop;
   }
  }
	if(!this.wall[1]){
		//console.log('right is working');
	if(mright&&!mright.visited){
	neighbours[1]=(8-(this.x+1))+(8-(this.y));//12 in --6
	nextcell[1]=mright;
   	}
  }
	if(!this.wall[2]){
	//	console.log('bottom is working');
	if(mbottom&&!mbottom.visited){
	neighbours[2]=(8-this.x)+(8-(this.y+1));
	nextcell[2]=mbottom;
   }
  }
	if(!this.wall[3]){
		//console.log('left is working');
	if(mleft&&!mleft.visited){
	neighbours[3]=(8-(this.x-1))+(8-(this.y));
	nextcell[3]=mleft;
	 }
 }
	for(var i=0;i<4;i++){
		if(neighbours[i]<=d){
		 largest =i;
		 d=neighbours[i];
	 }
	}
	return nextcell[largest];
   }
}


function removewall(a,b){
	var x=a.x-b.x;
	if(x===1){
		a.wall[3]=false;
		b.wall[1]=false;
	}else if(x===-1){
		a.wall[1]=false;
		b.wall[3]=false;
	}
	var y=a.y-b.y;
	if(y===1){
		a.wall[0]=false;
		b.wall[2]=false;
	}else if(y===-1){
		a.wall[2]=false;
		b.wall[0]=false;
	}
}
