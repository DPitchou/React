'use server'

import os from 'os';
import QRCode from 'qrcode';


export async function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
  
    for (const interfaceName in interfaces) {
      for (const net of interfaces[interfaceName] || []) {
        if (net.family === "IPv4" && !net.internal) {
          return net.address;
        }
      }
    }
    
    return "127.0.0.1"; // Fallback si aucune IP trouvée
  }

export async function QrCode() {
    const ip = await getLocalIpAddress();
    const url = `http://${ip}:3000`;

    try {
        const qrCodeDataUrl = await QRCode.toDataURL(url);
        return qrCodeDataUrl;

    } catch (error) {
        console.error(error);
    }
} 



  

