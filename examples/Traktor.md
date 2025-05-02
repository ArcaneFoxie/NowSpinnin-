# Traktor Integration

This document outlines the data structure and OSC paths available when using NowSpinnin' with Traktor.

## API Response

The `/nowplaying` endpoint returns the following JSON structure:

```json
{
  "absolutepath": "C:\\Users\\Foxie\\Music\\Tidal Sets\\Big City Life\\Big City Life - Luude & Mattafix.flac",
  "title": "Big City Life",
  "artist": "Luude & Mattafix",
  "coverArt": "",
  "additionalData": {
    "filePath": "C:\\Users\\Foxie\\Music\\Tidal Sets\\Big City Life\\Big City Life - Luude & Mattafix.flac",
    "title": "Big City Life",
    "artist": "Luude & Mattafix",
    "album": "Now That’s What I Call Music! 113",
    "genre": "Pop",
    "comment": "what a bop",
    "comment2": "",
    "label": "",
    "mix": "",
    "remixer": "",
    "key": "10d",
    "keyText": "10d",
    "gridOffset": 0.0016462650299072265,
    "trackLength": 146.71170043945312,
    "elapsedTime": 0,
    "nextCuePos": 0.0016462650299072265,
    "bpm": 87,
    "tempo": 1,
    "resultingKey": "10d",
    "isPlaying": false,
    "isSynced": false,
    "isKeyLockOn": false
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

### Traktor-Specific Paths
These paths provide additional Traktor-specific data. Note that these paths require remapping in the NowSpinnin' UI to work:
```
/NowSpinnin/additionalData/Traktor/filePath
/NowSpinnin/additionalData/Traktor/title
/NowSpinnin/additionalData/Traktor/artist
/NowSpinnin/additionalData/Traktor/album
/NowSpinnin/additionalData/Traktor/genre
/NowSpinnin/additionalData/Traktor/comment
/NowSpinnin/additionalData/Traktor/key
/NowSpinnin/additionalData/Traktor/keyText
/NowSpinnin/additionalData/Traktor/gridOffset
/NowSpinnin/additionalData/Traktor/trackLength
/NowSpinnin/additionalData/Traktor/nextCuePos
/NowSpinnin/additionalData/Traktor/bpm
/NowSpinnin/additionalData/Traktor/tempo
/NowSpinnin/additionalData/Traktor/resultingKey
```