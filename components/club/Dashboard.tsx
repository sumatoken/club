import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import React, { useEffect, useState } from "react";
import { options, rtc } from "../../lib/agora";

const useAgora = () => {
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  rtc.client.on("user-published", async (user, mediaType) => {
    await rtc.client?.subscribe(user, mediaType);
    console.log("subscribed!");
    if (mediaType === "audio") {
      const remoteAudioTrack = user.audioTrack;
      remoteAudioTrack?.play();
    }
    rtc.client?.on("user-unpublished", async (user) => {
      await rtc.client?.unsubscribe(user);
    });
  });
  return { rtc };
};

export default function Dashboard() {
  const { rtc } = useAgora();

  const joinChannel = async () => {
    await rtc.client?.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await rtc.client?.publish([rtc.localAudioTrack]);
    console.log("published!");
  };
  const leaveChannel = async () => {
    rtc.localAudioTrack?.close();
    await rtc.client?.leave();
    console.log("left!");
  };

  return (
    <div>
      <button onClick={() => joinChannel()}>Join</button>

      <button onClick={() => leaveChannel()}>Leave</button>
    </div>
  );
}
