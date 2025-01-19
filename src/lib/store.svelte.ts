import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { readFile, readFileData } from './utils';

type UserFile = {
	file: File;
	status: 'base' | 'converting' | 'done' | 'error';
	progress: number;
};

class Converter {
	userFiles: UserFile[] = $state([]);
	ffmpeg?: FFmpeg;
	loaded = $state(false);

	async load() {
		this.ffmpeg = new FFmpeg();
		const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm';
		await this.ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
			workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
		});
		this.loaded = this.ffmpeg.loaded;
	}

	async reset() {
		this.userFiles = [];
		this.ffmpeg?.terminate();
		this.load();
	}

	async transcode(outType: string, outMime: string, options: string[]) {
		if (!this.ffmpeg || outType === '' || outMime === '') return;
		for (let userFile of this.userFiles) {
			userFile.status = 'converting';
			let outName = userFile.file.name.split('.').slice(0, -1).join('.') + `.${outType}`;
			try {
				this.ffmpeg.on('progress', (event) => {
					if (event.progress * 100 > 100 || event.progress * 100 < 0) {
						userFile.progress = 0;
					} else {
						userFile.progress = event.progress * 100;
					}
				});
				await this.ffmpeg.writeFile(userFile.file.name, await readFileData(userFile.file));
				await this.ffmpeg.exec(['-i', userFile.file.name, ...options, outName]);
				const data = await this.ffmpeg.readFile(outName);
				userFile.file = await readFile(data, outName, outMime);
				await this.ffmpeg.deleteFile(userFile.file.name);
				userFile.status = 'done';
				this.ffmpeg.on('progress', (event) => {});
			} catch (e) {
				userFile.status = 'error';
				this.ffmpeg.terminate();
				await this.ffmpeg.load();
			}
		}
	}
}

export const converter = new Converter();
