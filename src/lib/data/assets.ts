// Centralized Asset Imports for Vite Static Bundling
import pgLogo from "../../../assets/images/Postgresql_elephant.png";
import mySqlLogo from "../../../assets/images/MySQL.svg";
import sqlLogo from "../../../assets/images/sql.png";
import phpLogo from "../../../assets/images/PHP.png";
import phpMyAdminLogo from "../../../assets/images/phpmyadmin.png";
import javaLogo from "../../../assets/images/java.png";
import pythonLogo from "../../../assets/images/Python.png";
import cLogo from "../../../assets/images/c.png";
import bootstrapLogo from "../../../assets/images/Bootstrap.svg";
import tailwindLogo from "../../../assets/images/Tailwind.svg.png";

// Project Screenshots and Fallbacks
import plinkkImg from "../../../assets/images/plinkk.png";
import hubgamesImg from "../../../assets/images/HubGames.jpeg";
import jobiImg from "../../../assets/images/Jobi.png";
import joSurfImg from "../../../assets/images/DA Site JO.png";
import defaultMetaImg from "../../../assets/images/my-avatar.png";
import iconAppImg from "../../../assets/images/icon-app.svg";
import iconDesignImg from "../../../assets/images/icon-design.svg";
import iconDevImg from "../../../assets/images/icon-dev.svg";

export const logoMap: Record<string, string> = {
  "Postgresql_elephant.png": pgLogo,
  "MySQL.svg": mySqlLogo,
  "sql.png": sqlLogo,
  "PHP.png": phpLogo,
  "phpmyadmin.png": phpMyAdminLogo,
  "java.png": javaLogo,
  "Python.png": pythonLogo,
  "c.png": cLogo,
  "Bootstrap.svg": bootstrapLogo,
  "Tailwind.svg.png": tailwindLogo
};

export const projectImageMap: Record<string, string> = {
  "icon-app.svg": iconAppImg,
  "plinkk.png": plinkkImg,
  "icon-design.svg": iconDesignImg,
  "MySQL.svg": mySqlLogo,
  "HubGames.jpeg": hubgamesImg,
  "Jobi.png": jobiImg,
  "DA Site JO.png": joSurfImg,
  "my-avatar.png": defaultMetaImg,
  "icon-dev.svg": iconDevImg
};

export const screenshotMap: Record<string, string> = {
  "plinkk.png": plinkkImg,
  "HubGames.jpeg": hubgamesImg,
  "Jobi.png": jobiImg,
  "DA Site JO.png": joSurfImg
};

export {
  pgLogo,
  mySqlLogo,
  sqlLogo,
  phpLogo,
  phpMyAdminLogo,
  javaLogo,
  pythonLogo,
  cLogo,
  bootstrapLogo,
  tailwindLogo,
  plinkkImg,
  hubgamesImg,
  jobiImg,
  joSurfImg,
  defaultMetaImg,
  iconAppImg,
  iconDesignImg,
  iconDevImg
};
