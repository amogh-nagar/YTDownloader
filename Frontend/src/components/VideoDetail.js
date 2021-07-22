import Modal from "./Modal";
import {useState} from "react";
import styles from "./VideoDetail.module.css";
import Loading from './Loading'
import Emoji from 'a11y-react-emoji'

const VideoDetail = (props) => {
  //   const [seloption, setseloption] = useState({value: "249"});

  let qualityarr = props.videodetails.qualities.map((quality) => {
    if (quality.container === "mp4") {
      return (
        <option value={`${quality.itag}`} key={quality.itag}>
          {quality.container} - {quality.qualityLabel}
        </option>
      );
    }
    return null;
  });
  qualityarr=qualityarr.filter(quality=>quality!==null)

  const downloadhandler = () => {
    let x = document.getElementById("itags").value;
    let format='mp4'
    // console.log(x);
    // console.log('qualoty:',qualityarr);
    window.location.href = `http://localhost:8080/video?url=${props.inputurl}&itag=${x}&format=${format}`;
  };

  //   const handlechange = (e) => {
  // console.log(e);
  // setseloption({value: e.target.value});
  // console.log(seloption);
  //   };

  return (
    <Modal onClick={props.onClick}>
      
      {props.isloading ? <Loading/>:(
      <>
      <div className={styles["details"]}>
        <h2>{props.videodetails.title}</h2>
        <p>Youtube is <Emoji symbol="😍" />, Have fun with <Emoji symbol=""/>📺</p>
        <a href={props.videodetails.channel}>Channel</a>
        <button onClick={downloadhandler}>Download</button>
        <select
          name=""
          id="itags"
          //   value={seloption.value}
          //   onChange={handlechange}
        >
          {qualityarr}
        </select>
      </div>

      <img src={props.videodetails.thumbnail} alt="Thumbnail" />
   </>   )}
    </Modal>
  );
};

export default VideoDetail;
