import Hero from "../components/hero/Hero";
import Condition from "../components/sections/Condition";
import Intervention from "../components/sections/Intervention";
import OwnershipGap from "../components/sections/OwnershipGap";
import Outcome from "../components/sections/Outcome";
import DeploymentSurface from "../components/sections/DeploymentSurface";
import ForwardDeployedEngineering from "../components/sections/ForwardDeployedEngineering";
import Fieldwork from "../components/sections/Fieldwork";
import FinalAction from "../components/sections/FinalAction";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Condition />
        <Intervention />
        <OwnershipGap />
        <Outcome />
        <DeploymentSurface />
        <ForwardDeployedEngineering />
        <Fieldwork />
        <FinalAction />
      </main>
      <Footer />
    </>
  );
}
