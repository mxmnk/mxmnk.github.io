// // Elements for taking the snapshot

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
let image= new Image();
let scale=0.2
image.src="./photo.jpeg";


var filterlist=[
    {label:"No Filter",value:[0,0,0,0,1,0,0,0,0]},
    {label:"Edge",value:[1,0,-1,0,0,0,-1,0,1]},
    {label:"Edge 2",value:[-1,-1,-1,-1,8,-1,-1,-1,-1]},
    {label:"Sharpen",value:[0,-1,0,-1,5,-1,0,-1,0]},
    {label:"Box Blur",value:[1,1,1,1,1,1,1,1,1].map(i=>i*1/9)},
    {label:"Gaussian Blur",value:[1,2,1,2,4,2,1,2,1].map(i=>1/16)},
    {label:"Gaussian Blur 2",value:[1,4,6,4,1,4,16,24,16,4,6,24,-476,24,6,4,16,24,16,4,1,4,6,4,1].map(i=>(i/256)*(-1))},
    {label:"Horizontal Line",value:[-1,-1,-1,2,2,2,-1,-1,-1]},
    {label:"Vertical Line",value:[-1,2,-1,-1,2,-1,-1,2,-1]},
    {label:"45 degree line",value:[-1,-1,2,-1,2,-1,2,-1,-1]},
    {label:"135 degree line",value:[2,-1,-1,-1,2,-1,-1,-1,2]},
    {label:"Horizontal Line 2",value:[-1,-2,-1,0,0,0,1,2,1]},
    {label:"Vertical Line 2",value:[-1,0,1,-2,0,2,-1,0,1]},
    {label:"random",value:Array(10).fill().map(x=>Math.round(Math.random()*1))}
    
]

image.onload=()=>{
    context.drawImage(image,0,0,450,450)
}
//image date

function greyScale(pixels,amount) {
    var d = pixels.data;

    for (var i=0; i<d.length; i+=4) {
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];
      //var v = 0.2126*r + 0.7152*g + 0.0722*b;
      var v = (r + g + b)/3;
      v=v*amount/100
      d[i] = r+ (v-r)*amount/100
      d[i+1] = g+ (v-g)*amount/100
      d[i+2] = b+ (v-b)*amount/100
    }

    return pixels;
}

//contrast
function contrast(pixels,amount) {
    var d = pixels.data;
    amount = (amount/100) + 1;  //convert to decimal & shift range: [0..2]
    var intercept = 128 * (1 - amount);
    for(var i=0;i<d.length;i+=4){   //r,g,b,a
        d[i] = d[i]*amount + intercept;
        d[i+1] = d[i+1]*amount + intercept;
        d[i+2] = d[i+2]*amount + intercept;
    }
    return pixels;
}



function conv_2d(pixels, weights, opaque) {
        var side = Math.round(Math.sqrt(weights.length));
        var halfSide = Math.floor(side/2);
        var src = pixels.data;
        var sw = pixels.width;
        var sh = pixels.height;
        // pad output by the convolution matrix
        var w = sw;
        var h = sh;
        var output = context.createImageData(w, h);
        var dst = output.data;
        // go through the destination image pixels
        var alphaFac = opaque ? 1 : 0;
        for (var y=0; y<h; y++) {
          for (var x=0; x<w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y*w+x)*4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r=0, g=0, b=0, a=0;
            for (var cy=0; cy<side; cy++) {
              for (var cx=0; cx<side; cx++) {
                var scy = sy + cy - halfSide;
                var scx = sx + cx - halfSide;
                if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                  var srcOff = (scy*sw+scx)*4;
                  var wt = weights[cy*side+cx];
                  r += src[srcOff] * wt;
                  g += src[srcOff+1] * wt;
                  b += src[srcOff+2] * wt;
                  a += src[srcOff+3] * wt;
                }
              }
            }
            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
          }
        }
        return output;
      }


function imageProcess(){
    var bw=document.getElementById('bw').value;

    let image= new Image();
    let scale=0.2
    image.src="./photo.jpeg";
    
    image.onload=()=>{
        context.drawImage(image,0,0,450,450)
        context.putImageData(greyScale(context.getImageData(0, 0, 450, 450),bw),0,0)

    }
}

function processConv(){
    var contrast=document.getElementById('filter').value;
    var contrastLabel=document.getElementById("filter-title")
    contrastLabel.innerHTML=filterlist[contrast].label+":";
    let image= new Image();
    let scale=0.2
    image.src="./photo.jpeg";
    
    image.onload=()=>{
        context.drawImage(image,0,0,450,450)
        context.putImageData(conv_2d(context.getImageData(0, 0, 450, 450),filterlist[contrast].value,1),0,0)

    }
}

function processContrast(){
    var contra=document.getElementById('contrast').value;

    let image= new Image();
    let scale=0.2
    image.src="./photo.jpeg";
    
    image.onload=()=>{
        context.drawImage(image,0,0,450,450)
        context.putImageData(contrast(context.getImageData(0, 0, 450, 450),contra),0,0)

    }
}