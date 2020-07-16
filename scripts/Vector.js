class Vector {
    static pol(r, θ) {
        return new Vector([r*Math.cos(θ), r*Math.sin(θ)]);
    }

    constructor(v) {
        this.v = v;
    }

    scale(n) {
        return new Vector(
            this.v.map(x => n * x)
        );
    }
    add(that) {
        return new Vector(
            this.v.map((x, i) => x + that.v[i])
        );
    }
    minus(that) {
        return new Vector(
            this.v.map((x, i) => x - that.v[i])
        );
    }

    inner(that) {
        return this.v
            .map((x, i) => x * that.v[i])
            .reduce((a, b) => a + b);
    }
    cross(that) {
        return new Vector(
            [1, 2, 0].map(i =>
                this.v[i] * that.v[ (i+1)%3 ]
                -that.v[i] * this.v[ (i+1)%3 ]
            )
        );
    }

    get len() {
        return Math.sqrt(this.inner(this));
    }
    get norm() {
        return this.scale(1 / this.len);
    }
}

function V(...args) {
    return new Vector(args);
}