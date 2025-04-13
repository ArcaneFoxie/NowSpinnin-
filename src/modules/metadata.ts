import { parseFile, selectCover } from "music-metadata"


export async function GetCoverFromFile (filePath: string): Promise<string | null> {
  const metaData = await parseFile(filePath)
  const picture = selectCover(metaData.common.picture)

  return picture !== null ? `data:${picture.format};base64,${Buffer.from(picture.data).toString('base64')}` : ''
}