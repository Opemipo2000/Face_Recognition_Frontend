import React, { useState, useRef } from "react";

import Webcam from "react-webcam";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const Camera = () => {
  const webcamRef = useRef(null);

  const [url, setUrl] = useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <div className="my-10 flex flex-row justify-between">
            <div className="ml-10 mt-10">
      <button className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[200%] my-3" onClick={capturePhoto}>CAPTURE IMAGE</button><br />
      <button className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[200%] my-3" onClick={() => setUrl(null)}>REFRESH</button>
      </div>

      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={true}
        className="absolute right-20 top-20 mt-20"
      />

      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </div>
  );
};

export default Camera;
