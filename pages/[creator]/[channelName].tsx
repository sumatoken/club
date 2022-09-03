import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Call = dynamic(() => import("../../components/club/Call"), {
  ssr: false,
});
type callConfiguration = [creator?: string, channelName?: string] | undefined;

const Club: NextPage = () => {
  const router = useRouter();
  const { creator, channelName } = router.query;
  console.log(creator);

  return <Call creator={creator} channelName={channelName} />;
};

export default Club;
