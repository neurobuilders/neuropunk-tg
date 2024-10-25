"use client";

import { useTranslations } from "next-intl";
import { Page } from "@/components/Page";

import React from "react";
import {
    Avatar, Badge,
    Banner, Card,
    Cell, Chip, IconButton,
    Image,
    Section
} from "@telegram-apps/telegram-ui";
import { Link } from "@/components/Link/Link";
import {Icon28Stats} from "@telegram-apps/telegram-ui/dist/icons/28/stats";
import {IconCheckbox} from "@telegram-apps/telegram-ui/dist/components/Form/Checkbox/icons/checkbox";
import {Check} from "lucide-react";
import RiveComponent from '@rive-app/react-canvas';

export default function Tasks() {
    const t = useTranslations("i18n");

    return (
        <Page back={true}>

            <Banner
                before={<Avatar size={96}>
                    <div style={{width: '70px', height: '70px'}}>
                        <RiveComponent
                            src="/rives/loading.riv"
                            stateMachines={"State Machine 1"}
                            artboard={"Artboard"}
                        />
                    </div>
                </Avatar>}
                callout="Welcome Neuropunkers!"
                description="NeuroSpace is a unique digital ecosystem that unites drum and bass and tech enthusiasts within a dynamic virtual world"
                header="Introducing Neuro Space"
                type="section"
            />




            <Section header="Tasks">
                <Link href="/tasks">
                    <Cell
                        before={
                            <Avatar size={40}>
                                <Image src={"/logo.png"} size={24}/>
                            </Avatar>
                        }
                        after={<Badge type="number">+100</Badge>}
                    >
                        Neuropunk App
                    </Cell>
                </Link>

                <Link href="">
                    <Cell
                        before={
                            <Image
                                src={"/logo.png"}
                                style={{backgroundColor: "#007AFF"}}
                            />
                        }
                        after={<Badge type="number">+100</Badge>}
                        subtitle="Get Official App"
                    >
                        Neuropunk App
                    </Cell>
                </Link>

                <Link href="/launch-params">
                    <Cell
                        before={
                            <Avatar size={40}>
                                <Image src={"/logo.png"} size={24}/>
                            </Avatar>
                        }
                        after={<IconButton
                            mode="outline"
                            size="s"
                        >
                            <Check/>
                        </IconButton>}
                    >
                        Neuropunk Premium
                    </Cell>
                </Link>

                <Link href="/theme-params">
                    <Cell
                        before={
                            <Avatar size={40}>
                                <Image src={"/icons/telegram.svg"} size={24}/>
                            </Avatar>
                        }
                        after={<Badge type="number">+100</Badge>}
                    >
                        Neuropunk Channel
                    </Cell>
                </Link>
            </Section>

            <Section header="Social">
                <Link href="">
                    <Cell
                        before={
                            <Avatar size={40}>
                                <Image src={"/logo.png"} size={24}/>
                            </Avatar>
                        }
                        subtitle="Check our app in appstore and google play"
                        after={<Badge type="number">+100</Badge>}
                    >
                        Neuropunk Chat
                    </Cell>
                </Link>

                <Link href="">
                    <Cell
                        before={
                            <Avatar size={40}>
                                <Image src={"/logo.png"} size={24}/>
                            </Avatar>
                        }
                        subtitle="Learn and co-create with us"
                        after={<Badge type="number">+100</Badge>}
                    >
                        Neuropunk Academy
                    </Cell>
                </Link>

                <Link href="/launch-params">
                    <Cell
                        before={
                            <Avatar size={40}>
                                <Image src={"/icons/youtube.svg"} size={24}/>
                            </Avatar>
                        }
                        after={<Badge type="number">+100</Badge>}
                        subtitle="Subscribe"
                    >
                        Neuropunk Youtube
                    </Cell>
                </Link>

                <Link href="/theme-params">
                    <Cell
                        before={
                            <Avatar size={40}>
                                <Image src={"/icons/soundcloud.svg"} size={24}/>
                            </Avatar>
                        }
                        after={<Badge type="number">+100</Badge>}
                        subtitle="Listen"
                    >
                        Neuropunk SoundCloud
                    </Cell>
                </Link>

                <Link href="" hidden={true}>
                    <Cell
                        before={
                            <Avatar size={40}>
                                <Image src={"/logo.png"} size={24}/>
                            </Avatar>
                        }
                        after={<Badge type="number">+100</Badge>}
                        subtitle="coming soon"
                    >
                        Neuropunk Marketplace
                    </Cell>
                </Link>
            </Section>
        </Page>
    );
}