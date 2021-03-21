# some-rss-service
This api service will take a `rss-feed` url and fetch it, parse it and return the results into json format.

## Getting started

```
npm i
npm run start
```

# API endpoints

These endpoints allow you to convert a rss-feed to json or extract info data of mp3 files.


### GET /feed
Download and convert rss into json

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `url` | required | string  | Url to a rss feed to be converted

Example: [http://localhost:8000/feed?url=https://rss.acast.com/varvet](http://localhost:8000/feed?url=https://rss.acast.com/varvet)


### GET /episode
Extract info of mp3 file

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `url` | required | string  | Url to a mp3 file
 


Example: [http://localhost:8000/episode?url=https://sphinx.acast.com/varvet/kortversion-457-sabinaddumba/media.mp3](http://localhost:8000/episode?url=https://sphinx.acast.com/varvet/kortversion-457-sabinaddumba/media.mp3)


