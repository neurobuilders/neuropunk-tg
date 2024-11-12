import { formatNumber } from "@/helpers/utils";
import {
  Navbar as FlowbiteNavbar,
  NavbarCollapse,
  NavbarLink,
  Button,
} from "flowbite-react";
import { Menu, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { triggerHapticFeedback } from "@/helpers/telegram";
import { useSpring, animated } from "react-spring";
import { memo, useRef } from "react";

const Navbar = memo(function Navbar() {
  const router = useRouter();
  const { openDrawer, energyAmount } = useAppContext();
  const valueRef = useRef(energyAmount);

  const springProps = useSpring({
    value: energyAmount,
    from: { value: valueRef.current },
    config: { tension: 280, friction: 120, duration: 500 },
  });

  return (
    <FlowbiteNavbar
      rounded
      className="sticky w-full z-20 top-0 start-0 px-2 drop-shadow-lg"
    >
      <div className="flex md:order-2 justify-between items-center w-full">
        <Button
          color="gray"
          size="sm"
          onClick={() => {
            openDrawer();
            triggerHapticFeedback();
          }}
        >
          <Menu color="#ffffff" size={22} />
        </Button>
        <Button
          size="s"
          color="light"
          pill
          className="px-2.5 py-1"
          onClick={() => {
            router.push("/reactor");
            triggerHapticFeedback();
          }}
        >
          <span className="flex justify-center items-center">
            <span className="icon icon-ne relative !ml-0 !top-0 !mr-[5px]"></span>
            <span>
              <animated.span>
                {springProps.value.to((val) => formatNumber(val))}
              </animated.span>
            </span>
          </span>
        </Button>
        <Button
          color="gray"
          size="sm"
          as={Link}
          href="/squad"
          onClick={() => {
            triggerHapticFeedback();
          }}
        >
          <UserPlus color="#ffffff" size={22} />
        </Button>
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </FlowbiteNavbar>
  );
});

export default Navbar;
