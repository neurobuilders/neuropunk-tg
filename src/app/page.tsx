"use client";

import { Avatar, Badge, Button, Card, Cell, List, Placeholder, Section } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

import { NeuroWave } from "@/components/NeuroWave/NeuroWave";
import { NeuropunkRive } from "@/components/NeuropunkRive";
import React from "react";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import WelcomeToNeuroSpace from "@/components/WelcomeToNeuroSpace";

export default function Home() {
    const t = useTranslations("i18n");

    return (
        <Page back={false}>
            <List>
                <Section header="Campaigns">
                    <div className={"_padding-16"}>
                        <Card type="ambient">
                            <React.Fragment key=".0">
                                <CardChip readOnly>
                                    Featured Campaign
                                </CardChip>
                                <img
                                    alt="Flappy Campaign"
                                    src="https://cdn.neurocdn.ru/covers/flappy_campaign.jpg" // Replace with actual image link if available
                                    style={{
                                        display: 'block',
                                        height: 308,
                                        objectFit: 'cover',
                                        width: 254
                                    }}
                                />
                                <CardCell
                                    readOnly
                                    subtitle="Flap and Earn! 3M $NOT among TOP-500"
                                >
                                    Flappy Campaign
                                </CardCell>
                            </React.Fragment>
                        </Card>
                    </div>
                </Section>

                <Section header="Releases">
                    <Card type="ambient">
                        <React.Fragment key=".0">
                            <CardChip readOnly>
                                Hot Release
                            </CardChip>
                            <img
                                alt="Neuropunks LP 2"
                                src="https://cdn.neurocdn.ru/covers/NRPNK063.jpg"
                                style={{
                                    display: 'block',
                                    height: 308,
                                    objectFit: 'cover',
                                    width: 254
                                }}
                            />
                            <CardCell
                                readOnly
                                subtitle="Various Artists"
                            >
                                Neuropunks LP 2
                            </CardCell>
                        </React.Fragment>
                    </Card>
                </Section>

                <Section header="Events">
                    <Card type="ambient">
                        <React.Fragment key=".0">
                            <CardChip readOnly>
                                Upcoming Event
                            </CardChip>
                            <img
                                alt="Neuropunks Event"
                                src="https://cdn.neurocdn.ru/covers/event_cover.jpg" // Replace with actual event image link if available
                                style={{
                                    display: 'block',
                                    height: 308,
                                    objectFit: 'cover',
                                    width: 254
                                }}
                            />
                            <CardCell
                                readOnly
                                subtitle="Live Event in Neuro Space"
                            >
                                Neuropunks Gathering
                            </CardCell>
                        </React.Fragment>
                    </Card>
                </Section>
            </List>
        </Page>
    );
}
