import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const InternetConnectionError = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Check if the user is online or offline
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      // Show the SweetAlert popup when the user goes offline
      Swal.fire({
        title: 'No Internet Connection',
        text: 'You have lost your internet connection. Please check your network.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    };

    // Event listeners for online and offline status
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup the event listeners when component is unmounted
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {/* You can conditionally render the connection status */}
      {!isOnline && (
        <p style={{ color: 'red' }}>You are currently offline. Please check your connection.</p>
      )}
    </div>
  );
};

export default InternetConnectionError;
