// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/bgicon1.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Nexti View",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "#",
    },
    {
      icon: <TwitterIcon />,
      link: "#",
    },
    {
      icon: <YouTubeIcon />,
      link: "#",
    },
  ],
  menus: [
    {
      name: "company",
      items: [{ name: "about us", href: "/pages/landing-pages/about-us" }],
    },
    {
      name: "resources",
      items: [{ name: "affiliate program", href: "#" }],
    },
    {
      name: "help & support",
      items: [{ name: "contact us", href: "#" }],
    },
    {
      name: "legal",
      items: [{ name: "terms & conditions", href: "#" }],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} by{" "}
      <MKTypography
        component="a"
        href="/presentation"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Nexti View
      </MKTypography>
      .
    </MKTypography>
  ),
};
