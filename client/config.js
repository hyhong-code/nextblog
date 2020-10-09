import getConfig from "next/config";

const { publicRuntimeConfig: PRTC } = getConfig();

export const PRODUCTION = PRTC.PRODUCTION;
export const API = PRTC.PRODUCTION ? PRTC.API_RPOD : PRTC.API_DEV;
export const DOMAIN = PRTC.PRODUCTION ? PRTC.DOMAIN_PROD : PRTC.DOMAIN_DEV;
export const APP_NAME = PRTC.APP_NAME;
export const FB_APP_ID = PRTC.FB_APP_ID;
export const DISQUS_SHORTNAME = PRTC.DISQUS_SHORTNAME;
