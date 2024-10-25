"use client";

import { Section, List, Placeholder, Button } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

import { NeuroWave } from "@/components/NeuroWave/NeuroWave";
import { NeuropunkRive } from "@/components/NeuropunkRive";

export default function Home() {
  const t = useTranslations("i18n");

  return (
    <Page back={false}>
      <List>
        <Section header="Welcome to Neuro Space">
          <div style={{ padding: "20px" }}>
            <NeuropunkRive />
          </div>

          <div>
            <Placeholder
              action={
                <Button Component="a" href="/start" size="l" stretched>
                  Create Neuro Pass
                </Button>
              }
              description="The NeuroPass is not just a key; it’s a gateway to everything hidden beneath the surface"
            >
              <NeuroWave />
            </Placeholder>
          </div>
        </Section>
      </List>
    </Page>
  );
}
