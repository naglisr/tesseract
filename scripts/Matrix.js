function Matrix(n){
    this.entries=n;
}

Matrix.prototype.multiply=function(M){
    const newM=[];
    for(i=0; i<M.entries.length; i++){
        newM[i]=[];
        for(j=0; j<M.entries.length; j++){
            let sum = 0;
            for(k=0; k<M.entries.length; k++)
                sum+=this.entries[i][k]*M.entries[k][j];
            newM[i][j]=sum;
        }
    }
    return new Matrix(newM);
}

Matrix.prototype.apply=function({v}){  
    const newV = [];
    for(i=0; i<v.length; i++){
        let sum = 0;
        for(j=0; j<v.length; j++)
            sum += this.entries[i][j] * v[j];
        newV[i] = sum;
    }

    return new Vector(newV);
}

