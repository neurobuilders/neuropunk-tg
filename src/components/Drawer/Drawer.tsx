import React from "react";

import { Button, Drawer as FlowbiteDrawer, Sidebar } from "flowbite-react";
import {
  Crown,
  SquareUserRound,
  History,
  BookOpenText,
  CircleHelp,
  Settings,
  X,
} from "lucide-react";
import { IconUsersGroup } from "@tabler/icons-react";
import { useAppContext } from "@/context/AppContext";
import { triggerHapticFeedback } from "@/helpers/telegram";

export const Drawer = () => {
  const { isDrawerOpen, closeDrawer } = useAppContext();
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
            onClick={() => {
              closeDrawer();
              triggerHapticFeedback();
            }}
            className="left-[-5px] border-0"
          >
            <X color="#ffffff" size={22} />
          </Button>
        </div>
        <FlowbiteDrawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
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
                    <Sidebar.Item href="/my/profile" icon={SquareUserRound}>
                      My Profile
                    </Sidebar.Item>
                    <Sidebar.Item href="/my/squad" icon={IconUsersGroup}>
                      Squad
                    </Sidebar.Item>
                    <Sidebar.Item href="/my/history" icon={History}>
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
                    <Sidebar.Item href="/settings" icon={Settings}>
                      Settings
                    </Sidebar.Item>
                    <Sidebar.Item href="/help" icon={CircleHelp}>
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </FlowbiteDrawer.Items>
      </FlowbiteDrawer>
    </>
  );
};
