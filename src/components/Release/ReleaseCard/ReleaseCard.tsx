"use client";

import { Release } from "@/helpers/api/release";
import { Card, Cell, Info, Section } from "@telegram-apps/telegram-ui";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { ReleaseCover } from "../ReleaseCover/ReleaseCover";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import { Check } from "lucide-react";
import "./styles.scss";

interface ReleaseCardProps {
  release?: Release;
}

function ReleaseCard(props: ReleaseCardProps) {
  const { release } = props;
  if (!release) {
    return;
  }

  return (
    <Card type="ambient" className="release-card">
      <CardChip readOnly className="card-chip">
        {release.catalogNr}
      </CardChip>
      <ReleaseCover
        release={release}
        className="animate__animated animate__fadeIn"
      />
      <CardCell
        readOnly
        className="release-card__cell items-end"
        subtitle={release.title}
        multiline={true}
        description={<span className="text-gray-400">2024</span>}
        after={
          <Info type="text">
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <span>1 of 20</span>
              <Check color="#384429" size={16} />
            </span>
          </Info>
        }
      >
        {release.artist}
      </CardCell>
    </Card>
  );
}

export default ReleaseCard;
