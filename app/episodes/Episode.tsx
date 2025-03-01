import { SkipBack, SkipForward } from "lucide-react";
import { ButtonLink } from "~/components/ButtonLink";
import { Footer } from "~/components/Footer";
import { EpisodeContent } from "~/episodes/EpisodeContent";
import type { EpisodeConfig } from "~/episodes/utils/getEpisodeConfigs";

export interface EpisodeProps {
  episode: EpisodeConfig;
  previousNumber: number | undefined;
  nextNumber: number | undefined;
}

export const Episode = ({
  episode,
  previousNumber,
  nextNumber,
}: EpisodeProps) => {
  return (
    <>
      <EpisodeContent episode={episode} logoLink="/" />
      <Footer>
        <ButtonLink
          to={previousNumber ? `/episodes/${previousNumber}` : undefined}
          startIcon={<SkipBack />}
        >
          Previous
        </ButtonLink>
        <ButtonLink
          to={nextNumber ? `/episodes/${nextNumber}` : undefined}
          endIcon={<SkipForward />}
        >
          Next
        </ButtonLink>
      </Footer>
    </>
  );
};
