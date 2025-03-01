import { SkipBack } from "lucide-react";
import { ButtonLink } from "~/components/ButtonLink";
import { Footer } from "~/components/Footer";
import { EpisodeContent } from "~/episodes/EpisodeContent";
import type { EpisodeConfig } from "~/episodes/utils/getEpisodeConfigs";

interface Props {
  episode: EpisodeConfig;
}

export const Home = ({ episode }: Props) => {
  return (
    <>
      <EpisodeContent episode={episode} />
      <Footer>
        <ButtonLink to="/episodes" startIcon={<SkipBack />}>
          Episodes
        </ButtonLink>
      </Footer>
    </>
  );
};
