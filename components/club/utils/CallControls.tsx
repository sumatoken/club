import { options, useClient, useMicrophoneTrack } from "../../../lib/agora";

interface joinCallConfiguration {
  channelName: string;
  inCall: boolean;
  setInCall: (arg0: boolean) => void;
}

export const CallControls = ({
  channelName,
  inCall,
  setInCall,
}: joinCallConfiguration) => {
  const { ready, track, error } = useMicrophoneTrack();
  const client = useClient();
  const remoteUsers = client.remoteUsers;
  const joinChannel = async () => {
    try {
      if (track && ready)
        await client
          .join(options.appId, channelName, options.token, null)
          .then(async () => await client.publish([track]));

      console.log("joined!", remoteUsers);
      setInCall(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const leaveChannel = async () => {
    try {
      client.unpublish();
      client.leave();
      setInCall(false);
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
