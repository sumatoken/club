import { AgoraRTCError } from "agora-rtc-react";
import { useState } from "react";
import {
  MicrophoneAudioTrack,
  options,
  useClient,
  useMicrophoneTrack,
} from "../../../lib/agora";

interface JoinCallConfiguration {
  channelName: string;
  inCall: boolean;
  setInCall: (arg0: boolean) => void;
}

interface ReadyToCall {
  ready: boolean;
  track: MicrophoneAudioTrack | null;
  error: AgoraRTCError | null;
}

export const CallControls = ({
  channelName,
  inCall,
  setInCall,
}: JoinCallConfiguration) => {
  const [readyToCall, setReadyToCall] = useState(false);
  const { ready, track, error } = useMicrophoneTrack();
  const client = useClient();
  const remoteUsers = client.remoteUsers;
  const joinChannel = async () => {
    setReadyToCall(true);

    try {
      if (track && ready && !error) {
        console.log("ee");
        await client
          .join(options.appId, "channelName", options.token, null)
          .then(async () => await client.publish([track!]))
          .then(() => console.log("joined!", remoteUsers));
        setInCall(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const leaveChannel = async () => {
    try {
      client.unpublish();
      client.leave();
      setInCall(false);
      setReadyToCall(false);
      console.log("left!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!inCall ? (
        <button onClick={() => joinChannel()}>Join</button>
      ) : (
        <button onClick={() => leaveChannel()}>Leave</button>
      )}
    </div>
  );
};
