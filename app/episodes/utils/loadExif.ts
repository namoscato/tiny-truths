import ExifReader from "exifreader";
import type { PathLike } from "fs";
import { readFile } from "fs/promises";

interface Result {
  width: number;
  height: number;
  description: string | undefined;
}

export async function loadExif(path: PathLike): Promise<Result> {
  const buffer = await readFile(path);
  const tags = ExifReader.load(buffer);

  const width = tags["Image Width"];
  const height = tags["Image Height"];

  if (!width || !height) {
    throw new Error("Unable to extract image width or height");
  }

  return {
    width: width.value,
    height: height.value,
    description: tags.ImageDescription?.description,
  };
}
