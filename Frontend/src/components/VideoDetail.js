import Modal from "./Modal";
import styles from "./VideoDetail.module.css";
import Loading from "./Loading";
import Emoji from "a11y-react-emoji";

const VideoDetail = (props) => {
  let qualityarr = [];
  if (props.videodetails.qualities.length > 0) {
    qualityarr = props.videodetails.qualities.map((quality) => {
      if (quality.container === "mp4") {
        if (quality.hasAudio && quality.hasVideo) {
          return (
            <option value={`${quality.itag}`} key={quality.itag}>
              {quality.container} - {quality.qualityLabel}(Video+Audio)
            </option>
          );
        } else if (!quality.hasAudio && quality.hasVideo) {
          return (
            <option value={`${quality.itag}`} key={quality.itag}>
              {quality.container} - {quality.qualityLabel}(Only Video)
            </option>
          );
        } else if (quality.hasAudio && !quality.hasVideo) {
          return (
            <option value={`${quality.itag}`} key={quality.itag}>
              {quality.container} - {quality.qualityLabel}(Only Audio)
            </option>
          );
        } else {
          return null;
        }
      }
      return null;
    });
    // qualityarr.push(<option value=></option>)
    qualityarr = qualityarr.filter((quality) => quality !== null);
  }
  const downloadhandler = () => {
    let x = document.getElementById("itags").value;
    let format = "mp4";
    window.location.href = `https://udownloader.herokuapp.com/video?url=${props.inputurl}&itag=${x}&format=${format}`;
  };
  // s://udownloader.herokuapp.com
  return (
    <Modal onClick={props.onClick}>
      {props.isloading ? (
        <Loading />
      ) : (
        <>
          <div className={styles["details"]}>
            <h2>{props.videodetails.title}</h2>
            <p>
              Youtube is <Emoji symbol="😍" />, Have fun with{" "}
              <Emoji symbol="" />
              📺 <br />
              Do not Forget to give a <Emoji symbol="⭐" /> to the{" "}
              <a
                href="https://github.com/Amoghtech/YTDownloader"
                rel="noreferrer"
                target="_blank"
                className="repo"
              >
                Repo
              </a>
            </p>
            {props.videodetails.channel.length > 0 ? (
              <>
                <a
                  rel="noreferrer"
                  href={props.videodetails.channel}
                  target="_blank"
                >
                  Channel
                </a>
                <button onClick={downloadhandler}>Download</button>
                <select
                  name=""
                  id="itags"
                  //   value={seloption.value}
                  //   onChange={handlechange}
                >
                  {qualityarr}
                </select>

                <img src={props.videodetails.thumbnail} alt="Thumbnail" />
                      
              </>
            ) : (
              
              <div className={styles.error}>{props.videodetails.description}</div>
            )}
  
          </div>

        </>
      )}
    </Modal>
  );
};

export default VideoDetail;
