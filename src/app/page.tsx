"use client";

import {Section, Cell, Image, List, Blockquote, Placeholder, Timeline, Button} from "@telegram-apps/telegram-ui";
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
import {Icon20Copy} from "@telegram-apps/telegram-ui/dist/icons/20/copy";

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
                      action={<Button Component="a" href="/start" size="l" stretched>Create Neuro Pass</Button>}
                      description="The NeuroPass is not just a key; it’s a gateway to everything hidden beneath the surface"
                  >
                      <NeuroWave/>
                  </Placeholder>
              </div>
          </Section>

      </List>
    </Page>
  );
}
