import { RtcRole, RtcTokenBuilder } from "agora-access-token";

export function generateChannelToken(input: { channelName: string }) {
  const appID = process.env.AGORA_APP_ID!;
  const appCertificate = process.env.AGORA_APP_CERTEFICATE!;
  const channelName = input.channelName;
  const uid = 2;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
  console.log("gen");
  return token;
}
