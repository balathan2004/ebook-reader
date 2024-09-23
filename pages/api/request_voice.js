const gTTS = require("gtts");
const { PassThrough } = require('stream');
export default function (req,res){

    const {text}=(req.body)

    const gtts=new gTTS(text,'en')
    const stream =new PassThrough()
    gtts.stream().pipe(stream)

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment; filename="output.mp3"');
    stream.pipe(res)

}