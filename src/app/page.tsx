"use client";

import {Button, Card, List, Placeholder, Section} from "@telegram-apps/telegram-ui";
import {useTranslations} from "next-intl";

import {Page} from "@/components/Page";

import {NeuroWave} from "@/components/NeuroWave/NeuroWave";
import {NeuropunkRive} from "@/components/NeuropunkRive";
import React from "react";
import {CardChip} from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import {CardCell} from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";

export default function Home() {
  const t = useTranslations("i18n");

  return (
    <Page back={false}>
      <List>
        <Section header="Welcome to Neuro Space">
            <div style={{padding: "20px", maxHeight: "100px", height: "100px"}}>
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
          <Section header={"Releases"}>
              <Card type="ambient">
            <React.Fragment key=".0">
                <CardChip readOnly>
                    Hot place
                </CardChip>
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
                <CardCell
                    readOnly
                    subtitle="Various Artists"
                >
                    Neuropunks LP 2
                </CardCell>
            </React.Fragment>
              </Card>
              <Card type="ambient">
                  <React.Fragment key=".0">
                      <CardChip readOnly>
                          Hot place
                      </CardChip>
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
                      <CardCell
                          readOnly
                          subtitle="Various Artists"
                      >
                          Neuropunks LP 2
                      </CardCell>
                  </React.Fragment>
              </Card>
        </Section>
          <Section header={"Events"}>
              <Card type="ambient">
                  <React.Fragment key=".0">
                      <CardChip readOnly>
                          Hot place
                      </CardChip>
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
                      <CardCell
                          readOnly
                          subtitle="Various Artists"
                      >
                          Neuropunks LP 2
                      </CardCell>
                  </React.Fragment>
              </Card>
              <Card type="ambient">
                  <React.Fragment key=".0">
                      <CardChip readOnly>
                          Hot place
                      </CardChip>
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
                      <CardCell
                          readOnly
                          subtitle="Various Artists"
                      >
                          Neuropunks LP 2
                      </CardCell>
                  </React.Fragment>
              </Card>
          </Section>
      </List>
    </Page>
  );
}
