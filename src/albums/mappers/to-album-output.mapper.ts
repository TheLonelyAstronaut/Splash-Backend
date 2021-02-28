import { AlbumOutput } from '../dto/outputs/album.output';
import { Album } from '../models/album.model';
import { toTrackOutput } from '../../tracks/mappers/to-track-output.mapper';

type SmartAlbumOutput<T> = T extends Album[] ? AlbumOutput[] : AlbumOutput;

export function toAlbumOutput<T extends Album | Album[]>(from: T): SmartAlbumOutput<T> {
	const mapper = (album: Album): AlbumOutput => ({
		id: album.id,
		artwork: album.artwork,
		name: album.name,
		tracks: album.tracks && toTrackOutput(album.tracks, album),
	});

	return (Array.isArray(from) ? from.map(mapper) : mapper(from as Album)) as SmartAlbumOutput<T>;
}
