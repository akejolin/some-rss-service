# some-rss-service
This api service will take a `rss-feed` url and fetch it, parse it and return the results into json format. Also extract episode info via mp3 files

## Getting started

```
npm i
npm run start
```

## API endpoints


### GET /feed
Download and convert rss into json

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `url` | required | string  | Url to a rss feed to be converted

**Response**

```
[
  {
    "title": "Some title",
    "checksum": "abc",
    "file": "https://some.url.to/file.mp3"
  },
]
```


Example: [http://localhost:8000/feed?url=https://rss.acast.com/varvet](http://localhost:8000/feed?url=https://rss.acast.com/varvet)


### GET /episode
Extract info of mp3 file

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `url` | required | string  | Url to a mp3 file
 

```
{
  "format": {
    "tagTypes": [
      "ID3v2.3"
    ],
    "trackInfo": [],
    "lossless": false,
    "container": "MPEG",
    "codec": "MPEG 1 Layer 3",
    "sampleRate": 44100,
    "numberOfChannels": 1,
    "bitrate": 64000,
    "codecProfile": "CBR",
    "numberOfSamples": 115975296,
    "duration": 2629.825306122449
  },
  "native": {
    "ID3v2.3": [
      {
        "id": "ABC",
        "value": "Some title"
      },
      {
        "id": "CDE",
        "value": "Some company"
      },
      {
        "id": "FGH",
        "value": "Some title"
      },
      {
        "id": "IJK",
        "value": "2021"
      },
      {
        "id": "LMN",
        "value": "2021-03-02T02:00:00.000Z"
      },
      {
        "id": "OPQ",
        "value": "Podcast"
      }
    ]
  },
  "quality": {
    "warnings": []
  },
  "common": {
    "track": {
      "no": null,
      "of": null
    },
    "disk": {
      "no": null,
      "of": null
    },
    "movementIndex": {},
    "title": "Some title",
    "artists": [
      "Some artist"
    ],
    "artist": "Some artist",
    "album": "Some album",
    "year": 2021,
    "genre": [
      "Podcast"
    ]
  }
}
```

Example: [http://localhost:8000/episode?url=https://sphinx.acast.com/varvet/kortversion-457-sabinaddumba/media.mp3](http://localhost:8000/episode?url=https://sphinx.acast.com/varvet/kortversion-457-sabinaddumba/media.mp3)

