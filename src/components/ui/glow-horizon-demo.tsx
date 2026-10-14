import GlowHorizonFM from "@/src/components/ui/glow-horizon";
import { AnimatedTitleFM } from "@/src/components/ui/glow-horizon-utils/animated-title-fm";

export default function GlowHorizonDemo() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#050507]">
      <GlowHorizonFM variant="top" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedTitleFM open />
      </div>
    </div>
  );
}
