class Camera {
    constructor(p, f, v, w, h) {
        this.pos = p;
        this.foc = f;
        this.fov = Math.tan(v);

        this.W = w;
        this.H = h;

        /**Create orthonormal frame with
         * "Z" axis pointing in dir of cam gaze &
         * "X", "Y" axes in dir of those of canvas
         */
        let Z = f.minus(p).norm;
        let X = Z.cross(V(0,0,1)).norm;
        let Y = Z.cross(X);

        this.frame = [X,Y,Z];
    }

    project(p) {
        const dis = p.minus(this.pos);
        const [x, y, z] = this.frame.map(f => dis.inner(f));
        const dep = this.W / this.fov / z;

        const X = (this.W + x*dep) / 2;
        const Y = (this.H + y*dep) / 2;

        return { X, Y };
    }

    projTo3d(v1) {
        const v2 = this.frame[2].scale(v1.v[3]);
        return v2.add(v1);
    }

    projTo3d2( {v: [x,y,z,w]} ){
        return V(x+w/3, y+w/3, z+w/3);
    }
}