import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRecordWebcam } from "react-record-webcam";
import camera_placeholder from "../images/camera_placeholder.png"


function RecordVideo(props) {

  const [status, setStatus] = useState('');

  const recordWebcam = useRecordWebcam({
    frameRate: 60,
    width: 1920,
    height: 1080,
    mimeType: "video/mp4",
  });

  const saveFile = async () => {
    const blob = await recordWebcam.getRecording();
    console.log(blob);
  };

  useEffect(() => {
    setStatus(recordWebcam.status)

    }, [recordWebcam.status]);

  return (
    <div id='main-container' className="mx-2 text-white px-10">
      <p>Camera status: {status}</p>
  
    <div id='buttons_and_preview' className="mt-10 flex flex-row">
    <div id='buttons' className="flex-column my-10">

  {status!=="CLOSED" ? (
  <div className="ml-20">
  <button className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2" onClick={recordWebcam.close}>CLOSE CAMERA</button>
  <button className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2" onClick={recordWebcam.start}>START RECORDING</button>
  <button className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2" onClick={recordWebcam.stop}>STOP RECORDING</button>
  <button className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2" onClick={recordWebcam.retake}>RETAKE RECORDING</button>
  <button className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2" onClick={recordWebcam.download}>DOWNLOAD RECORDING</button>
  <button className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black w-[70%] my-2" onClick={saveFile}>SAVE FILE TO SERVER</button>

</div>
    ) :
    (<div className="ml-20">
      <button className="bg-green-400 py-3 rounded-[20px] font-bold text-[16px] text-black px-20 my-3" onClick={recordWebcam.open}>OPEN CAMERA</button>
      </div>) }
    </div>

    { status !== "CLOSED" && (
    <div id="video_container" className="w-[50%] mt-10">
    <video ref={recordWebcam.webcamRef} autoPlay muted />
      <video ref={recordWebcam.previewRef} autoPlay muted loop />
    </div> )
}


    </div>
    { status === "CLOSED"
&&
    (<div className="">
      <img src={camera_placeholder} className="w-[40%] absolute top-60 right-20 mr-10"/>
      </div>) }
    </div>
  );
}

export default RecordVideo;
