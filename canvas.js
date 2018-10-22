//变量声明
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var lineWidth = 6 // 初始线宽
var color = 'black' //初始颜色
var widthKey = 'normal'
width.onclick = function(before){
   widthKey = before['target']['id']
} // 记录下线宽的当前按键

//视口全画板
autofillView(canvas)
paintAndEraser(canvas)

//橡皮檫开关
var eraserenable = false
eraser.onclick = function(){
  eraserenable = true
  eraser.classList.add('active')
  brush.classList.remove('active')
}
brush.onclick = function(){
  eraserenable = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}
//调色板颜色
red.onclick = function(){
  color = 'red'
  palette(color) //调红色
}
yellow.onclick = function(){
  color = 'yellow'
  palette(color) //调黄色
}  
blue.onclick = function(){
  color = 'blue'
  palette(color) //调蓝色
}
black.onclick = function(){
  color = 'black'
  palette(color) //调黑色
}

//画笔粗细
thin.onclick = function(){
  lineWidth = 2
  activeRemove()
  thin.classList.add('active')
  widthColorRemove()
  thin.style.background = color
}
thin2.onclick = function(){
  lineWidth = 4
  activeRemove()
  thin2.classList.add('active')
  widthColorRemove()
  thin2.style.background = color
}
normal.onclick = function(){
  lineWidth = 6
  activeRemove()
  normal.classList.add('active')
  widthColorRemove()
  normal.style.background = color
}
normal2.onclick = function(){
  lineWidth = 8
  activeRemove()
  normal2.classList.add('active')
  widthColorRemove()
  normal2.style.background = color
}
thick.onclick = function(){
  lineWidth = 10
  activeRemove()
  thick.classList.add('active')
  widthColorRemove()
  thick.style.background = color
}
//函数声明
function activeRemove(){
  thin.classList.remove('active')
  thin2.classList.remove('active')
  normal.classList.remove('active')
  normal2.classList.remove('active')
  thick.classList.remove('active')
}

function widthColorRemove(){
  thin.style.background = 'black'
  thin2.style.background = 'black'
  normal.style.background = 'black'
  normal2.style.background = 'black'
  thick.style.background = 'black'
}

function palette(color){
  brush.classList.remove('black');
  brush.classList.remove('red');
  brush.classList.remove('yellow');
  brush.classList.remove('blue');
  eraserenable = false
  brush.classList.add('active')
  eraser.classList.remove('active')
  context.strokeStyle = color;
  context.fillStyle = color;
  brush.classList.add(color);
  widthColorRemove()
  document.getElementById(widthKey).style.background = color;
}

function fillView(canvas){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight =document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}

function drawline(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1)
  context.lineWidth = lineWidth
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
  if (document.body.ontouchstart !== undefined){
  //It is telphone
    canvas.ontouchstart = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if(eraserenable){
        context.clearRect((x-5),(y-5),20,20) 
      }else{
      lastPoint = {x:x,y:y}
      //x,y for html
      }
    }
    canvas.ontouchmove = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      if(using){
        if(eraserenable){
          context.clearRect((x-5),(y-5),20,20)
        }else{
          var newPoint ={x:x,y:y}
          drawline(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
          //x,y for html
          lastPoint = newPoint
        } 
      }
    }
    canvas.ontouchend = function(aaa){
      using = false
    }
  }else{
  //It is PC
    canvas.onmousedown = function(aaa){
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if(eraserenable){
        context.clearRect((x-5),(y-5),20,20) 
      }else{
      lastPoint = {x:x,y:y}
      //x,y for html
      }
    }
  
    var lastPoint = {x:undefined,y:undefined}
    canvas.onmousemove = function(aaa){
      var x = aaa.clientX
      var y = aaa.clientY
      if(using){
        if(eraserenable){
          context.clearRect((x-5),(y-5),20,20)
        }else{
          var newPoint ={x:x,y:y}
          drawline(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
          //x,y for html
          lastPoint = newPoint
        } 
      }
    }
    canvas.onmouseup = function(aaa){
      using = false
    }
  }
}

