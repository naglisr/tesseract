class Camera {
    constructor(p, f, v, w, h) {
        this.pos = p;
        this.foc = f;
        this.fov = Math.tan(v);
        this.width = w;
        this.height = h;

        const dir = f.minus(p);
        const pan = Math.atan2(dir.v[1], dir.v[0]);
        const tilt = Math.asin(dir.v[2] / dir.len);

        const [cp, sp] = [Math.cos(pan), Math.sin(pan)];
        const unpan = new Matrix(
            [
                [cp, sp, 0],
                [-sp, cp, 0],
                [0, 0, 1]
            ]
        );

        const [ct, st] = [Math.cos(tilt), Math.sin(tilt)];
        const untilt = new Matrix(
            [
                [ct, 0, st],
                [0, 1, 0],
                [-st, 0, ct]
            ]
        );

        this.matrix = untilt.multiply(unpan);
    }

    project(p) {
        const disp = p.minus(this.pos);
        const { v: [x, y, z] } = this.matrix.apply(disp);

        const X = (-y / (x * this.fov) + 1) * this.width / 2;
        const Y = (-z / (x * this.fov) + this.height / this.width) * this.width / 2;

        return { X, Y };
    }

    projTo3d(v1) {
        const v2 = V(...this.matrix.entries[0]).norm.scale(v1.v[3]);
        return v2.add(v1);
    }

    projTo3d2(u){
        return V(u.v[0]+(1/3)*u.v[3], u.v[1]+(1/3)*u.v[3],u.v[2]+(1/3)*u.v[3]);
    }
}