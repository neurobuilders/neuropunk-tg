import { formatNumber } from "@/helpers/utils";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const ClaimButton = () => {
  const [floatCount, setFloatCount] = useState(0.0); // Initialize to a float value
  const incrementValue = 100.2586; // Increment by 0.1 every second

  // Animation setup using react-spring
  const props = useSpring({
    value: floatCount,
    from: { value: 0 },
    config: { tension: 280, friction: 120 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatCount((prevCount) => prevCount + incrementValue); // Increment the float count
    }, 200); // Update every second (1000 ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <button className="btn btn__claim mt-[40px] mb-[30px]" type="button">
      <span>
        Claim <span className="icon icon-ne"></span>
        <animated.span>
          {props.value.to((val) => formatNumber(val))}
        </animated.span>
      </span>
    </button>
  );
};

export default ClaimButton;
