
//hkjhk
const myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello worrrld!';

let r = new Rotation(0,0);



const canvas = document.getElementById('tutorial');
const ctx = canvas.getContext('2d');
const path = [];

function colour(pt, cam) {
    const r = (pt.v[3]+2) * (255 / 4);
    const g = 255 - r;

    return `rgb(${r},${g},0)`;
}


function drawPoints(points, camA, xy, xz, xw, yz, yw, zw, ctx) {
    const pos = V(5 * Math.cos(camA), 7 * Math.sin(camA), 0);
    const cam = new Camera(pos, V(0, 0, 0), Math.PI / 4, canvas.width, canvas.height);

    const [cb, sb] = [Math.cos(b), Math.sin(b)];
    const xy =  new Matrix(
        [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, cb, -sb],
            [0, 0, sb, cb]
        ]
    )
    const xz = new Matrix(
        [
            [1, 0, 0, 0],
            [0, cb, 0, -sb],
            [0, 0, 1, 0],
            [0, sb, 0, cb]
        ]
    )
    
    const rpoints = points.map(p => xy.apply(p));
    const p1 = rpoints[0];

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
                grad.addColorStop(0, colour(rpoints[i], cam));
                grad.addColorStop(1, colour(rpoints[j], cam));
                ctx.beginPath();
                ctx.strokeStyle = grad;
                ctx.moveTo(ppoints[i].X, ppoints[i].Y);
                ctx.lineTo(ppoints[j].X, ppoints[j].Y);
                ctx.stroke();
            }
        });
    });

    
}




const points = [];
for (x = -1; x <= 1; x += 2)
    for (y = -1; y <= 1; y += 2)
        for (z = -1; z <= 1; z += 2)
            for (w = -1; w <= 1; w += 2)
                points.push(V(x, y, z, w));

const edges = points.map(p1 =>
    points.map(p2 =>
        p1.minus(p2).len == 2
    )
);


document.querySelector('html').onkeydown= function (event)  {

    switch(event.code){
        case "ArrowUp":
            r.xy +=30;
        break;
        case "ArrowDown":
            r.xy -=30;
        break;

        case "ArrowRight":
            r.xz +=30;
        break;
        case "ArrowLeft":
            r.xz -=30;
        break;
        default:    
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPoints(points, r.xy*1/1520,r.xz*1/1500, ctx);
    event.preventDefault();
}