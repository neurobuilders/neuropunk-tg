"use client";

import {Section, Cell, Image, List, Blockquote} from "@telegram-apps/telegram-ui";
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
              <NeuropunkRive />
              <NeuroWave />
          </Section>

          <Section
          >
              <Link href="/ton-connect">
                  <Cell
                      before={
                          <Image
                              src={tonSvg.src}
                              style={{ backgroundColor: "#007AFF" }}
                          />
                      }
                      subtitle="Connect your TON wallet"
                  >
                      TON Connect
                  </Cell>
              </Link>
          </Section>
      </List>
    </Page>
  );
}
