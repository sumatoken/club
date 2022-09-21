import {
  ClientConfig,
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

import { createClient, createMicrophoneAudioTrack } from "agora-rtc-react";

interface RTC {
  localAudioTrack: IMicrophoneAudioTrack | null;
  client: IAgoraRTCClient | null;
}

interface optionsType {
  appId: string;
  channel: string;
  token: string;
  uid: number;
}

export let rtc: RTC = {
  localAudioTrack: null,
  client: null,
};

export let options: optionsType = {
  appId: process.env.AGORA_APP_ID!,
  channel: "first",
  token:
    "007eJxTYPh3QGfN7zmCVT+bVl21nMmusPbU2kmv/my3W5v6T7g02MJZgcHS2Mgk1dIiLSXVxNIkLcUyycTQNM3MyMAoNTEpLdXA0JhbLHlTjHhy8atIFkYGCATxWRnSMouKSxgYACulIpA=",
  uid: 123456,
};

export const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};

export const useClient = createClient(config);

export const useMicrophoneTrack = createMicrophoneAudioTrack();

export type MicrophoneAudioTrack = IMicrophoneAudioTrack;
