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
    mimeType: "video/mp4",
  });

  const saveFile = async () => {
    try {
      // Get the recorded video as a Blob
      const recordedBlob = await recordWebcam.getRecording();

      // Convert the Blob to an MP4 file
      const mp4Blob = await convertToMP4(recordedBlob);

      // Create a URL for the MP4 Blob
      const mp4Url = URL.createObjectURL(mp4Blob);

      // Set the src attribute of the video element to the MP4 URL
      if (videoRef.current) {
        videoRef.current.src = mp4Url;
        videoRef.current.controls = true;
      }

      const url = "http://127.0.0.1:8000/facerecog/api/v0/register"; //when you run your backend use the url and port specified  (add any extra paths necessary to point to the api)

      const payload = {
        //make a javascript object with all the required fields
        video: mp4Url, //replace with download link
        first_name: firstName, //you would need to replace these with variables
        last_name: lastName,
        email: email,
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

  const convertToMP4 = async (webmBlob) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(webmBlob);

      video.onloadedmetadata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");

        const stream = canvas.captureStream();
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/mp4",
        });
        const chunks = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const mp4Blob = new Blob(chunks, { type: "video/mp4" });
          resolve(mp4Blob);
        };

        mediaRecorder.start();
        video.play();
        setTimeout(() => {
          mediaRecorder.stop();
        }, recordWebcam.getDuration() * 1000);
      };
    });
  };

  return (
    <div
      id=" main-container"
      className="mx-2 text-white px-10 h-screen overflow-y-auto"
    >
      <p>Camera status: {status}</p>

      <div id="buttons_and_preview" className="mt-10 flex flex-row">
        <div id="buttons" className="flex-column my-10">
          {status !== "CLOSED" ? (
            <div className="ml-20">
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2"
                onClick={recordWebcam.close}
              >
                CLOSE CAMERA
              </button>
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2"
                onClick={recordWebcam.start}
              >
                START RECORDING
              </button>
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2"
                onClick={recordWebcam.stop}
              >
                STOP RECORDING
              </button>
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2"
                onClick={recordWebcam.retake}
              >
                RETAKE RECORDING
              </button>
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2"
                onClick={recordWebcam.download}
              >
                DOWNLOAD RECORDING
              </button>
              <button
                className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2"
                onClick={saveFile}
              >
                SEND TO SERVER
              </button>
              <div className="flex-row my-5 border">
                <input
                  className="bg-green-950 py-2 text-[20px] font-mono"
                  placeholder="ENTER FIRSTNAME"
                  value={firstName}
                  onChange={handleFirstNameChange}
                ></input>
              </div>
              <div className="flex-row my-5 border">
                <input
                  className="bg-green-950 py-2 text-[20px] font-mono"
                  placeholder="ENTER LASTNAME"
                  value={lastName}
                  onChange={handleLastNameChange}
                ></input>
              </div>
              <div className="flex-row my-5 border">
                <input
                  className="bg-green-950 py-2 text-[20px] font-mono"
                  placeholder="ENTER EMAIL"
                  value={email}
                  onChange={handleEmailChange}
                ></input>
              </div>
            </div>
          ) : (
            <div className="ml-20">
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
            <video ref={recordWebcam.webcamRef} autoPlay muted />
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

export default RecordVideo;
