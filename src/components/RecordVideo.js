import React from "react";

import { useRecordWebcam } from "react-record-webcam";

function RecordVideo(props) {
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

  return (
    <div className="mx-2 text-white px-10 flex-row">
      <p>Camera status: {recordWebcam.status}</p>
      <div>
<div className="flex flex-column justify-between space-x-5">
<button className="bg-lime-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[30%] my-2" onClick={recordWebcam.open}>Open camera</button>
      <button className="bg-lime-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[30%] my-2" onClick={recordWebcam.close}>Close camera</button>
      </div>
</div>

  <div className="flex flex-column mt-10 justify-center ml-20 space-x-20">
    <div>
    <video ref={recordWebcam.webcamRef} autoPlay muted />
      <video ref={recordWebcam.previewRef} autoPlay muted loop />
    </div>


      {recordWebcam.status==="OPEN" && (
  <div className="my-10 pl-10">
  <button className="bg-lime-400 py-3 rounded-[25px] font-bold text-[18px] text-black w-[60%] my-2" onClick={recordWebcam.start}>Start recording</button>
  <button className="bg-lime-400 py-3 rounded-[25px] font-bold text-[18px] text-black w-[60%] my-2" onClick={recordWebcam.stop}>Stop recording</button>
  <button className="bg-lime-400 py-3 rounded-[25px] font-bold text-[18px] text-black w-[60%] my-2" onClick={recordWebcam.retake}>Retake recording</button>
  <button className="bg-lime-400 py-3 rounded-[25px] font-bold text-[18px] text-black w-[60%] my-2" onClick={recordWebcam.download}>Download recording</button>
  <button className="bg-lime-400 py-3 rounded-[25px] font-bold text-[18px] text-black w-[60%] my-2" onClick={saveFile}>Save file to server</button>

</div>
    )}
    </div>
    </div>
  );
}

export default RecordVideo;
