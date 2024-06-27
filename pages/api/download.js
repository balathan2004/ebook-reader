const fs = require("fs");
const path = require("path");
const ElevenLabs = require("elevenlabs");
import { storage } from "@/components/config";
import { ref, getDownloadURL } from "firebase/storage";
export default async (req, res) => {
  if (req.method === "POST") {
    const { bookName } = JSON.parse(req.body);

    if (req.cookies.EBookUserId && bookName) {
      console.log(req.cookies.EBookUserId, bookName);
      try {
        const { EBookUserId } = req.cookies;

        const bookData = await getBook(EBookUserId, bookName);
        const bookString = bookData.join(" ");
        const audioOutput = await AudioProcessing(bookString, bookName);
      } catch (err) {
        console.log(err);
      }
      res.json({ message: "received" });
    } else {
      res.json({ message: "missing authentication try to login" });
    }
  } else {
    res.json({ message: "unauthorized access" });
  }
};

async function AudioProcessing(bookString, bookName) {
  const client = new ElevenLabs.ElevenLabsClient({
    apiKey: "c2d07cef28672bc4e58cba4c3883aa5b",
  });
  const text = `In the bustling village hidden within leaves, Konohagakure, resided a boisterous young ninja named Naruto Uzumaki. Unlike his peers who reveled in acceptance and admiration, Naruto was shrouded in a veil of isolation. A cruel twist of fate burdened him at birth – the nine-tailed fox spirit, Kyuubi, a monstrous entity responsible for the near annihilation of Konoha, was sealed within him. Fear and suspicion clung to Naruto like a second skin, ostracizing him from the very community he yearned to protect.

Yet, beneath the mischievous facade and the barrage of pranks, burned an inextinguishable flame – the dream of becoming Hokage, the leader of Konohagakure. This ambition wasn't merely fueled by a desire for power or recognition. Naruto craved acceptance, a yearning to be acknowledged as more than just the container of a monster. He longed to prove his worth, to etch his name in the annals of Konoha's history alongside the legendary heroes he idolized.

His journey wasn't a solitary one. Sasuke Uchiha, a prodigious young prodigy with a bloodline steeped in power and a shadowed past, became his rival. Their initial sparring sessions were fueled by competition and animosity, each pushing the other to new heights. However, as they progressed through the rigorous ninja academy training, a grudging respect blossomed between them. Naruto admired Sasuke's natural talent and unwavering determination, while Sasuke, in turn, began to acknowledge Naruto's unwavering spirit and unpredictable fighting style.

Sakura Haruno, a girl brimming with hidden potential, joined their ranks. Initially smitten with Sasuke, her initial interactions with Naruto were marked by irritation and frustration. Yet, beneath the surface, she harbored a deep well of loyalty and camaraderie. Naruto, ever the optimist, saw the hidden strength within Sakura, constantly motivating and encouraging her to push past her perceived limitations.

Their shared experiences forged an unbreakable bond. They faced formidable foes together – the nefarious Orochimaru, a snake-like rogue ninja obsessed with power; the formidable Gaara of the Sand, a jinchuriki just like Naruto, burdened by the weight of his own sealed beast; and the mysterious Akatsuki organization, a syndicate of rogue ninja seeking to capture jinchuriki for their nefarious purposes. Through these trials, they learned the true meaning of teamwork, understanding the importance of relying on each other's strengths to overcome seemingly insurmountable obstacles.

Naruto's journey wasn't defined solely by battles and triumphs. It was a voyage of self-discovery. He learned the tragic history of the nine-tailed fox and the sacrifice his parents made to seal it within him. This revelation fueled his desire to master the beast's power, not as a weapon of destruction, but as a source of strength to protect those he cherished. He trained relentlessly, honing his chakra, the life force that fueled his ninjutsu abilities, and developing unique fighting techniques that incorporated his volatile connection with the nine-tailed fox.

Along the way, he encountered a multitude of mentors who further shaped his path. The gruff but wise Kakashi Hatake, their initial team leader, instilled in him the importance of teamwork, loyalty, and the ninja code. Jiraiya, the legendary Sannin, a jovial pervert with a heart of gold, became his surrogate father figure, imparting forbidden sealing techniques and teaching him the value of perseverance and believing in oneself. The enigmatic Iruka Umino, one of the few who saw beyond the prejudice and treated Naruto with kindness, became a constant source of encouragement, reminding him that he wasn't alone.

As Naruto's journey unfolded, the world around him became ever more complex. Political machinations, the threat of war, and ancient prophecies intertwined, blurring the lines between friend and foe. He learned of a hidden lineage, a legacy intertwined with the history of the Nine-tailed fox, forcing him to grapple with his identity and destiny. The weight of responsibility grew, not simply to become Hokage, but to safeguard the peace and stability of the ninja world.

Naruto's story is an ode to perseverance, a testament to the unwavering power of hope and friendship. It's a tale of overcoming adversity, defying prejudice, and forging one's own path. It's a reminder that within each of us lies the potential for greatness, waiting to be unleashed. It's a celebration of the bonds that unite us, reminding us that even the most isolated soul can find belonging and purpose in the warmth of human connection.  `;
  const audioBuffer = await client.generate({
    text: text,
    voice: "Adam",
  });

  var filePath = path.join(process.cwd(), `/public/audio/test.mp3`);
  const writeStream = fs.WriteStream(filePath);
  audioBuffer.pipe(writeStream);
}

async function getBook(username, url) {
  const file = ref(storage, `/books/${username}/${url}`);
  var urlpath = await getDownloadURL(file);
  var accVal = await fetch(urlpath, { contentType: "application/json" });
  var bookData = await accVal.json();
  const text = bookData.pageData.data;
  return text;
}
