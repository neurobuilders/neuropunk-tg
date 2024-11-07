import React from "react";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { triggerHapticFeedback } from "@/helpers/telegram";

export const NeuroWave = () => {
  const [dotLottie, setDotLottie] = React.useState<DotLottie>(null as any);
  const timeoutIdRef = React.useRef<NodeJS.Timeout>();

  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    setDotLottie(dotLottie);
  };
  function play() {
    if (dotLottie) {
      dotLottie.stop();
      dotLottie.play();
    }
  }
  return (
    <DotLottieReact
      src="/neurowave-lottie.json"
      loop
      autoplay
      dotLottieRefCallback={dotLottieRefCallback}
      onPointerDown={() => {
        if (dotLottie) {
          triggerHapticFeedback("medium");
          //   dotLottie.stop();
          dotLottie.setFrame(5);
          dotLottie.play();
          if (timeoutIdRef.current) {
            clearInterval(timeoutIdRef.current);
          }
          timeoutIdRef.current = setTimeout(() => {
            dotLottie.pause();
            timeoutIdRef.current = undefined;
          }, 60 * 5);
        }
      }}
      //   onPointerUp={() => {
      //     if (dotLottie) {
      //       dotLottie.pause();
      //     }
      //   }}
    />
  );
};
