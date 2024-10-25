"use client";

import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

import React from "react";
import Rive from "@rive-app/react-canvas";
import {Avatar, Banner, Button, Cell, Image, List, Section} from "@telegram-apps/telegram-ui";
import {Link} from "@/components/Link/Link";
import {Info} from "lucide-react";

export default function Tasks() {
    const t = useTranslations("i18n");

    return (
        <Page back={true}>
            <Banner
                before={<Image size={48} />}
                callout="Urgent notification"
                description="Start exploring TON in a new, better way"
                header="Introducing TON Space"
                onCloseIcon={function noRefCheck(){}}
                type="section"
            >
                <React.Fragment key=".0">
                    <Button size="s">
                        Try it out
                    </Button>
                    <Button
                        mode="plain"
                        size="s"
                    >
                        Maybe later
                    </Button>
                </React.Fragment>
            </Banner>
            <Section
                header="Application Launch Data"
                footer="These pages help developer to learn more about current launch information"
            >
                <Link href="/tasks">
                    <Cell
                        // after={<Info subtitle="Received" type="text">+1000</Info>}
                        before={<Avatar src={"/logo.png"} size={24} />}
                        // subtitle="Yesterday"
                    >
                        Get Neuropunk App
                    </Cell>
                </Link>
                <Link href="/launch-params">
                    <Cell subtitle="Platform identifier, Mini Apps version, etc.">
                        Get Neuropunk Premium
                    </Cell>
                </Link>
                <Link href="/theme-params">
                    <Cell subtitle="Telegram application palette information">
                        Theme Parameters
                    </Cell>
                </Link>
            </Section>

        </Page>
    );
}