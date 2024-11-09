import { formatNumber } from "@/helpers/utils";
import React, {
  useState,
  useEffect,
  MouseEventHandler,
  useCallback,
} from "react";
import { useSpring, animated } from "react-spring";
import emitter, { Events } from "@/helpers/events";

interface ClaimButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  startValue?: number;
  currentValue?: number;
}

const ClaimButton = (props: ClaimButtonProps) => {
  const { onClick, startValue, currentValue } = props;
  const [floatCount, setFloatCount] = useState(
    parseFloat(`${startValue ?? 0}`)
  ); // Initialize to a float value
  const incrementValue = 100.2586; // Increment by 0.1 every second

  const _onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  useEffect(() => {
    console.log("setFloatCount", currentValue);
    const float = parseFloat(`${currentValue ?? 0}`);
    setFloatCount(float);
  }, [currentValue]);

  // Animation setup using react-spring
  const springProps = useSpring({
    value: floatCount,
    from: { value: 0 },
    config: { tension: 280, friction: 120 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatCount((prevCount) => prevCount + incrementValue); // Increment the float count
    }, 1000); // Update every second (1000 ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const handleEvent = (value: any) => {
      setFloatCount(value);
      springProps.value.set(value);
    };

    emitter.on(Events.SetClaimButtonCurrentValue, handleEvent);

    // Clean up the event listener when the component unmounts
    return () => {
      emitter.off(Events.SetClaimButtonCurrentValue, handleEvent);
    };
  }, [springProps.value]);

  return (
    <button
      className="btn btn__claim mt-[40px] mb-[30px]"
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
