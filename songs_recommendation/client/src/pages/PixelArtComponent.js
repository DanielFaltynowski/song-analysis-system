import React, { useEffect } from 'react';

const PixelArtComponent = () => {
  useEffect(() => {
    // Function to generate a random emerald shade
    const generateRandomEmeraldShade = () => {
      const randomValue = Math.floor(Math.random() * 256);
      return `rgb(0, ${randomValue}, 0)`;
    };

    // Get the pixel art container
    const pixelArtContainer = document.getElementById('pixelArtContainer');

    // Generate pixel art (5x5 grid for example)
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.backgroundColor = generateRandomEmeraldShade();
        pixelArtContainer.appendChild(pixel);
      }
    }
  }, []); // Run only once when the component mounts

  return (
    <div className="h-20 w-20 bg-emerald-200 rounded-lg p-5">
      <div id="pixelArtContainer" className="grid grid-cols-5 gap-1"></div>
    </div>
  );
};

export default PixelArtComponent;
