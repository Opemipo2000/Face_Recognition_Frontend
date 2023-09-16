import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useRecordWebcam } from "react-record-webcam";
import camera_placeholder from "../images/camera_placeholder.png";

function MeetingVideo(props) {
  const [status, setStatus] = useState("");

  //Set variable to hold the input value
  const videoRef = useRef(null);

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

      // Check if the Blob is valid
      if (!recordedBlob) {
        console.error("Recorded blob is null or undefined.");
        return;
      }

      const url = "http://127.0.0.1:8000/api/score/"; //when you run your backend use the url and port specified  (add any extra paths necessary to point to the api)

      const formData = new FormData();
      formData.append("blob_file", recordedBlob); // 'file' is the File object you want to upload

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
      className="mx-2 text-white px-10 h-screen overflow-y-auto"
    >
      <p>Camera status: {status}</p>

      <div id="buttons_and_preview" className="mt-10 flex flex-row">
        <div id="buttons" className="flex-column my-10">
          {status !== "CLOSED" ? (
            <div>
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[60%] my-2"
                onClick={recordWebcam.close}
              >
                CLOSE CAMERA
              </button>
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[60%] my-2"
                onClick={recordWebcam.start}
              >
                START RECORDING
              </button>
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[60%] my-2"
                onClick={recordWebcam.stop}
              >
                STOP RECORDING
              </button>
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[60%] my-2"
                onClick={saveFile}
              >
                END MEETING
              </button>
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
        </div>

        {status !== "CLOSED" && (
          <div id="video_container" className="w-[50%] mt-10">
            {status !== "PREVIEW" && (
              <video ref={recordWebcam.webcamRef} autoPlay muted />
            )}
            <video ref={recordWebcam.previewRef} autoPlay muted loop />
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

export default MeetingVideo;
