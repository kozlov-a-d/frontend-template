type BenchmarkType = {
    name: string;
    timeStart: number;
    timeEnd: number | null;
};

const Benchmarks = (() => {
    let debagMode: boolean = false;
    const benchmarks: BenchmarkType[] = [];

    const enable = () => {
        debagMode = true;
    };

    const start = (name: string) => {
        if (!debagMode) return;
        benchmarks.push({
            name: name,
            timeStart: performance.now(),
            timeEnd: null,
        });
    };

    const end = (name: string) => {
        if (!debagMode) return;
        let isBenchmarExist = false;
        benchmarks.forEach((benchmark) => {
            if (benchmark.name === name) {
                benchmark.timeEnd = performance.now();
                isBenchmarExist = true;
            }
        });
        if (!isBenchmarExist) throw new Error(`Benchmark "${name}" is not exist`);
    };

    const info = () => {
        if (!debagMode) return;
        benchmarks.forEach((benchmark) => {
            if (benchmark.timeEnd !== null)
                console.info(
                    `[benchmark] "${benchmark.name}" - ${(benchmark.timeEnd - benchmark.timeStart).toFixed(4)} ms.`
                );
        });
        benchmarks.splice(0, benchmarks.length);
    };

    return Object.freeze({
        enable,
        start,
        end,
        info,
    });
})();

export default Benchmarks;
