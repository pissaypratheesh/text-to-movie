import React, { useState } from 'react';
import ImageSelection from '../components/ImageSelection';
import VideoSelection from '../components/VideoSelection';

function HomePage() {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div>
      {step === 0 && (
        <>
          <ImageSelection />
          <button onClick={handleNextStep}>Next</button>
        </>
      )}
      {step === 1 && <VideoSelection />}
    </div>
  );
}

export default HomePage;
//
