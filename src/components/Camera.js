import React, { useState, useRef } from "react";

import Webcam from "react-webcam";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const Camera = () => {
  //Set variable to hold the input value
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const webcamRef = useRef(null);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [imageSrc, setImageSrc] = useState(null);

  const capturePhoto = React.useCallback(async () => {
    const capturedImageSrc = webcamRef.current.getScreenshot();
    setImageSrc(capturedImageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  const handleSubmit = () => {
    try {
      const url = "http://127.0.0.1:8000/api/identify/";

      const payload = {
        image_file: imageSrc,
        first_name: firstName,
        last_name: lastName,
        email: email,
      };

      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle the response from the server here, e.g., show a success message
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle any errors that occur during the fetch request, e.g., show an error message
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row justify-between h-screen overflow-y-auto">
      <div className="flex flex-col my-10 ml-[10pt]">
        <div className="my-2 border pl-5 w-[110%]">
          <input
            className="bg-green-950 py-2 text-[20px]"
            placeholder="ENTER FIRSTNAME"
            value={firstName}
            onChange={handleFirstNameChange}
          ></input>
        </div>
        <div className="my-2 border pl-5 w-[110%]">
          <input
            className="bg-green-950 py-2 text-[20px]"
            placeholder="ENTER LASTNAME"
            value={lastName}
            onChange={handleLastNameChange}
          ></input>
        </div>
        <div className="my-2 border pl-5 w-[110%]">
          <input
            className="bg-green-950 py-2 text-[20px]"
            placeholder="ENTER EMAIL"
            value={email}
            onChange={handleEmailChange}
          ></input>
        </div>
        <div className="flex flex-col mt-10">
          <button
            className="bg-green-400 py-2 rounded-[20px] font-bold text-[16px] text-black w-[100%] my-2 bottom-40"
            onClick={handleSubmit}
          >
            LOGIN
          </button>
          <button
            className="bg-green-400 py-2 rounded-[20px] font-bold text-[16px] text-black min-w-[100%] my-2"
            onClick={capturePhoto}
          >
            CAPTURE IMAGE
          </button>

          <button
            className="bg-green-400 py-2 rounded-[20px] font-bold text-[16px] text-black min-w-[100%] my-2"
            onClick={() => setImageSrc(null)}
          >
            REFRESH
          </button>
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

        {imageSrc && (
          <div>
            <img src={imageSrc} alt="Screenshot" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
