"use client";

import { Section, Cell, List, Image } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { Page } from "@/components/Page";

export default function Profile() {
  const t = useTranslations("i18n");

  return (
      <Page back={true}>
        <List>
          <Section header="Profile">
            <Cell before={<Image size={48} src="/neo.jpg" />} subtitle="Wake up">Neo Morheus</Cell>
            {/*<Cell subtitle="User's unique identifier">NeuroID: 47A3-M0RPH</Cell>*/}
            <Cell subtitle="Current level of the user">Level: 12</Cell>
            <Cell subtitle="Access information if available">NeuroPass: Active</Cell>
            <Cell subtitle="Amount of tokens">NeuroToken Balance: 15,430</Cell>
            <Cell subtitle="In-game currency amount">Neurospice: 7,800</Cell>
            <Cell subtitle="Current rank in the system">Rank: NeuroMaster</Cell>
          </Section>

          <Section header="Achievements">
            <Cell>🎖️ NeuroExplorer: Discovering the unknown realms of Neurospace.</Cell>
            <Cell>🚀 Captain: Commanding the Neuroship and journeying through Neurospace.</Cell>
            <Cell>🌌 NeuroContributor: Helping expand our Multiverse.</Cell>
            <Cell>🔥 NeuroPioneer: Among the first to chart new territories in Neurospace.</Cell>
            <Cell>💎 NeuroSage: Unlocking rare knowledge within the Neurobunker.</Cell>
          </Section>

          <Section header="Missions and Tasks">
            <Cell>Complete Today&#39;s Mission: Secure the latest Neurospice trade route in Neurospace (Reward: 500 Neurospice).</Cell>
            <Cell>Join NeuroSquad Mission: Collaborate with other captains to defend the Neurobunker (Reward: 1,000 Neurospice).</Cell>
            <Cell>Special Quest: Unlock new territories for the upcoming NeuroMarket expansion (Reward: Exclusive Neurospice boost and rank points).</Cell>
          </Section>

          <Section header="General Settings">
            <Cell>Customize your profile to make Neurospace truly yours. Adjust privacy, appearance, and update your Captain&#39;s log to keep the Multiverse updated on your journey.</Cell>
          </Section>
        </List>
      </Page>
  );
}