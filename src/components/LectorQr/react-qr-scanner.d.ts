declare module 'react-qr-scanner' {
    import { Component } from 'react';
  
    interface QrScannerProps {
      delay?: number;
      style?: object;
      onError?: (error: any) => void;
      onScan?: (data: any) => void;
      facingMode?: string;
    }
  
    export default class QrScanner extends Component<QrScannerProps> {}
  }
  