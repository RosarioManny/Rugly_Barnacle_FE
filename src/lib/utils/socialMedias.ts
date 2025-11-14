import { EtsyLogo, InstagramLogo, TikTokLogo } from "../../components/ui/icons-svgs/socialMediaIcons";
import type { FC, SVGProps } from "react"

interface SocialMediaProps {
  Social: FC<SVGProps<SVGSVGElement>>,
}

export const socialMediaLogos: SocialMediaProps[] = [
  {Social: EtsyLogo},
  {Social: TikTokLogo},
  {Social: InstagramLogo},
];