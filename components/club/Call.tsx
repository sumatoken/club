import React, { useEffect, useState } from "react";
import { options, rtc, useClient, useMicrophoneTrack } from "../../lib/agora";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";
import { CallControls } from "./utils/CallControls";
interface callConfiguration {
  creator: string | string[] | undefined;
  channelName: string | string[] | undefined;
}

export default function Call({ creator, channelName }: callConfiguration) {
  const client = useClient();
  const remoteUsers = client.remoteUsers;
  const [inCall, setInCall] = useState(false);
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>(remoteUsers);

  useEffect(() => {
    let initRTCStream = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "audio" && user.hasAudio) {
          console.log("user published!");
          setUsers((prev) => {
            return [...prev, user];
          });
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio" && user.audioTrack) {
          console.log("user unpublished!");
          user.audioTrack.stop();
          setUsers((prev) => {
            return prev.filter((user) => user.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("user left!");
        setUsers((prev) => {
          return prev.filter((user) => user.uid !== user.uid);
        });
      });

      client.on("user-joined", (user) => {
        console.log("user joined", remoteUsers);
      });
    };

    try {
      initRTCStream("first");
      console.log("users!", remoteUsers);
    } catch (error) {
      console.log("error2", error);
    }
  }, [client]);

  return (
    <div>
      call: {creator + " " + channelName}
      <div>
        <CallControls
          channelName={String(channelName)}
          inCall={inCall}
          setInCall={setInCall}
        />
      </div>
    </div>
  );
}
