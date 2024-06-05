import React, { useState } from "react";
import socialLinks from "./utils/social-links";
import "./App.css";

import whatsappIcon from "./assets/images/whatsapp.svg";
import telegramIcon from "./assets/images/telegram.svg";
import twitterIcon from "./assets/images/twitter.svg";

const App = () => {
  const url = "https://api.quotable.io/random";
  const initialQuote = { content: "Let time be your only competitor.", author: "Ahmed Saber"};

  const [quote, setQuote] = useState(initialQuote);
  const [isLoading, setIsLoading] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const generateQuote = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch a new quote");

      const data = await response.json();
      setQuote(data);

    } catch (error) {
      console.error(error);
      alert("Failed to fetch a new quote. Please try again later.");

    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${quote.author} once said: ${quote.content}`)
      .then(() => {
        setCopyButtonText("Copied!");
        setTimeout(() => {
          setCopyButtonText("Copy");
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        alert("Failed to copy the quote. Please try again later.");
      });
  };

  return (
    <>
      <h1>Quote Generator React App</h1>
      <div className="container">
        <p>{quote.content}</p>
        <span>- {quote.author}</span>
        <div className="btns">
          <button
            onClick={copyToClipboard}
            className="btn"
            aria-label="Copy quote to clipboard"
            disabled={copyButtonText === "Copied!"}
          >
            {copyButtonText}
          </button>
          <button
            onClick={generateQuote}
            className="btn"
            disabled={isLoading}
            aria-label="Generate another quote"
          >
            {isLoading ? "Loading..." : "Generate Another Quote"}
          </button>
        </div>

        <div className="social-share">
          <button
            onClick={() => socialLinks(quote, "twitter")}
            className="btn"
            aria-label="Share on Twitter"
            title="Share on Twitter"
          >
            <img src={twitterIcon} alt="Twitter" />
          </button>
          <button
            onClick={() => socialLinks(quote, "whatsapp")}
            className="btn"
            aria-label="Share on WhatsApp"
            title="Share on WhatsApp"
          >
            <img src={whatsappIcon} alt="WhatsApp" />
          </button>
          <button
            onClick={() => socialLinks(quote, "telegram")}
            className="btn"
            aria-label="Share on Telegram"
            title="Share on Telegram"
          >
            <img src={telegramIcon} alt="Telegram" />
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
