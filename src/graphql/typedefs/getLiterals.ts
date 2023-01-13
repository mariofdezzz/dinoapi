const __dirname = new URL('.', import.meta.url).pathname;

function getDef(path: string): Promise<string> {
	return Deno.readTextFile(__dirname + path);
}

function getDefs(paths: string[]): Promise<string[]> {
	return Promise.all(paths.map(getDef));
}

async function getAllGQLFiles() {
	const files = [];
	for await (const path of Deno.readDir(__dirname)) {
		if (path.isFile && path.name.endsWith('.gql')) {
			files.push(path.name);
		}
	}
	return files;
}

export async function getLiterals(): Promise<string> {
	const paths = await getAllGQLFiles();
	const defs = await getDefs(paths);

	return defs.join();
}
