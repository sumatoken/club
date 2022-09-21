import { trpc } from "../../utils/trpc";
import Call from "./Call";
import CreateChannelForm from "./CreateChannelForm";

export default function Dashboard() {
  const channels = trpc.useQuery(["getChannels"]);

  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <CreateChannelForm />
      {channels.isFetched &&
        channels.data!.map((channel, key) => (
          <Call
            key={key}
            channelName={channel.name}
            channelToken={channel.token}
            creator="creator"
          />
        ))}
    </div>
  );
}
