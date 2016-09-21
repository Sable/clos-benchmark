function runner (scale) {
    if (typeof performance === "undefined") {
       performance = Date;
    }

    var N = 450;

    // Run kernel and measure time for core computation 
    var startTime = performance.now();
    for (var i = 0; i < scale; ++i) {
        var B = closure(N);
    }
    var elapsedTime = (performance.now() - startTime) / 1000;

    console.log('{' +
    '    "time": ' + elapsedTime + 
    ',   "output": ' + fletcher_sum_ndarray(B) +
    '}');
}
