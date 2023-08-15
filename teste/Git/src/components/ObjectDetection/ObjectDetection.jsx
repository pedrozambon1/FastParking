import React, { useRef, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runObjectDetection = async () => {
      // Carregando o modelo pré-treinado
      const model = await cocoSsd.load();

      // Loop para detecção em tempo real
      setInterval(() => {
        detectObjects(model);
      }, 100);
    };

    runObjectDetection();
  }, []);

  const detectObjects = async (model) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      // Capturando a imagem do frame da webcam
      const image = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Ajustando as dimensões do canvas
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Realizando a detecção de objetos na imagem
      const predictions = await model.detect(image);

      // Desenhando os resultados na imagem
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, videoWidth, videoHeight);
      // Definindo estilos de desenho
      ctx.font = '16px Arial';
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;

      // Iterando sobre as previsões e desenhando retângulos
      predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction.bbox;
        const text = `${prediction.class} - ${Math.round(prediction.score * 100)}%`;
        // Desenhando retângulo delimitador
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
        // Preenchendo retângulo com texto
        ctx.fillRect(x, y - 20, ctx.measureText(text).width + 8, 20);
        ctx.fillStyle = '#000';
        ctx.fillText(text, x + 4, y - 4);
      });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Webcam ref={webcamRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
};

export default ObjectDetection;
