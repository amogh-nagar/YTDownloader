import {useState, useEffect} from "react";
import styles from "./App.module.css";
import VideoDetail from "./components/VideoDetail";
import Emoji from "a11y-react-emoji";

let inital = true;

function App() {
  const [input, setinput] = useState("");
  const [videodetail, setvideodetail] = useState({
    thumbnail: "",
    title: "",
    description: "",
    channel: "",
    qualities: [],
  });
  const [clicked, setclicked] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(false);

  useEffect(() => {
    if (inital) {
      inital = false;
      return;
    }
    const timeout = setTimeout(() => {
      if (!(input.includes("youtube.com") || input.includes("youtu.be"))) {
        seterror(true);
      } else {
        seterror(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  const submithandler = (e) => {
    e.preventDefault();
    console.log("input: ", input);
    if (!(input.includes("youtube.com") || input.includes("youtu.be"))) {
      seterror(true);
      return;
    }
    seterror(false);
    setisloading(true);
    fetch(`https://udownloader.herokuapp.com/video/detail?url=${input}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if(data.qualities.length>0){
        setvideodetail({
          thumbnail: data.thumbnail,
          title: data.title,
          description: data.description,
          channel: data.channel,
          qualities: data.qualities,
        });}
        else{
          setvideodetail({
            thumbnail: "https://www.google.com/search?q=not+found+image&sa=X&bih=694&biw=1517&hl=en&sxsrf=ALeKk03E3W3PEh14YWV7SJsUVoSuo_Nyaw:1627125921344&tbm=isch&source=iu&ictx=1&fir=JQDPf07Li2Eu1M%252CgrWb3R2wvjO76M%252C_&vet=1&usg=AI4_-kRtzEHTCJD6WyzpdKqjRSnAC4fFTw&ved=2ahUKEwjAmq-0zPvxAhUozjgGHXcvDtgQ9QF6BAgOEAE#imgrc=JQDPf07Li2Eu1M",
            title: data.title,
            description: data.description,
            channel: '',
            qualities: [],
          });
        }
        setisloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickhandler = () => {
    setclicked((prevState) => {
      return !prevState;
    });
  };

  const blurhandler = () => {
    if (!(input.includes("youtube.com") || input.includes("youtu.be"))) {
      seterror(true);
    } else {
      seterror(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.message}>
        Made with <Emoji symbol="❤" /> in JS
      </div>
      {clicked && !error && (
        <VideoDetail
          isloading={isloading}
          videodetails={videodetail}
          onClick={clickhandler}
          inputurl={input}
        />
      )}
      <div className={styles.container}>
        <form
          onBlur={blurhandler}
          action=""
          onSubmit={submithandler}
          className={styles["form"]}
        >
          <label htmlFor="nme">
            <span>URL</span>
          </label>
          <input
            type="text"
            onChange={(e) => {
              setinput(e.target.value);
            }}
            id="nme"
          />
          {error && (
            <p>
              Url must be a Youtube Url <Emoji symbol="😑" />
            </p>
          )}
          <button onClick={clickhandler} disabled={error} type="submit">
            Video Info
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
