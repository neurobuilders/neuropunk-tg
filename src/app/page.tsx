"use client";

import {Section, Cell, Image, List, Blockquote, Placeholder, Timeline} from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import tonSvg from "./_assets/ton.svg";
import {NeuroWave} from "@/components/NeuroWave/NeuroWave";
import {NeuropunkRive} from "@/components/NeuropunkRive";
import {NeuroWaveSound} from "@/components/NeuroWaveSound";
import {
    TimelineItem
} from "@telegram-apps/telegram-ui/dist/components/Blocks/Timeline/components/TimelineItem/TimelineItem";

export default function Home() {
  const t = useTranslations("i18n");

  return (
    <Page back={false}>
      <List>
          <Section header="Welcome to Neuro Space">

              <div style={{padding: '20px'}}>
                  <NeuropunkRive/>
              </div>

              <div>
                  <Placeholder
                      description="A day blazes bright, a new system ignites,
NeuroPass – your pass to the future, takes flight!"
                  >
                      <NeuroWave/>
                  </Placeholder>
              </div>
          </Section>
          <Section>
              <Timeline active={1}>
              <TimelineItem header="Born">
                      Yesterday
                  </TimelineItem>
                  <TimelineItem header="Boosted">
                      Today
                  </TimelineItem>
                  <TimelineItem header="In transit">
                      Tomorrow
                  </TimelineItem>
              </Timeline>
          </Section>
      </List>
    </Page>
  );
}
