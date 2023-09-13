import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <NextScript>
        <script src="https://cdn.jsdelivr.net/npm/speech-synthesis-polyfill/dist/speech-synthesis-polyfill.js" />
      </NextScript>

      <body>
        <Main />
      </body>
    </Html>
  );
}
