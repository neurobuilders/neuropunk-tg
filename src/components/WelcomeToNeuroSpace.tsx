import {NeuropunkRive} from "@/components/NeuropunkRive";
import {Button, Placeholder, Section} from "@telegram-apps/telegram-ui";
import {NeuroWave} from "@/components/NeuroWave/NeuroWave";
import React from "react";

export default function WelcomeToNeuroSpace() {
    return <Section header="Welcome to Neuro Space">
        <div style={{ padding: "16px", maxHeight: "100px", height: "100px" }}>
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
}