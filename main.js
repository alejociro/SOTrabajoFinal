const fs = require('fs');
const path = require('path');

function calcularFibonacci(n) {
  if (n < 2) {
    return n;
  }
  return calcularFibonacci(n - 1) + calcularFibonacci(n - 2);
}

function escribirYLeerArchivo(iteraciones) {
  let totalLength = 0;
  for (let i = 0; i < iteraciones; i++) {
    const contenido = 'Datos de prueba '.repeat(10000); // Genera una cadena grande
    const nombreArchivo = path.join(__dirname, `archivo_prueba_${i}.txt`);

    fs.writeFileSync(nombreArchivo, contenido);
    const leido = fs.readFileSync(nombreArchivo, 'utf8');
    fs.unlinkSync(nombreArchivo); // Elimina el archivo después de leerlo
    totalLength += leido.length;
  }
  return totalLength;
}

function realizarCalculosIntensivos() {
  let suma = 0;
  for (let i = 0; i < 1000000; i++) {
    suma += Math.sqrt(i);
  }
  return suma;
}

// Parámetros configurables
const numeroFibonacci = 35; // Ajusta este valor según sea necesario
const iteracionesArchivo = 50; // Número de veces que se abre y escribe en el archivo

console.time('Tiempo de cálculo total');
const resultadoFibonacci = calcularFibonacci(numeroFibonacci);
const tamanoArchivo = escribirYLeerArchivo(iteracionesArchivo);
const resultadoCalculos = realizarCalculosIntensivos();
console.timeEnd('Tiempo de cálculo total');

console.log(`Resultado Fibonacci: ${resultadoFibonacci}`);
console.log(`Tamaño total de datos procesados en archivos: ${tamanoArchivo}`);
console.log(`Resultado de cálculos intensivos: ${resultadoCalculos}`);
