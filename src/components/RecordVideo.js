import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useRecordWebcam } from "react-record-webcam";
import camera_placeholder from "../images/camera_placeholder.png";

function RecordVideo(props) {
  const [status, setStatus] = useState("");

  //Set variable to hold the input value
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const videoRef = useRef(null);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const recordWebcam = useRecordWebcam({
    frameRate: 60,
    width: 1920,
    height: 1080,
    mimeType: "video/webm",
  });

  const saveFile = async () => {
    try {
      // Get the recorded video as a Blob
      const recordedBlob = await recordWebcam.getRecording();

      const url = "http://127.0.0.1:8000/api/register/"; //when you run your backend use the url and port specified  (add any extra paths necessary to point to the api)

      const formData = new FormData();
      formData.append("blob_file", recordedBlob);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);

      // Make an HTTP POST request using formData
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (e) {
      console.log(e); //just looking out for errors in this whole function
    }
  };

  useEffect(() => {
    setStatus(recordWebcam.status);
  }, [recordWebcam.status]);

  return (
    <div
      id=" main-container"
      className="mx-2 text-white pt-3 px-10 h-screen overflow-y-scroll"
    >
      <div className="flex flex-column justify-between">
        <p>
          Camera status:{" "}
          <span className={status === "RECORDING" ? "text-red" : ""}>
            {status}
          </span>
        </p>

        {status !== "CLOSED" && (
          <button
            className="bg-green-400 py-2 rounded-[20px] font-bold text-[16px] text-black w-[15%] items-center mb-3"
            onClick={recordWebcam.close}
          >
            CLOSE CAMERA
          </button>
        )}
      </div>
      <div
        id="buttons_and_preview"
        className="flex flex-row justify-between font-poppins items-start"
      >
        {status !== "CLOSED" ? (
          <div>
            <div className="my-5 border w-[120%] pl-2">
              <input
                className="bg-green-950 py-2 text-[17px]"
                placeholder="ENTER FIRSTNAME"
                value={firstName}
                onChange={handleFirstNameChange}
              ></input>
            </div>
            <div className="my-5 border w-[120%] pl-2">
              <input
                className="bg-green-950 py-2 text-[17px]"
                placeholder="ENTER LASTNAME"
                value={lastName}
                onChange={handleLastNameChange}
              ></input>
            </div>
            <div className="my-5 border w-[120%]  pl-2">
              <input
                className="bg-green-950 py-2 text-[17px]"
                placeholder="ENTER EMAIL"
                value={email}
                onChange={handleEmailChange}
              ></input>
            </div>
            <div className="flex flex-col">
              <button
                className="bg-green-400 py-2 rounded-[20px] font-bold text-[16px] text-black w-[110%] my-2"
                onClick={saveFile}
              >
                REGISTER DETAILS
              </button>

              <button
                className="bg-green-400 py-2 rounded-[20px] font-bold text-[16px] text-black w-[110%] my-2"
                onClick={recordWebcam.start}
              >
                START RECORDING
              </button>
              <button
                className="bg-green-400 py-2 rounded-[20px] font-bold text-[16px] text-black w-[110%] my-2"
                onClick={recordWebcam.stop}
              >
                STOP RECORDING
              </button>
              <button
                className="bg-green-400 py-2 rounded-[20px] font-bold text-[16px] text-black w-[110%] my-2"
                onClick={recordWebcam.retake}
              >
                DISCARD RECORDING
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black px-20 my-3"
              onClick={recordWebcam.open}
            >
              OPEN CAMERA
            </button>
          </div>
        )}

        {status !== "CLOSED" && (
          <div id="video_container" className="w-[50%]">
            {status !== "PREVIEW" && (
              <video ref={recordWebcam.webcamRef} autoPlay muted />
            )}
            {status !== "OPEN" && (
              <video ref={recordWebcam.previewRef} autoPlay muted loop />
            )}
          </div>
        )}
      </div>
      {status === "CLOSED" && (
        <div className="">
          <img
            src={camera_placeholder}
            className="w-[40%] absolute top-60 right-20 mr-10"
          />
        </div>
      )}
    </div>
  );
}

export default RecordVideo;
