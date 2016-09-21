var ndarray = require('ndarray');
var ops = require('ndarray-ops');
var cwise = require('cwise');
var gemm = require('ndarray-gemm');

var cwise_copy = cwise({
    args: ['array', 'array'],
    body: function (a,b) {
        b = a
    }
});
function copy(A) {
    var B = ndarray(new Float64Array(A.size), A.shape);
    cwise_copy(A,B);
    return B;
}
function multiply(A,B) {
    var C = ndarray(new Float64Array(A.shape[0] * B.shape[1]), [A.shape[0], B.shape[1]]);
    gemm(C, A, B);
    return C;
}

function closure(N) {
    var A = ndarray(new Float64Array(N*N), [N,N]);

    for (var ii = 1; ii <= N; ++ii) {
        for (var jj = 1; jj <= N; ++jj) {
            if (ii * jj < (N/2)) {
                A.set(N-ii-1, ii+jj-1, 1);
                A.set(ii-1, N-ii-jj-1, 1);
            }
            if (ii === jj) {
                A.set(ii-1, jj-1, 1);
            }
        }
    }

    var B = copy(A);

    var ii1 = N/2;
    while (ii1>=1) {
        B = multiply(B,B);
        ii1=ii1/2;
    }

    var B1 = copy(B);
    ops.gtseq(B1, 0);

    return B1;
}
