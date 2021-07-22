import {useState} from "react";
import styles from "./App.module.css";
// import axios from "axios";
// import Filedownload from "js-file-download";
import VideoDetail from "./components/VideoDetail";
function App() {
  const [input, setinput] = useState("");
const [videodetail,setvideodetail]=useState({thumbnail:"",title:"",description:"",channel:"",qualities:[]})
const [clicked,setclicked]=useState(false)
const [isloading,setisloading]=useState(false)


const submithandler = (e) => {
    e.preventDefault();
    console.log("input: ", input);
    // axios.get(`http://localhost:8080/video?url=${input}`,{
    //   responseType:'blob'
    // }).then(res=>{
    // console.log('blob: ',res)
    // Filedownload(res.data,'video.mp4')
    // })
    setisloading(true)
    fetch(`http://localhost:8080/video/detail?url=${input}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setvideodetail({
          thumbnail:data.thumbnail,
          title:data.title,
          description:data.description,
          channel:data.channel,
          qualities:data.qualities
        })
        setisloading(false)
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch(`http://localhost:8080/video?url=${input}`).then((res) => {
    //   console.log(res);
    //   Filedownload(input,'videoo.mp4')
    // res.blob().then((blob) => {
    //   let url = window.URL.createObjectURL(blob);
    //   let a = document.createElement("a");
    //   a.href = url;
    //   a.download = "stream.mp4";
    //   a.click();
    // });
    // });
    // fetch("http://localhost:8080/video", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({inputdata: input}),
    // })
    // .then((res) => {
    //   console.log(res)
    //   // return res.json();
    // })
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    // window.location.href = `http://localhost:8080/video?url=${input}`;
  };

const clickhandler=()=>{
  setclicked(prevState=>{
    return !prevState
  })
}


  return (
    <div className={styles.main}>
      {clicked && <VideoDetail isloading={isloading} videodetails={videodetail} onClick={clickhandler} inputurl={input}/>}
      <div className={styles.container}>
        <form action="" onSubmit={submithandler} className={styles["form"]}>
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

          <button onClick={clickhandler} type="submit">Download</button>
        </form>
      </div>
    </div>
  );
}

export default App;
