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
        setvideodetail({
          thumbnail: data.thumbnail,
          title: data.title,
          description: data.description,
          channel: data.channel,
          qualities: data.qualities,
        });
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
        Made in <Emoji symbol="❤" /> with JS
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
