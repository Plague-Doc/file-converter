import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { converter } from './store.svelte';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const videoFormats = new Map<string, { mimeType: string; options: string[] }>([
	['MP4', { mimeType: 'video/mp4', options: ['-c:v', 'libx264', '-crf', '18', '-c:a', 'aac'] }],
	['MKV', { mimeType: 'video/x-matroska', options: ['-c:v', 'libx264', '-crf', '18', '-c:a', 'aac'] }],
	['AVI', { mimeType: 'video/avi', options: ['-c:v', 'mpeg4', '-q:v', '2', '-c:a', 'aac'] }],
	['MOV', { mimeType: 'video/quicktime', options: ['-c:v', 'libx264', '-crf', '18', '-c:a', 'aac'] }],
	['WMV', { mimeType: 'video/x-ms-wmv', options: ['-c:v', 'mpeg4', '-q:v', '2', '-c:a', 'aac'] }]
]);

export const imageFormats = new Map<string, { mimeType: string; options: string[] }>([
	['PNG', { mimeType: 'image/png', options: [] }],
	['JPEG', { mimeType: 'image/jpeg', options: ['-q:v', '2'] }],
	['GIF', { mimeType: 'image/gif', options: [] }],
	['WEBP', { mimeType: 'image/webp', options: ['-c:v', 'libwebp', '-lossless', '1'] }],
	['BMP', { mimeType: 'image/bmp', options: [] }],
	['TIFF', { mimeType: 'image/tiff', options: [] }]
]);

export const audioFormats = new Map<string, { mimeType: string; options: string[] }>([
	['MP3', { mimeType: 'audio/mpeg', options: ['-c:a', 'libmp3lame', '-q:a', '2'] }],
	['WAV', { mimeType: 'audio/wav', options: [] }],
	['OGG', { mimeType: 'audio/ogg', options: ['-c:a', 'libvorbis', '-q:a', '2'] }],
	['FLAC', { mimeType: 'audio/x-flac', options: [] }]
]);

export function getFormats() {
	const mediaType = converter.userFiles[0].file.type.split('/')[0];
	switch (mediaType) {
		case 'video':
			return videoFormats;
		case 'image':
			return imageFormats;
		case 'audio':
			return audioFormats;
	}
}
