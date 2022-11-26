import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/libraries/mongoose.library";
import { Playlist } from "~/models/Playlist.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  if (req.method === "GET") {
    const playlists = await getPlaylists();
    res.status(200).send({ data: playlists });
  } else if (req.method === "POST") {
    await createPlaylist(req.body);
    res.status(201).send({});
  }
  res.status(200).send({});
}

async function getPlaylists() {
  const result = await Playlist.find();
  return result.map((doc) => {
    return {
      spotifyId: doc.spotifyId,
      color: doc.color,
      name: doc.name,
      owncer: doc.owner,
      slug: doc.slug,
      upvote: doc.upvote,
    };
  });
}

async function createPlaylist(obj: unknown) {
  await Playlist.create(obj);
}
