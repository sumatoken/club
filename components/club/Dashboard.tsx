import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";
import React, { useEffect, useState } from "react";
import { options, rtc, useClient, useMicrophoneTrack } from "../../lib/agora";

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
  // const { rtc } = useAgora();
  /* 
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
  }; */

  const [inCall, setInCall] = useState(false);
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, track, error } = useMicrophoneTrack();

  useEffect(() => {
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "audio" && user.hasAudio) {
          setUsers((prev) => {
            return [...prev, user];
          });
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio" && user.audioTrack) {
          user.audioTrack.stop();
          setUsers((prev) => {
            return prev.filter((user) => user.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prev) => {
          return prev.filter((user) => user.uid !== user.uid);
        });
      });

      client.on("user-joined", (user) => {
        console.log("new user joined!");
        setUsers((prev) => {
          return [...prev, user];
        });
      });

      try {
        await client.join(options.appId, name, options.token, null);
        console.log("joined!");
      } catch (error) {
        console.log("error", error);
      }

      if (track) await client.publish([track]);
      setStart(true);
    };

    if (ready && track) {
      try {
        init("first");
        console.log("users", users);
      } catch (error) {
        console.log("error2", error);
      }
    }
  }, [client, ready, track]);

  return (
    <div>
      {!inCall ? (
        <button onClick={() => console.log("join!")}>Join</button>
      ) : (
        <button onClick={() => console.log("Leave!")}>Leave</button>
      )}
    </div>
  );
}
