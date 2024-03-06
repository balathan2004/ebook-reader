import Navbar from "@/components/nav";
import { getCookie, deleteCookie } from "cookies-next";
import React, { Component, useState, useEffect } from "react";

export default function About() {
  var [id, setId] = useState();

  const logout = () => {
    deleteCookie("EBookUserId");
  };

  useEffect(() => {
    setId(getCookie("EBookUserId"));
  }, []);

  /**
 * 
 * 
 *   <h1>Hello</h1>
          <h2>Id {id}</h2>
          <button onClick={logout}>Log out</button>
 *  
 */

  return (
    <>
      <div class="about">
        <div class="about-app">
          <h1>About PDF to Voice Converter</h1>

          <p>
            Welcome to PDF to Voice Converter, your go-to solution for
            converting PDF documents into spoken audio! Our web application is
            designed to make your reading experience more accessible and
            convenient.
          </p>
        </div>
        <div class="we-offer">
          <h2>What We Offer:</h2>
          <ol>
            <li>
              <h3>Efficient Conversion:</h3>
              <p>
                With our PDF to voice conversion technology, you can quickly
                transform your PDF files into high-quality audio format
              </p>
            </li>
            <li>
              <h3>Customization Options:</h3>
              <p>
                {" "}
                Tailor the audio output according to your preferences. Adjust
                the voice, speed, and volume to suit your listening needs.
              </p>
            </li>
            <li>
              <h3>Accessibility:</h3>
              <p>
                We believe in making information accessible to everyone. Our
                tool helps individuals with visual impairments, learning
                disabilities, or busy schedules to access content effortlessly.
              </p>
            </li>
            <li>
              <h3>User-Friendly Interface:</h3>
              <p>
                {" "}
                Our intuitive interface ensures a seamless experience for users
                of all levels. Simply upload your PDF, customize the settings,
                and convert it to audio with ease.
              </p>
            </li>
          </ol>
        </div>
        <div class="works">
          <h2>How Its Works:</h2>
          <ol>
            <li>
              <h3>Upload PDF:</h3>
              <p>
                Select the PDF document you want to convert by uploading it to
                our platform.
              </p>
            </li>
            <li>
              <h3>Customize Settings:</h3>
              <p>
                Choose your preferred voice, speed, and volume settings to
                personalize the audio output.
              </p>
            </li>
            <li>
              <h3>Convert to Audio:/</h3>
              <p>
                Click on the convert button, and within moments, your PDF will
                be transformed into spoken audio.
              </p>
            </li>
            <li>
              <h3>Download or Listen Online:</h3>
              <p>
                Download the audio file to listen to it offline, or stream it
                directly from our website.
              </p>
            </li>
          </ol>
        </div>
        <div class="why-choose">
          <h2>Why Choose Us:</h2>
          <ul>
            <li>
              <h3>Reliability:</h3>
              <p>
                {" "}
                Our advanced conversion technology ensures accurate and reliable
                results every time.
              </p>
            </li>
            <li>
              <h3>Accessibility:</h3>
              <p>
                - We are committed to making information accessible to all
                users, regardless of their abilities or circumstances.
              </p>
            </li>
            <li>
              <h3>User Satisfaction:</h3>
              <p>
                {" "}
                We prioritize user satisfaction and continuously strive to
                enhance our services based on user feedback.
              </p>
            </li>
          </ul>
          <p>
            Experience the convenience and accessibility of PDF to Voice
            Converter today!
          </p>
        </div>
      </div>
    </>
  );
}
