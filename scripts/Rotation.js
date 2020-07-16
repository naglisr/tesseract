function rotation(angs) {
    const matrices = [];
    angs.forEach((row, i) => {
        row.forEach((ang, j) => {
            const [c, s] = [Math.cos(ang), Math.sin(ang)];
            const m = [];
            for (a = 0; a < 4; a++) {
                m.push([]);
                for (b = 0; b < 4; b++) {
                    switch (a) {
                        case (i):
                            switch (b) {
                                case (i): m[a][b] = c;
                                    break;
                                case (j): m[a][b] = -s;
                                    break;
                                default: m[a][b] = 0;

                            }
                            break;
                        case (j):
                            switch (b) {
                                case (i): m[a][b] = s;
                                    break;
                                case (j): m[a][b] = c;
                                    break;
                                default: m[a][b] = 0;
                            }
                            break;
                        default: {
                            if (a == b) m[a][b] = 1;
                            else m[a][b] = 0;
                        }
                    }

                }
            }
            matrices.push(new Matrix(m));
        });
    });

    return matrices.reduce((a, c) => a.multiply(c));
  
}
