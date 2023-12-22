'use client'
import React ,{ useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import axios from 'axios';

export default function Home() {
  const [qrCodeData, setQrCodeData] = useState('');
  const [token, settoken] = useState('');


  // Fetch QR code data from the API
  const fetchQRCodeData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/2faauth');
      // console.log(response);
      setQrCodeData(response.data);
    } catch (error) {
      console.error('Error fetching QR code data:', error);
    }
  };
  const verifytoken = async () => {
    try {
      const postdata = {
        data : token
      }
      const response = await axios.post('http://localhost:8080/verify',postdata);
      console.log(response);
      // setQrCodeData(response.data);
    } catch (error) {
      console.error('Error fetching QR code data:', error);
    }
  };

  return (
  
    <div className={styles.container}>
      <button onClick={fetchQRCodeData}>Fetch QR Code Data</button>

      {qrCodeData && (
        <>
          <Image
            src={`${qrCodeData}`}
            alt="QR Code"
            width={200}
            height={200}
          />
         
        </>
        
      )}
       <input type='number' onChange={(e)=>{settoken(e.target.value),console.log(token)}}></input>
         <button onClick={verifytoken}>submit</button>
    </div>
  );
}
