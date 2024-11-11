import { formatNumber } from "@/helpers/utils";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar as FlowbiteNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";
import { Button as TelegramButton } from "@telegram-apps/telegram-ui";
import { Menu, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export function Navbar() {
  const router = useRouter();
  const { isDrawerOpen, openDrawer } = useAppContext();

  return (
    <FlowbiteNavbar
      rounded
      className="fixed w-full z-20 top-0 start-0 px-3 drop-shadow-lg"
    >
      <div className="flex md:order-2 justify-between items-center w-full">
        {/* <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown> */}
        {/* <NavbarToggle barIcon={Menu}  /> */}
        <Button color="gray" size="sm" onClick={openDrawer}>
          <Menu color="#ffffff" size={22} />
        </Button>
        <Button
          size="s"
          color="light"
          pill
          className="px-2.5 py-1"
          onClick={() => {
            router.push("/reactor");
          }}
        >
          <span className="flex justify-center items-center">
            <span className="icon icon-ne relative !ml-0 !top-0 !mr-[5px]"></span>
            <span>{formatNumber(2869, 2)}</span>
          </span>
        </Button>
        <Button color="gray" size="sm" as={Link} href="/reactor">
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
}
