"use client";

import {Avatar, Badge, Button, Card, Cell, Chip, List, Placeholder, Section} from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

import { NeuroWave } from "@/components/NeuroWave/NeuroWave";
import { NeuropunkRive } from "@/components/NeuropunkRive";
import React from "react";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import WelcomeToNeuroSpace from "@/components/WelcomeToNeuroSpace";
import {IconCheckbox} from "@telegram-apps/telegram-ui/dist/components/Form/Checkbox/icons/checkbox";

export default function Home() {
    const t = useTranslations("i18n");

    return (
        <Page back={false}>
            <List>
                <Section header="Releases">
                    <div className={"padding-16"}>
                        <Card type="ambient">
                            <React.Fragment key=".0">
                                {/* Display release rate */}
                                <CardChip readOnly>
                                    <span>+2.2k $NeuroPulse</span>
                                </CardChip>

                                <div>
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
                                </div>

                                <CardCell
                                    readOnly
                                    subtitle="Various Artists"
                                    after={<IconCheckbox/>}
                                >
                                    Neuropunks LP 2
                                </CardCell>

                            </React.Fragment>
                        </Card>
                    </div>
                </Section>

                <Section header="Events">
                    <div className={"padding-16"}>
                        <Card>
                            <React.Fragment key=".0">
                                <CardChip readOnly>
                                    <div>
                                        <div><span>+200k $NeuroPulse</span></div>
                                        <div><span>200+ Neuropunkers</span></div>
                                    </div>
                                </CardChip>
                                <div style={{}}>
                                    <img
                                        alt="Neuropunks Moscow | 21.02.2025"
                                        src="https://neuropunk.ru/wp-content/uploads/2024/10/123123-1.jpg"
                                        style={{
                                            display: 'block',
                                            height: 300,
                                            objectFit: 'cover',
                                            width: 520
                                        }}
                                    />
                                </div>
                                <CardCell
                                    readOnly
                                    subtitle="Atmosphere"
                                >
                                    Neuropunks Moscow | 21.02.2025
                                </CardCell>
                            </React.Fragment>
                        </Card>
                    </div>
                </Section>
                <Section header={"NeuroPulse Meter"}>
                    <div className="padding-16">
                        <img src="/neuropulse.png" style={{
                            display: 'block',
                            height: 800,
                            objectFit: 'cover',
                            width: 520
                        }}/>
                    </div>
                </Section>
            </List>
        </Page>
    );
}
