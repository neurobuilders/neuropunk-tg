"use client";

import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

import React from "react";
import {
    Avatar,
    Banner,
    Button,
    Cell,
    Image,
    Section
} from "@telegram-apps/telegram-ui";
import {Link} from "@/components/Link/Link";
import tonSvg from "@/app/_assets/ton.svg";

export default function Tasks() {
    const t = useTranslations("i18n");

    return (
        <Page back={true}>
            <Banner
                before={<Image src={"/logo.png"} size={48} />}
                callout="Urgent notification"
                description="NeuroSpace is a unique digital ecosystem that unites drum and bass and tech enthusiasts within a dynamic virtual world"
                header="Introducing Neuro Space"
                onCloseIcon={function noRefCheck(){}}
                type="section"
            >

            </Banner>
            <Section
                header="Tasks"
            >
                <Link href="/tasks">
                    <Cell
                        before={<Avatar size={40}>
                            <Image src={"/logo.png"} size={24} />
                        </Avatar>}
                    >
                        Neuropunk App
                    </Cell>
                </Link>
                <Link href="">
                    <Cell
                        before={
                            <Image
                                src={"/logo.png"}
                                style={{ backgroundColor: "#007AFF" }}
                            />
                        }
                        subtitle="Get Official App"
                    >
                        Neuropunk App
                    </Cell>
                </Link>
                <Link href="/launch-params">
                    <Cell before={<Avatar size={40}>
                        <Image src={"/logo.png"} size={24} />
                    </Avatar>}>
                        Neuropunk Premium
                    </Cell>
                </Link>
                <Link href="/theme-params">
                    <Cell
                        before={<Avatar size={40}>
                            <Image src={"/icons/telegram.svg"} size={24} />
                        </Avatar>}
                        >
                       Neuropunk Channel
                    </Cell>
                </Link>
            </Section>
            <Section
                header="Social"
            >
                <Link href="">
                    <Cell
                        before={<Avatar size={40}>
                            <Image src={"/logo.png"} size={24} />
                        </Avatar>}
                        subtitle="Check our app in appstore and google play"
                    >
                        Neuropunk Chat
                    </Cell>
                </Link>
                <Link href="">
                    <Cell
                        before={<Avatar size={40}>
                            <Image src={"/logo.png"} size={24} />
                        </Avatar>}
                        subtitle="Learn and co-create with us"
                    >
                        Neuropunk Academy
                    </Cell>
                </Link>
                <Link href="/launch-params">
                    <Cell before={<Avatar size={40}>
                        <Image src={"/icons/youtube.svg"} size={24} />
                    </Avatar>} subtitle="Subscribe">
                        Neuropunk Youtube
                    </Cell>
                </Link>
                <Link href="/theme-params">
                    <Cell
                        before={<Avatar size={40}>
                            <Image src={"/icons/soundcloud.svg"} size={24} />
                        </Avatar>}
                        subtitle="Listen">
                        Neuropunk SoundCloud
                    </Cell>
                </Link>
                <Link href="" hidden={true}>
                    <Cell
                        before={<Avatar size={40}>
                            <Image src={"/logo.png"} size={24} />
                        </Avatar>}
                        subtitle="coming soon"
                    >
                        Neuropunk Marketplace
                    </Cell>
                </Link>
            </Section>
        </Page>
    );
}