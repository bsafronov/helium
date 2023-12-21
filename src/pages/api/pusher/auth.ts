import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "~/lib/pusher";
import { authOptions } from "~/server/auth";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session = await getServerSession(request, response, authOptions);

  if (!session?.user) {
    return response.status(401);
  }

  const body = request.body as {
    socket_id: string;
    channel_name: string;
  };
  const socketId = body.socket_id;
  const channel = body.channel_name;
  const data = {
    user_id: session.user.id,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return response.send(authResponse);
}
