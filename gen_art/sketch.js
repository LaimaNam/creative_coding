const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
  // orientation: 'landscape',
  // units: 'cm',
  // pixelsPerInch: 300,
};

// const sketch = () => {
//   return ({ context, width, height }) => {
//     console.log(width, height);
//     context.fillStyle = 'orange';
//     context.fillRect(0, 0, width, height);

//     context.beginPath();
//     context.arc(width / 2, height / 2, width * 0.2, 0, Math.PI * 1, false);
//     context.fillStyle = 'blue';
//     context.fill();
//     context.lineWidth = width * 0.01;
//     context.strokeStyle = 'pink';
//     context.stroke();
//   };
// };

// canvasSketch(sketch, settings);

//  ---------------------------------------------->

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 15;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 150 : x / (count - 1);
        const v = count <= 1 ? 150 : y / (count - 1);

        points.push({
          radius: random.value() * 0.08, //dydis burbulo
          position: [u, v],
        });
      }
    }

    return points;
  };

  // random.setSeed(210);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = '';
    context.fillRect(1000, 20, width, height);

    points.forEach((data) => {
      const { position, radius } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      const radiusMaster = radius;
      const startAngle = 2;
      const endAngle = Math.PI * 5;
      const counterclockwise = false;

      context.beginPath();
      context.arc(
        x,
        y,
        radiusMaster * width,
        startAngle,
        endAngle,
        counterclockwise
      );
      context.strokeStyle = 'white';
      // context.lineWidth = 20;
      context.fillStyle = '#d5b8ff';
      context.fill();
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
