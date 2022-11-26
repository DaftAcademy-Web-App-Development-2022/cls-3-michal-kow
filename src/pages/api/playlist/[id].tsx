import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/libraries/mongoose.library";
import { Playlist } from "~/models/Playlist.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === "GET") {
    const playlists = await getPlaylist(id as string);
    res.status(200).send({ data: playlists });
  } else if (req.method === "DELETE") {
    await deletePlaylist(id as string);
    res.status(200).send({});
  }
}

async function getPlaylist(id: string) {
  const result = await Playlist.findById(id);
  if (!result) return null;
  const playlist = result.toObject();
  return {
    name: playlist.name,
  };
}

async function deletePlaylist(id: string) {
  await Playlist.findByIdAndDelete(id);
}
