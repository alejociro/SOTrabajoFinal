const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { performance, PerformanceObserver } = require('perf_hooks');

// Utilidad para medir el tiempo de ejecución
const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
  });
});
performanceObserver.observe({ entryTypes: ['measure'] });

function calculeFibonacci(n) {
  if (n < 2) {
    return n;
  }
  return calculeFibonacci(n - 1) + calculeFibonacci(n - 2);
}

function writeFileAsync(content, filename) {
  return fs.promises.writeFile(filename, content);
}

function readFileAsync(filename) {
  return fs.promises.readFile(filename, 'utf8');
}

function deleteFileAsync(filename) {
  return fs.promises.unlink(filename);
}

async function writeAndReadFileAsync(iterations) {
  let length = 0;
  for (let i = 0; i < iterations; i++) {
    const content = 'Datos de prueba '.repeat(10000);
    const filename = path.join(__dirname, `archivo_prueba_${i}.txt`);

    await writeFileAsync(content, filename);
    const readed = await readFileAsync(filename);
    await deleteFileAsync(filename);

    length += readed.length;
  }
  return length;
}

function getCalcules() {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += Math.sqrt(i);
  }
  return sum;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el número para el cálculo de Fibonacci: ', async (numFib) => {
  const numberFibonacci = parseInt(numFib, 10);

  rl.question('Ingrese el número de iteraciones para las operaciones de archivo: ', async (numIter) => {
    const iterationsFile = parseInt(numIter, 10);

    console.time('Tiempo de cálculo total');
    performance.mark('inicioFibonacci');
    const resultFibonacci = calculeFibonacci(numberFibonacci);
    performance.mark('finFibonacci');
    performance.measure('Tiempo Fibonacci', 'inicioFibonacci', 'finFibonacci');

    performance.mark('inicioArchivo');
    const lengthFile = await writeAndReadFileAsync(iterationsFile);
    performance.mark('finArchivo');
    performance.measure('Tiempo Archivo', 'inicioArchivo', 'finArchivo');

    performance.mark('inicioCalculos');
    const resultCalcules = getCalcules();
    performance.mark('finCalculos');
    performance.measure('Tiempo Calculos', 'inicioCalculos', 'finCalculos');

    console.timeEnd('Tiempo de cálculo total');

    console.log(`Resultado Fibonacci: ${resultFibonacci}`);
    console.log(`Tamaño total de datos procesados en archivos: ${lengthFile}`);
    console.log(`Resultado de cálculos intensivos: ${resultCalcules}`);

    // Registro del uso de memoria
    console.log(`Uso de memoria: ${JSON.stringify(process.memoryUsage())}`);

    rl.close();
  });
});
