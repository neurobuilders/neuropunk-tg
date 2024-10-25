"use client";

import {Section, Cell, Image, List, Blockquote, Placeholder, Timeline, Button} from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

import {NeuroWave} from "@/components/NeuroWave/NeuroWave";
import {NeuropunkRive} from "@/components/NeuropunkRive";

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
                      description="The Neuro Pass isn’t just a key to Neuro Space; it’s a gateway to the Multiverse of the Neuropunk creative drum and bass and tech community"
                  >
                      <NeuroWave/>
                  </Placeholder>
              </div>
          </Section>

      </List>
    </Page>
  );
}
