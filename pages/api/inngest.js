/** 
import { inngest } from "@/workLoad";
import { serve } from "inngest/next";
import { helloWorld } from "@/worker/saveFile";


await inngest.send({
  name: "mailer",
  id: "mailer",
  data: { username: "leo" },
});


export default serve({
  client: inngest,
  functions: [helloWorld],
});
*/
