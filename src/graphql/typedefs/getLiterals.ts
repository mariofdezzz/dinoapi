const __dirname = new URL('.', import.meta.url).pathname;

function getDef(path: string): Promise<string> {
	return Deno.readTextFile(__dirname + path);
}

function getDefs(paths: string[]): Promise<string[]> {
	return Promise.all(paths.map(getDef));
}

export async function getLiterals(paths: string[]): Promise<string> {
	return (await getDefs(paths)).join();
}
