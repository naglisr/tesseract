//hkjhk
const myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello worrrld!';


const canvas = document.getElementById('tutorial');
const ctx = canvas.getContext('2d');
const path = [];

let angs = [
    [],
    [0],
    [0,0],
    [0,0,0]
];

let points = [];
for (x = -1; x <= 1; x += 2)
    for (y = -1; y <= 1; y += 2)
        for (z = -1; z <= 1; z += 2)
            for (w = -1; w <= 1; w += 2)
                points.push(V(x, y, z, w));


function colour(pt) {
    const r = (pt.v[3]+2) * (255 / 4);
    const g = 255 - r;

    return `rgb(${r},${g},0)`;
}


function drawPoints(camA) {
    const pos = V(5 * Math.cos(camA), 7 * Math.sin(camA), 0);
    const cam = new Camera(pos, V(0, 0, 0), Math.PI / 4, canvas.width, canvas.height);


    
    const rpoints = points.map(p => rotation(angs).apply(p));
    const p1 = rpoints[0]; //pt from which path is drawn

    const ppoints = rpoints.map(p => {
        const pointIn3d = cam.projTo3d(p);
        return cam.project(pointIn3d);
    });


    ctx.lineWidth = 3;

    path.push([ppoints[0].X, ppoints[0].Y])

    ctx.beginPath();
    path.forEach((p, i) =>{
        if(path.length>2){

        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(p[0]+1,p[1]+1);
        }
    });
    //ctx.stroke();

    edges.forEach((row,i) => {
        row.slice(0, i).forEach( (edge,j) => {
            if (edge) {
                const grad = ctx.createLinearGradient(ppoints[i].X, ppoints[i].Y, ppoints[j].X, ppoints[j].Y);
                grad.addColorStop(0, colour(rpoints[i]));
                grad.addColorStop(1, colour(rpoints[j]));
                ctx.beginPath();
                ctx.strokeStyle = grad;
                ctx.moveTo(ppoints[i].X, ppoints[i].Y);
                ctx.lineTo(ppoints[j].X, ppoints[j].Y);
                ctx.stroke();
            }
        });
    });
    angs.slice(1).forEach((row, i) =>{
        row.forEach((val, j) => {
            ctx.fillText((val*180/Math.PI) | 0, i*35, j*15+30);
        })
    })
            
}


const edges = points.map(p1 =>
    points.map(p2 =>
        p1.minus(p2).len == 2
    )
);

drawPoints(0);

document.querySelector('html').onkeydown= function (event)  {
    const a =2*Math.PI/180;
    switch(event.code){
        case "KeyI":
            angs[1][0] +=a;
        break;
        case "KeyK":
            angs[1][0] -=a;
        break;

        case "KeyJ":
            angs[2][0] +=a;
        break;
        case "KeyL":
            angs[2][0] -=a;
        break;
        case "KeyW":
            angs[2][1] +=a;
        break;
        case "KeyS":
            angs[2][1]-=a;
        break;
        case "KeyA":
            angs[3][0] +=a;
        break;
        case "KeyD":
            angs[3][0]-=a;
        break;
        case "KeyT":
            angs[3][1] +=a;
        break;
        case "KeyG":
            angs[3][1]-=a;
        break;
        case "KeyF":
            angs[3][2] +=a;
        break;
        case "KeyH":
            angs[3][2]-=a;
        break;
        default:    
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPoints(0);
    event.preventDefault();
}