import React, { useEffect, useState } from "react";
import { options, rtc, useClient, useMicrophoneTrack } from "../../lib/agora";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";
import { CallControls } from "./utils/CallControls";
import Image from "next/image";
interface callConfiguration {
  creator: string | null;
  channelName: string | null;
  channelToken: string | null;
}

export default function Call({
  creator,
  channelName,
  channelToken,
}: callConfiguration) {
  const client = useClient();
  const remoteUsers = client.remoteUsers;
  const [inCall, setInCall] = useState(false);
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>(remoteUsers);

  useEffect(() => {
    let initRTCStream = async () => {
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
      initRTCStream();
      console.log("users!", remoteUsers);
    } catch (error) {
      console.log("error2", error);
    }
  }, [client, users, remoteUsers]);

  return (
    <div>
      <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <Image
          className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="/image-4.jpg"
          alt=""
          width={60}
          height={150}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {channelName}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {creator}
          </p>
        </div>
      </div>

      <CallControls
        channelName={String(channelName)}
        channelToken={String(channelToken)}
        inCall={inCall}
        setInCall={setInCall}
      />
    </div>
  );
}
