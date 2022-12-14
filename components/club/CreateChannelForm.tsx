import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

export default function CreateChannelForm() {
  const createChannel = trpc.useMutation("createChannelToken");
  const [name, setName] = useState("");
  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(e) => {
        console.log(name);
        e.preventDefault();
        createChannel.mutate({
          channelName: name,
        });
      }}
    >
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Chill"
          aria-label="Room name"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Create
        </button>
        <button
          className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
