import { formatNumber } from "@/helpers/utils";
import React, {
  useState,
  useEffect,
  MouseEventHandler,
  useCallback,
} from "react";
import { useSpring, animated } from "react-spring";
// import emitter, { Events } from "@/helpers/events";
import { triggerHapticFeedback } from "@/helpers/telegram";
import clsx from "clsx";

interface ClaimButtonProps {
  onClick?: (
    value: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  startValue?: number;
  className?: string;
}

const ClaimButton = (props: ClaimButtonProps) => {
  const { onClick, startValue, className } = props;
  const [isDisabled, setDisabled] = useState(false);
  const [floatCount, setFloatCount] = useState(startValue ?? 0); // Initialize to a float value
  // Animation setup using react-spring
  const springProps = useSpring({
    value: floatCount,
    from: { value: 0 },
    config: { tension: 280, friction: 120, duration: 500 },
  });

  const _onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setTimeout(() => {
        setDisabled(true);
        const val = springProps.value.get();
        if (onClick) {
          onClick(val, e);
        }
        triggerHapticFeedback();
        // springProps.value.set(0);
        setFloatCount(0);

        setTimeout(() => {
          //cooldown
          setDisabled(false);
        }, 5000);
      }, 100);
    },
    [onClick]
  );
  return (
    <button
      className={clsx("btn btn__claim", className)}
      type="button"
      onClick={_onClick}
      disabled={isDisabled}
    >
      <span>
        Claim <span className="icon icon-ne"></span>
        <animated.span>
          {springProps.value.to((val) => {
            return formatNumber(val);
          })}
        </animated.span>
      </span>
    </button>
  );
};

export default ClaimButton;
