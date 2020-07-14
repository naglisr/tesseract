class Camera {
    constructor(p, f, v, w, h) {
        this.pos = p;

        this.W = w;
        this.H = h;

        /**Create orthonormal frame with
         * "Z" axis pointing in dir of cam gaze &
         * "X", "Y" axes in dir of those of canvas
         * 
         * depth vector adjusts Z for FOV & canvas width
         */
        this.Z = f.minus(p).norm;
        const X = this.Z.cross(V(0,0,1)).norm;
        const Y = this.Z.cross(X);

        const dep = this.Z.scale(Math.tan(v) / this.W)
        this.frame = [X,Y,dep];
    }

    project(p) {
        const dis = p.minus(this.pos);
        const [x, y, dep] = this.frame.map(f => dis.inner(f));

        const X = (this.W + x/dep) / 2;
        const Y = (this.H + y/dep) / 2;

        return { X, Y };
    }

    projTo3d(v1) {
        const v2 = this.Z.scale(v1.v[3]);
        return v2.add(v1);
    }

    projTo3d2( {v: [x,y,z,w]} ){
        return V(x+w/3, y+w/3, z+w/3);
    }
}