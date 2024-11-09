import { formatNumber } from "@/helpers/utils";
import React, {
  useState,
  useEffect,
  MouseEventHandler,
  useCallback,
} from "react";
import { useSpring, animated } from "react-spring";
import emitter, { Events } from "@/helpers/events";
import { triggerHapticFeedback } from "@/helpers/telegram";
import clsx from "clsx";

interface ClaimButtonProps {
  onClick?: (
    value: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  startValue?: number;
  className?: string;
  valuePerSecond: number;
}

const ClaimButton = (props: ClaimButtonProps) => {
  const { onClick, startValue, className, valuePerSecond } = props;
  const [floatCount, setFloatCount] = useState(
    parseFloat(`${startValue ?? 0}`)
  ); // Initialize to a float value

  const _onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setTimeout(() => {
        const val = springProps.value.get();
        if (onClick) {
          onClick(val, e);
        }
        triggerHapticFeedback();
        springProps.value.set(0);
        setFloatCount(0);
      }, 100);
    },
    [onClick]
  );

  // Animation setup using react-spring
  const springProps = useSpring({
    value: floatCount,
    from: { value: 0 },
    config: { tension: 280, friction: 120 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatCount((prevCount) => prevCount + valuePerSecond); // Increment the float count
    }, 1000); // Update every second (1000 ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <button
      className={clsx("btn btn__claim", className)}
      type="button"
      onClick={_onClick}
    >
      <span>
        Claim <span className="icon icon-ne"></span>
        <animated.span>
          {springProps.value.to((val) => formatNumber(val))}
        </animated.span>
      </span>
    </button>
  );
};

export default ClaimButton;
