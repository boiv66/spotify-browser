import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ArtistData } from "../data/artist-data";
import { AlbumData } from "../data/album-data";
import { TrackData } from "../data/track-data";
import { ResourceData } from "../data/resource-data";
import { ProfileData } from "../data/profile-data";
import { TrackFeature } from "../data/track-feature";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  expressBaseUrl: string = "http://localhost:8888";

  constructor(private http: HttpClient) {}

  private sendRequestToExpress(endpoint: string): Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated

    return this.http.get(`${this.expressBaseUrl}${endpoint}`).toPromise();
  }

  aboutMe(): Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data
    return this.sendRequestToExpress("/me").then((data) => {
      console.log(data);
      return new ProfileData(data);
    });
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.

    var endpoint = `${encodeURIComponent(category)}/${encodeURIComponent(
      resource
    )}`;

    return this.sendRequestToExpress(`/search/${endpoint}`).then((data) => {
      console.log(data);
      // console.log(Object.values(data));

      if (category === "artist") {
        return data.artists.items.map((artist) => new ArtistData(artist));
      } else if (category === "album") {
        return data.albums.items.map((album) => new AlbumData(album));
      } else {
        return data.tracks.items.map((track) => new TrackData(track));
      }
    });
  }

  getArtist(artistId: string): Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress(`/artist/${artistId}`).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId: string): Promise<ArtistData[]> {
    return this.sendRequestToExpress(
      `/artist-related-artists/${artistId}`
    ).then((data) => {
      return data.artists.map((artist) => new ArtistData(artist));
    });
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-top-tracks/${artistId}`).then(
      (data) => {
        return data.tracks.map((track) => new TrackData(track));
      }
    );
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-albums/${artistId}`).then(
      (data) => {
        return data.items.map((albumItem) => new AlbumData(albumItem));
        // return data;
      }
    );
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album/${albumId}`).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album-tracks/${albumId}`).then(
      (data) => {
        return data.items.map((item) => new TrackData(item));
      }
    );
  }

  getTrack(trackId: string): Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track/${trackId}`).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId: string): Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    const featureArray = [];
    return this.sendRequestToExpress(`/track-audio-features/${trackId}`).then(
      (data) => {
        for (const item in data) {
          if (TrackFeature.FeatureTypes.includes(item)) {
            featureArray.push(new TrackFeature(item, data[item]));
          }
        }
        return featureArray;
      }
    );
  }
}
