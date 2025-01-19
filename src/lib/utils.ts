import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function readFileData(file: File): Promise<Uint8Array> {
	return new Promise((resolve) => {
		const fileReader = new FileReader();
		fileReader.onload = () => {
			const { result } = fileReader;
			if (result instanceof ArrayBuffer) {
				resolve(new Uint8Array(result));
			} else {
				resolve(new Uint8Array());
			}
		};
		fileReader.readAsArrayBuffer(file);
	});
}

export async function readFile(data: Uint8Array | string, fileName: string, mimeType: string): Promise<File> {
	const blob = new Blob([data], { type: mimeType });
	return new File([blob], fileName, { type: mimeType });
}

export const videoCodecs = new Map<string, { mimeType: string; options: string[] }>([
	['MP4', { mimeType: 'video/mp4', options: ['-c:v', 'libx264', '-crf', '18', '-c:a', 'aac'] }],
	['MOV', { mimeType: 'video/quicktime', options: ['-c:v', 'libx264', '-crf', '18', '-c:a', 'aac'] }],
	['WMV', { mimeType: 'video/x-ms-wmv', options: ['-c:v', 'mpeg4', '-q:v', '2', '-c:a', 'aac'] }],
	['AVI', { mimeType: 'video/avi', options: ['-c:v', 'mpeg4', '-q:v', '2', '-c:a', 'aac'] }],
	['MKV', { mimeType: 'video/x-matroska', options: ['-c:v', 'libx264', '-crf', '18', '-c:a', 'aac'] }]
]);

export const imageCodecs = new Map<string, { mimeType: string; options: string[] }>([
	['PNG', { mimeType: 'image/png', options: [] }],
	['JPEG', { mimeType: 'image/jpeg', options: ['-q:v', '2'] }],
	['WEBP', { mimeType: 'image/webp', options: ['-c:v', 'libwebp', '-lossless', '1'] }],
	['GIF', { mimeType: 'image/gif', options: [] }],
	['BMP', { mimeType: 'image/bmp', options: [] }],
	['TIFF', { mimeType: 'image/tiff', options: [] }]
]);

export const audioCodecs = new Map<string, { mimeType: string; options: string[] }>([
	['MP3', { mimeType: 'audio/mpeg', options: ['-c:a', 'libmp3lame', '-q:a', '2'] }],
	['WAV', { mimeType: 'audio/wav', options: [] }],
	['FLAC', { mimeType: 'audio/x-flac', options: [] }],
	['OGG', { mimeType: 'audio/ogg', options: ['-c:a', 'libvorbis', '-q:a', '2'] }]
]);
