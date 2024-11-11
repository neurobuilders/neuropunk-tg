import React from "react";

import {
  Button,
  Drawer as FlowbiteDrawer,
  Sidebar,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import {
  Crown,
  SquareUserRound,
  History,
  BookOpenText,
  CircleHelp,
} from "lucide-react";
import { IconUsersGroup } from "@tabler/icons-react";

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show navigation</Button>
      </div>
      <FlowbiteDrawer open={isOpen} onClose={handleClose}>
        <FlowbiteDrawer.Header title="MENU" titleIcon={() => <></>} />
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
                    <Sidebar.Item href="/ratings" icon={Crown}>
                      Ratings
                    </Sidebar.Item>
                    <Sidebar.Item href="/my/profile" icon={SquareUserRound}>
                      My Profile
                    </Sidebar.Item>
                    <Sidebar.Item href="/my/squad" icon={IconUsersGroup}>
                      My Squad
                    </Sidebar.Item>
                    <Sidebar.Item href="/my/history" icon={History}>
                      My History
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/docs" icon={BookOpenText}>
                      Docs
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
