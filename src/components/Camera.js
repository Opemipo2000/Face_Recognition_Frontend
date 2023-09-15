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
    <div className="flex flex-row justify-between h-screen overflow-y-auto">
      <div className="flex-row my-20 ml-[10pt]">
        <div className="flex-row my-5 border pl-5">
          <input
            className="bg-green-950 py-2 text-[20px] font-poppins"
            placeholder="ENTER FIRSTNAME"
          ></input>
        </div>
        <div className="flex-row my-5 border pl-5">
          <input
            className="bg-green-950 py-2 text-[20px] font-mono "
            placeholder="ENTER LASTNAME"
          ></input>
        </div>
        <div className="flex-row my-5 border pl-5">
          <input
            className="bg-green-950 py-2 text-[20px] font-mono "
            placeholder="ENTER EMAIL"
          ></input>
        </div>
      </div>
      <div>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
          mirrored={true}
          className="absolute right-0 w-[60%] min-h-[30%] max-h-[50%]"
        />

        <div className="absolute bottom-20 mt-10 flex flex-row right-40 mr-[300px]">
          <button
            className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black min-w-[100%] my-3"
            onClick={capturePhoto}
          >
            CAPTURE IMAGE
          </button>
          <br />
          <button
            className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black min-w-[100%] my-3 ml-5"
            onClick={() => setUrl(null)}
          >
            REFRESH
          </button>
        </div>

        {url && (
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        )}
      </div>

      <button
        className="absolute bg-green-400 py-3 ml-4 rounded-[20px] font-bold text-[16px] text-black w-[20%] my-3 bottom-40"
        onClick={capturePhoto}
      >
        LOGIN
      </button>
    </div>
  );
};

export default Camera;
