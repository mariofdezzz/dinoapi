import { join } from 'https://deno.land/std@0.171.0/path/mod.ts';

export interface ReadDirOptions {
	subPath?: string;
	recursive?: boolean;
}

// TODO: Share on deno.land/std
export async function* readDir(
	path: string,
	{ recursive, subPath }: ReadDirOptions = {},
): AsyncGenerator<Deno.DirEntry> {
	const fullPath = subPath ? join(path, subPath) : path;

	for await (const dir of Deno.readDir(fullPath)) {
		if (recursive && dir.isDirectory) {
			yield* readDir(path, {
				recursive,
				subPath: subPath ? join(subPath, dir.name) : dir.name,
			});
		} else {
			if (subPath) {
				dir.name = join(subPath, dir.name);
			}
			yield dir;
		}
	}
}
