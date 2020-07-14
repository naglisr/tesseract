

const myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello worrrld!';

document.querySelector('html').onclick = function () {
    //alert('ow'); /* alert opens a dialog box */
}

const canvas = document.getElementById('tutorial');
const ctx = canvas.getContext('2d');
const path = [];

function colour(pt, cam) {
    const r = (pt.v[3]+2) * (255 / 4);
    const g = 255 - r;

    return `rgb(${r},${g},0)`;
}


function drawPoints(points, a, b, ctx) {
    const pos = V(5 * Math.cos(a), 7 * Math.sin(a), 0);
    const cam = new Camera(pos, V(0, 0, 0), Math.PI / 4, canvas.width, canvas.height);

    const [cb, sb] = [Math.cos(b), Math.sin(b)];
    const rotate1 = new Matrix(
        [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, cb, -sb],
            [0, 0, sb, cb]
        ]
    )
    const rotate2 = new Matrix(
        [
            [1, 0, 0, 0],
            [0, cb, 0, -sb],
            [0, 0, 1, 0],
            [0, sb, 0, cb]
        ]
    )
    
    const rpoints = points.map(p => rotate1.apply(p));
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
    ctx.stroke();

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

(function draw(time) {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //restore path
    //update path
    //save
    drawPoints(points, time*1/1520,time*1/1500, ctx);
    
})(0);