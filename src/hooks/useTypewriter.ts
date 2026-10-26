import { useEffect, useRef, useState } from "react";
import { playBlip } from "../lib/blip";

const CHAR_INTERVAL_MS = 26;

export interface TypewriterResult {
  displayed: string;
  isTyping: boolean;
  skip: () => void;
}

export function useTypewriter(fullText: string): TypewriterResult {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const fullTextRef = useRef(fullText);

  useEffect(() => {
    fullTextRef.current = fullText;
    indexRef.current = 0;
    setDisplayed("");

    if (fullText.length === 0) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    const timer = window.setInterval(() => {
      const text = fullTextRef.current;
      const nextIndex = indexRef.current + 1;
      const nextChar = text[indexRef.current];

      if (nextChar && nextChar.trim().length > 0 && indexRef.current % 2 === 0) {
        playBlip();
      }

      indexRef.current = nextIndex;
      setDisplayed(text.slice(0, nextIndex));

      if (nextIndex >= text.length) {
        window.clearInterval(timer);
        setIsTyping(false);
      }
    }, CHAR_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [fullText]);

  function skip(): void {
    const text = fullTextRef.current;
    indexRef.current = text.length;
    setDisplayed(text);
    setIsTyping(false);
  }

  return { displayed, isTyping, skip };
}
