import getConfig from "next/config";

const { publicRuntimeConfig: PRTC } = getConfig();

export const API = PRTC.PRODUCTION ? PRTC.API_RPOD : PRTC.API_DEV;
export const APP_NAME = PRTC.APP_NAME;
export const PRODUCTION = PRTC.PRODUCTION;
