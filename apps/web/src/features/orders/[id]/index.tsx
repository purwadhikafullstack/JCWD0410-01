'use client'
import React, { useEffect } from 'react'

const OrderDetailPage = () => {

  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';  
  
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
  
    const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY!;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
  
    document.body.appendChild(scriptTag);
  
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);

  return (
    <div>OrderDetailPage</div>
  )
}

export default OrderDetailPage