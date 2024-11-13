import React, { useCallback } from "react";

import { Button, Drawer as FlowbiteDrawer, Sidebar } from "flowbite-react";
import {
  SquareUserRound,
  History,
  CircleHelp,
  Settings,
  X,
  Gamepad2,
} from "lucide-react";
import { IconUsersGroup } from "@tabler/icons-react";
import { useAppContext } from "@/context/AppContext";
import { triggerHapticFeedback } from "@/helpers/telegram";
import Link from "next/link";
import { ClickHandler } from "@telegram-apps/telegram-ui/dist/components/Service/Touch/Touch";
import { getVersionString } from "@/helpers/utils";

export const Drawer = () => {
  const { isDrawerOpen, closeDrawer } = useAppContext();

  const itemClickHandler: ClickHandler = useCallback(() => {
    closeDrawer();
    triggerHapticFeedback();
  }, [closeDrawer]);

  return (
    <>
      <FlowbiteDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="!pt-2.5"
      >
        <div>
          <Button
            color="gray"
            size="sm"
            onClick={itemClickHandler}
            className="left-[-5px] border-0"
          >
            <X color="#ffffff" size={22} />
          </Button>
        </div>
        <FlowbiteDrawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0 w-full"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                {/* <form className="pb-3 md:hidden">
                  <TextInput
                    icon={Crown}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form> */}
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    {/* <Sidebar.Item href="/ratings" icon={Crown}>
                      Ratings
                    </Sidebar.Item> */}
                    <Sidebar.Item
                      href="/pass"
                      icon={SquareUserRound}
                      as={Link}
                      onClick={itemClickHandler}
                    >
                      My Profile
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/games"
                      icon={Gamepad2}
                      as={Link}
                      onClick={itemClickHandler}
                    >
                      Games
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/squad"
                      icon={IconUsersGroup}
                      as={Link}
                      onClick={itemClickHandler}
                    >
                      Squad
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/my/history"
                      icon={History}
                      onClick={itemClickHandler}
                    >
                      My History
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    {/* <Sidebar.Item
                      href="/docs"
                      icon={BookOpenText}
                    >
                      Docs
                    </Sidebar.Item> */}
                    <Sidebar.Item
                      href="/settings"
                      icon={Settings}
                      as={Link}
                      onClick={itemClickHandler}
                    >
                      Settings
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/help"
                      icon={CircleHelp}
                      as={Link}
                      onClick={itemClickHandler}
                    >
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </FlowbiteDrawer.Items>
        <div className="text-hint px-3 mt-3 fixed bottom-2 text-[13px] font-bold">
          {getVersionString()}
        </div>
      </FlowbiteDrawer>
    </>
  );
};
