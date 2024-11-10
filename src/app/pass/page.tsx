"use client";

import {Section, Cell, List, Image, Badge} from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

export default function PassPage() {
  const t = useTranslations("i18n");

  return (
    <Page back={true}>
      <List>
        <Section header="NEUROPUNK PASS">
          <Cell
              before={<div className={"pt-2 pb-2"}><Image size={48} src="/neuropass-user.png" /></div>}
              description="Neuro Builder"
          >
            Neuro Morpheuz
          </Cell>

          <Cell before="🌟"  description="Neuro Experience Points" >
            1234 NeuroXP
          </Cell>

          <Cell before="🪄" description="NeuroKarma">
            +450
          </Cell>

          <Cell before="🔮" description="NeuroLevel">
            Level 5
          </Cell>

          <Cell before="🎫" description="">
            Access: Phase 01
          </Cell>

          <Cell
              before="🗓️"
              description="Joined Nov 2024"
          >
            Squad: NeuroBuilders.xyz
          </Cell>

        </Section>

        <Section header="Achievements">
          <Cell>🧪 Alpha Tester</Cell>
        </Section>

      </List>
    </Page>
  );
}
