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
    "007eJxTYPiRqMjZ8spy/rkDhwSvfVohxeGfesoxzOjUt5/6YstPb+BQYLA0NjJJtbRIS0k1sTRJS7FMMjE0TTMzMjBKTUxKSzUw/GjCn1zYJpDM/Ow4EyMDBIL4rAxpmUXFJQwMALYnIbU=",
  uid: 123456,
};

export const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};

export const useClient = createClient(config);

export const useMicrophoneTrack = createMicrophoneAudioTrack();
