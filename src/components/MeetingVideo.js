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

      // Create a URL for the MP4 Blob
      const videoUrl = URL.createObjectURL(recordedBlob);

      // Set the src attribute of the video element to the MP4 URL
      if (videoRef.current) {
        videoRef.current.src = videoUrl;
        videoRef.current.controls = true;
      }

      const url = "http://127.0.0.1:8000/api/score/"; //when you run your backend use the url and port specified  (add any extra paths necessary to point to the api)

      const payload = {
        //make a javascript object with all the required fields
        video: videoUrl, //replace with download link
      };

      const request = {
        //construct your HTTP POST request
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(payload), // Convert the 'payload' object to JSON format
      };

      fetch(url, request) //actually sends the http request above to url
        .then((response) => response.json()) //response.json contains the body of your backend's response message (which you must specify)
        .then((data) => {
          // Handle the response from the server here
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch request
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
