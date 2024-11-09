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
          <Section header="NEUROPUNK PASS">
            <Cell before={<Image size={48} src="/neo.jpg" />} subtitle="Wake up">Neuro Morheus</Cell>
            <Cell subtitle="Social Pulse: Rising">Respect: 1.231</Cell>
            <Cell subtitle="Neuro: Engaged 💠">Premium: Active 🌀</Cell>
            <Cell subtitle="Wisdom flows through you">Rank: Oracle</Cell>
            <Cell subtitle="United in rhythm">Squad: Paperfunk</Cell>
          </Section>

          <Section header="Achievements">
            <Cell>🎖️ Boostframe Hooked</Cell>
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