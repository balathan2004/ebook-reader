import { storage } from "@/components/config";
import { ref, getDownloadURL } from "firebase/storage";
import { exec } from 'child_process';
import path from "path";

export default async (req, res) => {
  try {
    const { EBookUserId } = req.cookies;
    const { url, pageNum } = JSON.parse(req.body);
    console.log("requested for", url, pageNum);
    const file = ref(storage, `/books/${EBookUserId}/${url}`);
    var urlpath = await getDownloadURL(file);
    var accVal = await fetch(urlpath, { contentType: "application/json" });
    var bookData = await accVal.json();

    const tmpfile=path.join(process.cwd(),"public/audio/"+EBookUserId+""+url+""+new Date().getTime()+".mp3")

    exec(`espeak -s 150 -w "${tmpfile}" "${bookData.pageData.data[pageNum]}"`,(error,stdout,stderr)=>{
      if(error){
        console.log(error)
      }else{
        console.log("converted")
      }
    })

    console.log()

    res.json({
      page: bookData.pageData.data[pageNum],
      totalPages: bookData.totalPage,
    });
  } catch (e) {
    res.json({ error: e });
  }
};


const converter=async(text)=>{




}