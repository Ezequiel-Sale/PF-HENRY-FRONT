"use client"
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

interface QrScannerProps {
  delay?: number;
  style?: object;
}

const QrScannerComponent: React.FC<QrScannerProps> = ({ delay = 300, style = { height: 240, width: 320 } }) => {
  const [data, setData] = useState<string | null>(null);

  const handleScan = (result: any) => {
    if (result) {
      setData(result.text);
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">QR Code Reader</h1>
      <div className="mt-4">
        <QrScanner
          delay={delay}
          style={style}
          onError={handleError}
          onScan={handleScan}
        />
      </div>
      {data && (
        <p className="mt-4 text-xl">Scanned Data: {data}</p>
      )}
    </div>
  );
};

export default QrScannerComponent;
