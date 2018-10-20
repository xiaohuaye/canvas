//变量声明
var yyy = document.getElementById('canvas');
var context = yyy.getContext('2d');

//视口全画板
autofillView(yyy)
paintAndEraser(yyy)

//橡皮檫开关
var eraserenable = false
eraser.onclick = function(){
  eraserenable = true
  action.id = 'actionx'
}
brush.onclick = function(){
  eraserenable = false
  actionx.id = 'action'
}
//函数声明

function fillView(canvas){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight =document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}

function drawline(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1)
  context.lineWidth = 2
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()
} 

function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill()
}

function autofillView(canvas){
  fillView(canvas)
  window.onresize = function(){
   fillView(canvas)
  }
}

function paintAndEraser(canvas){
  var using = false
  canvas.onmousedown = function(aaa){
    var x = aaa.clientX
    var y = aaa.clientY
    using = true
    if(eraserenable){
      context.clearRect((x-5),(y-5),10,10) 
    }else{
    lastPoint = {x:x,y:y}
    //x,y for html
    }
  }

  var lastPoint = {x:undefined,y:undefined}
  yyy.onmousemove = function(aaa){
    var x = aaa.clientX
    var y = aaa.clientY
    if(using){
      if(eraserenable){
        context.clearRect((x-5),(y-5),10,10)
      }else{
        var newPoint ={x:x,y:y}
        drawline(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        //x,y for html
        lastPoint = newPoint
      } 
    }
  }
  yyy.onmouseup = function(aaa){
    using = false
  }
}