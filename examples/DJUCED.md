# DJUCED Integration

This document outlines the data structure and OSC paths available when using NowSpinnin' with DJUCED.

## API Response

The `/nowplaying` endpoint returns the following JSON structure:

```json
{
  "artist": "Luude & Mattafix",
  "title": "Big City Life",
  "absolutepath": "C:/Users/Foxie/Music/Tidal Sets/Big City Life/Big City Life - Luude & Mattafix.flac",
  "coverArt": "",
  "additionalData": {
    "id": 23,
    "album": "Now That’s What I Call Music! 113",
    "albumartist": "Various Artists",
    "artist": "Luude & Mattafix",
    "bitrate": 1023,
    "comment": "what a bop",
    "composer": "",
    "coverimage": "",
    "title": "Big City Life",
    "smart_advisor": null,
    "bpm": 87,
    "max_val_gain": -14.758700370788574,
    "tracknumber": 4,
    "drive": "C:/",
    "filepath": "C:/Users/Foxie/Music/Tidal Sets/Big City Life",
    "filename": "Big City Life - Luude & Mattafix.flac",
    "absolutepath": "C:/Users/Foxie/Music/Tidal Sets/Big City Life/Big City Life - Luude & Mattafix.flac",
    "filetype": "flac",
    "key": 6,
    "genre": "Pop",
    "filesize": 18645421,
    "length": 146.657,
    "rating": 0,
    "filedate": "2025-05-02T01:14:22",
    "year": 2022,
    "playcount": 8,
    "first_played": "2025-04-13T16:16:32",
    "last_played": "2025-05-02T01:14:28",
    "first_seen": "2025-04-09T21:07:48",
    "tags_read": 1,
    "danceability": 1.075119972229004,
    "samplerate": 44100,
    "stores": null
  }
}
```

## OSC Paths

### Standard Paths
These paths are available for all supported DJ software:
```
/NowSpinnin/songupdate/absolutepath
/NowSpinnin/songupdate/title
/NowSpinnin/songupdate/artist
```

### DJUCED-Specific Paths
These paths provide additional DJUCED-specific data. Note that these paths require remapping in the NowSpinnin' UI to work:
```
/NowSpinnin/additionalData/DJUCED/id
/NowSpinnin/additionalData/DJUCED/album
/NowSpinnin/additionalData/DJUCED/albumartist
/NowSpinnin/additionalData/DJUCED/artist
/NowSpinnin/additionalData/DJUCED/bitrate
/NowSpinnin/additionalData/DJUCED/comment
/NowSpinnin/additionalData/DJUCED/title
/NowSpinnin/additionalData/DJUCED/bpm
/NowSpinnin/additionalData/DJUCED/max_val_gain
/NowSpinnin/additionalData/DJUCED/tracknumber
/NowSpinnin/additionalData/DJUCED/drive
/NowSpinnin/additionalData/DJUCED/filepath
/NowSpinnin/additionalData/DJUCED/filename
/NowSpinnin/additionalData/DJUCED/absolutepath
/NowSpinnin/additionalData/DJUCED/filetype
/NowSpinnin/additionalData/DJUCED/key
/NowSpinnin/additionalData/DJUCED/genre
/NowSpinnin/additionalData/DJUCED/filesize
/NowSpinnin/additionalData/DJUCED/length
/NowSpinnin/additionalData/DJUCED/filedate
/NowSpinnin/additionalData/DJUCED/year
/NowSpinnin/additionalData/DJUCED/playcount
/NowSpinnin/additionalData/DJUCED/first_played
/NowSpinnin/additionalData/DJUCED/last_played
/NowSpinnin/additionalData/DJUCED/first_seen
/NowSpinnin/additionalData/DJUCED/tags_read
/NowSpinnin/additionalData/DJUCED/danceability
/NowSpinnin/additionalData/DJUCED/samplerate
```