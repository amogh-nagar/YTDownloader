const ytdl = require("ytdl-core");
const path = require("path");
const fs = require("fs");
const Path = path.join(__dirname, "video.mp4");

exports.downloadvideo = async (req, res, next) => {
  // console.log(req.query);
  //   console.log(req.params.url)
  let url = req.query.url;
  let itag = +req.query.itag;
  let format = req.query.format;
  // console.log(itag)
  // console.log(typeof itag)

  res.setHeader(
    "Content-Disposition",
    'attachment;filename="Download.' + format + '"'
  );
  ytdl(url, {
    filter: (format) => format.itag === itag,
  }).pipe(res);
  // let stream=ytdl(url,{format:'mp4'})
  // console.log(stream)
  // stream.pipe(fs.createWriteStream(Path))
  // res.status(200).json({});
  // console.log(Path)
};

exports.videodetails = async (req, res, next) => {
  let url = req.query.url;

  let info = await ytdl.getInfo(url);
  // let arr=info.formats.filter(x=>x.hasAudio!==false)
  // console.log(arr)
  // console.log("info.formats ",info.formats)
  // let audioformats=ytdl.filterFormats(info.formats,'audioonly')
  // console.log("audioonly ",audioformats);
  let thumbnaildetails = info.videoDetails.thumbnails[3].url;
  let title = info.videoDetails.title;
  let description = info.videoDetails.description;

  let channel = info.videoDetails.author.channel_url;
  res.status(200).json({
    thumbnail: thumbnaildetails,
    title,
    description,
    channel,
    qualities: info.formats,
    // onlyaudio:audioformats
  });
};
