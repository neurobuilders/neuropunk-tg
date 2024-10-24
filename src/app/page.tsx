"use client";

import {Section, Cell, Image, List, Blockquote, Placeholder} from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import tonSvg from "./_assets/ton.svg";
import {NeuroWave} from "@/components/NeuroWave/NeuroWave";
import {NeuropunkRive} from "@/components/NeuropunkRive";
import {NeuroWaveSound} from "@/components/NeuroWaveSound";

export default function Home() {
  const t = useTranslations("i18n");

  return (
    <Page back={false}>
      <List>
          <Section header="Welcome to Neuro Space">
              <NeuropunkRive/>

              <div className="HIJtihMA8FHczS02iWF5">
                  <Placeholder
                      description="A day blazes bright, a new system ignites,
NeuroPass – your pass to the future, takes flight!"
                  >
                      <NeuroWave/>
                  </Placeholder>
              </div>
          </Section>

      </List>
    </Page>
  );
}
