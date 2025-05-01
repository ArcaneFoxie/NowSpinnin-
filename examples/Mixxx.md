# Mixxx Integration

This document outlines the data structure and OSC paths available when using NowSpinnin' with Mixxx.

## API Response

The `/nowplaying` endpoint returns the following JSON structure:

```json
{
  "artist": "Luude & Mattafix",
  "title": "Big City Life",
  "absolutepath": "C:/Users/Foxie/Music/Tidal Sets/Big City Life/Big City Life - Luude & Mattafix.flac",
  "coverArt": "",
  "additionalData": {
    "track_id": 21,
    "id": 21,
    "artist": "Luude & Mattafix",
    "title": "Big City Life",
    "album": "Now That’s What I Call Music! 113",
    "year": "2022",
    "genre": "Pop",
    "tracknumber": "4",
    "location": "C:/Users/Foxie/Music/Tidal Sets/Big City Life/Big City Life - Luude & Mattafix.flac",
    "comment": null,
    "url": null,
    "duration": 146.71170068,
    "bitrate": 1010,
    "samplerate": 44100,
    "cuepoint": 128,
    "bpm": 87,
    "wavesummaryhex": null,
    "channels": 2,
    "datetime_added": "2025-04-13T18:57:40.163Z",
    "mixxx_deleted": 0,
    "played": 0,
    "header_parsed": 1,
    "filetype": "flac",
    "replaygain": 0.2777548100860277,
    "timesplayed": 1,
    "rating": 0,
    "key": "Eb",
    "beats": {
      "0": 10,
      "1": 9,
      "2": 9,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 192,
      "9": 85,
      "10": 64,
      "11": 18,
      "12": 4,
      "13": 8,
      "14": 246,
      "15": 236,
      "16": 1
    },
    "beats_version": "BeatGrid-2.0",
    "composer": null,
    "bpm_lock": 0,
    "beats_sub_version": "rounding=V4|vamp_plugin_id=qm-tempotracker:0",
    "keys": {
      "0": 8,
      "1": 4,
      "2": 18,
      "3": 2,
      "4": 69,
      "5": 98,
      "6": 26,
      "7": 6,
      "8": 8,
      "9": 128,
      "10": 128,
      "11": 1,
      "12": 16,
      "13": 11,
      "14": 26,
      "15": 6,
      "16": 8,
      "17": 128,
      "18": 128,
      "19": 3,
      "20": 16,
      "21": 4,
      "22": 26,
      "23": 6,
      "24": 8,
      "25": 128,
      "26": 128,
      "27": 37,
      "28": 16,
      "29": 18,
      "30": 26,
      "31": 6,
      "32": 8,
      "33": 128,
      "34": 128,
      "35": 41,
      "36": 16,
      "37": 4,
      "38": 26,
      "39": 7,
      "40": 8,
      "41": 128,
      "42": 128,
      "43": 183,
      "44": 1,
      "45": 16,
      "46": 9,
      "47": 26,
      "48": 7,
      "49": 8,
      "50": 128,
      "51": 128,
      "52": 231,
      "53": 1,
      "54": 16,
      "55": 4,
      "56": 26,
      "57": 7,
      "58": 8,
      "59": 128,
      "60": 128,
      "61": 243,
      "62": 2,
      "63": 16,
      "64": 16,
      "65": 26,
      "66": 7,
      "67": 8,
      "68": 128,
      "69": 128,
      "70": 133,
      "71": 3,
      "72": 16,
      "73": 9,
      "74": 32,
      "75": 0
    },
    "keys_version": "KeyMap-1.0",
    "keys_sub_version": "vamp_plugin_id=qm-keydetector:2",
    "key_id": 4,
    "grouping": null,
    "album_artist": "Various Artists",
    "coverart_source": 1,
    "coverart_type": 1,
    "coverart_location": null,
    "coverart_hash": 28890,
    "replaygain_peak": -1,
    "tracktotal": "25",
    "color": null,
    "coverart_color": 8351342,
    "coverart_digest": {
      "0": 117,
      "1": 134,
      "2": 35,
      "3": 65,
      "4": 76,
      "5": 179,
      "6": 56,
      "7": 116,
      "8": 186,
      "9": 120,
      "10": 172,
      "11": 99,
      "12": 117,
      "13": 161,
      "14": 149,
      "15": 146,
      "16": 55,
      "17": 126,
      "18": 24,
      "19": 121,
      "20": 70,
      "21": 210,
      "22": 51,
      "23": 127,
      "24": 44,
      "25": 126,
      "26": 240,
      "27": 34,
      "28": 40,
      "29": 241,
      "30": 51,
      "31": 110
    },
    "last_played_at": "2025-04-13 19:15:31",
    "source_synchronized_ms": 1744569359521
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

### Mixxx-Specific Paths
These paths provide additional Mixxx-specific data. Note that these paths require remapping in the NowSpinnin' UI to work:
```
/NowSpinnin/additionalData/Mixxx/track_id
/NowSpinnin/additionalData/Mixxx/id
/NowSpinnin/additionalData/Mixxx/artist
/NowSpinnin/additionalData/Mixxx/title
/NowSpinnin/additionalData/Mixxx/album
/NowSpinnin/additionalData/Mixxx/year
/NowSpinnin/additionalData/Mixxx/genre
/NowSpinnin/additionalData/Mixxx/tracknumber
/NowSpinnin/additionalData/Mixxx/location
/NowSpinnin/additionalData/Mixxx/duration
/NowSpinnin/additionalData/Mixxx/bitrate
/NowSpinnin/additionalData/Mixxx/samplerate
/NowSpinnin/additionalData/Mixxx/cuepoint
/NowSpinnin/additionalData/Mixxx/bpm
/NowSpinnin/additionalData/Mixxx/channels
/NowSpinnin/additionalData/Mixxx/datetime_added
/NowSpinnin/additionalData/Mixxx/header_parsed
/NowSpinnin/additionalData/Mixxx/filetype
/NowSpinnin/additionalData/Mixxx/replaygain
/NowSpinnin/additionalData/Mixxx/timesplayed
/NowSpinnin/additionalData/Mixxx/key
/NowSpinnin/additionalData/Mixxx/beats
/NowSpinnin/additionalData/Mixxx/beats_version
/NowSpinnin/additionalData/Mixxx/beats_sub_version
/NowSpinnin/additionalData/Mixxx/keys
/NowSpinnin/additionalData/Mixxx/keys_version
/NowSpinnin/additionalData/Mixxx/keys_sub_version
/NowSpinnin/additionalData/Mixxx/key_id
/NowSpinnin/additionalData/Mixxx/album_artist
/NowSpinnin/additionalData/Mixxx/coverart_source
/NowSpinnin/additionalData/Mixxx/coverart_type
/NowSpinnin/additionalData/Mixxx/coverart_hash
/NowSpinnin/additionalData/Mixxx/replaygain_peak
/NowSpinnin/additionalData/Mixxx/tracktotal
/NowSpinnin/additionalData/Mixxx/coverart_color
/NowSpinnin/additionalData/Mixxx/coverart_digest
/NowSpinnin/additionalData/Mixxx/last_played_at
/NowSpinnin/additionalData/Mixxx/source_synchronized_ms
```