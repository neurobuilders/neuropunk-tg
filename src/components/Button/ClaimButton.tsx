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
import { useAppContext } from "@/context/AppContext";

interface ClaimButtonProps {
  onClick?: (
    value: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  // startValue?: number;
  className?: string;
}

const ClaimButton = (props: ClaimButtonProps) => {
  const { onClick, className } = props;
  const {
    unclaimedEnergyAmount,
    setEnergyProductionEnabled,
    isEnergyProductionEnabled,
    setUnclaimedEnergyAmount,
    setEnergyAmount,
  } = useAppContext();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  // const [floatCount, setFloatCount] = useState(startValue ?? 0); // Initialize to a float value
  // Animation setup using react-spring
  const springProps = useSpring({
    value: unclaimedEnergyAmount,
    from: { value: 0 },
    config: { tension: 280, friction: 120, duration: 400 },
    // immediate: true,
  });

  const _onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      // setUnclaimedEnergyAmount(0);

      setTimeout(() => {
        setEnergyProductionEnabled(false);
        setButtonDisabled(true);

        if (onClick) {
          onClick(springProps.value.get(), e);
        }
        triggerHapticFeedback();

        setTimeout(() => {
          setEnergyAmount((prev) => prev + springProps.value.get());

          setUnclaimedEnergyAmount(0);
        }, 100);

        setTimeout(() => {
          //cooldown
          setButtonDisabled(false);
          setEnergyProductionEnabled(true);
        }, 2000);
      }, 100);
    },
    [onClick, setEnergyProductionEnabled, springProps.value]
  );
  return (
    <button
      className={clsx("btn btn__claim", className)}
      type="button"
      onClick={_onClick}
      disabled={isButtonDisabled}
    >
      <span>
        Claim <span className="icon icon-ne"></span>
        <animated.span>{springProps.value.to(formatNumber)}</animated.span>
      </span>
    </button>
  );
};

export default ClaimButton;
