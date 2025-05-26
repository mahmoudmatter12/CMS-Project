// components/auth/FaceLogin.tsx
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

export default function FaceLogin() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [model, setModel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState('');

  useEffect(() => {
    async function loadModels() {
      await tf.ready();
      const faceModel = await blazeface.load();
      setModel(faceModel);
      setIsLoading(false);
      
      // Start video stream
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    }
    
    loadModels();
    
    return () => {
      if (videoRef.current?.srcObject) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndVerify = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Draw video frame to canvas
    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Detect faces
    const predictions = await model.estimateFaces(videoRef.current);
    
    if (predictions.length > 0) {
      // Here you would compare with registered face embeddings
      // For demo purposes, we'll just check if a face is detected
      setLoginStatus('Face detected! Verifying...');
      
      // Simulate verification
      setTimeout(() => {
        setLoginStatus('Login successful!');
        // Redirect to dashboard
        window.location.href = '/user/dashboard';
      }, 1500);
    } else {
      setLoginStatus('No face detected. Please try again.');
    }
  };

  return (
    <div className="face-login-container">
      {isLoading ? (
        <p>Loading face recognition model...</p>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline muted width="400" height="300" />
          <canvas ref={canvasRef} width="400" height="300" style={{display: 'none'}} />
          <button onClick={captureAndVerify}>Verify Face</button>
          {loginStatus && <p>{loginStatus}</p>}
        </>
      )}
    </div>
  );
}