import { useEffect, useRef, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { assetUrl } from "../../lib/assetUrl";
import style from "./Barman.module.css";

const BARMAN_GIF = assetUrl("barman.gif");

interface BarmanProps {
  talking: boolean;
}

function Barman({ talking }: BarmanProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLImageElement>(null);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    const loader = loaderRef.current;
    const canvas = canvasRef.current;
    if (!loader || !canvas) return;

    const drawFirstFrame = () => {
      canvas.width = loader.naturalWidth;
      canvas.height = loader.naturalHeight;
      canvas.getContext("2d")?.drawImage(loader, 0, 0);
    };

    if (loader.complete) {
      drawFirstFrame();
    } else {
      loader.addEventListener("load", drawFirstFrame);
      return () => loader.removeEventListener("load", drawFirstFrame);
    }
  }, []);

  useEffect(() => {
    if (talking) {
      setPlayKey((key) => key + 1);
    }
  }, [talking]);

  return (
    <div className={style.barman}>
      <img ref={loaderRef} src={BARMAN_GIF} alt="" aria-hidden="true" style={{ display: "none" }} />
      <canvas ref={canvasRef} className={style.frame} style={{ display: talking ? "none" : "block" }} />
      {talking && (
        <img key={playKey} src={`${BARMAN_GIF}?play=${playKey}`} alt="Atendente" className={style.frame} />
      )}
    </div>
  );
}

export default Barman;
