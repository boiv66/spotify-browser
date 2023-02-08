import { ResourceData } from './resource-data';
import { ArtistData } from './artist-data';

export class AlbumData extends ResourceData {
	genres:string[];
	artists:ArtistData[];
	total_tracks: string; 
	popularity: string; 
	release_date: string; 
	label: string; 

	constructor(objectModel:{}) {
		super(objectModel);
		this.category="album";

		this.genres = objectModel['genres'];

		this.artists = objectModel['artists'].map((artist) => {
			return new ArtistData(artist);
		});

		this.total_tracks = objectModel['total_tracks']; 
		this.release_date = objectModel['release_date']; 
		this.label = objectModel['label']; 
		this.popularity = objectModel['popularity']; 
		
	}
}
