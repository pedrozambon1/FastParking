import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [isCollision, setIsCollision] = useState(false);

  const blueBoxX = 100;
  const blueBoxY = 100;
  const blueBoxSize = 50;

  useEffect(() => {
    const runObjectDetection = async () => {
      const model = await cocoSsd.load();
      setInterval(() => {
        detectObjects(model);
      }, 100);
    };

    runObjectDetection();
  }, []);

  const detectObjects = async (model) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const image = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const predictions = await model.detect(image);

      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      let hasCollision = false;
      predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction.bbox;

        // Check if the object is a "carro"
        if (prediction.class === 'car') {
          // Check for collision with the blue box
          if (
            x < blueBoxX + blueBoxSize &&
            x + width > blueBoxX &&
            y < blueBoxY + blueBoxSize &&
            y + height > blueBoxY
          ) {
            hasCollision = true;
          }
        }

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = hasCollision ? '#ff0000' : '#00ff00';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = hasCollision ? '#ff0000' : '#00ff00'; // Color for text
        ctx.fillRect(x, y - 20, ctx.measureText(prediction.class).width + 8, 20);
        ctx.fillStyle = '#000';
        ctx.fillText(prediction.class, x + 4, y - 4);
      });

      setIsCollision(hasCollision);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Webcam ref={webcamRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />

      {/* Highlight blue box */}
      <div
        style={{
          position: 'absolute',
          border: isCollision ? '2px solid red' : '2px solid blue',
          boxSizing: 'border-box',
          transform: `translate(${blueBoxX}px, ${blueBoxY}px)`,
          width: blueBoxSize + 'px',
          height: blueBoxSize + 'px',
        }}
      />
    </div>
  );
};

export default ObjectDetection;
