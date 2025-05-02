# VirtualDJ Integration

This document outlines the data structure and OSC paths available when using NowSpinnin' with VirtualDJ.

## API Response

The `/nowplaying` endpoint returns the following JSON structure:

```json
{
  "artist": "Luude & Mattafix",
  "title": "Big City Life",
  "absolutepath": "C:\\Users\\Foxie\\Music\\Tidal Sets\\Big City Life\\Big City Life - Luude & Mattafix.flac",
  "coverArt": "",
  "additionalData": {
    "Tags": {
      "Author": "Luude & Mattafix",
      "Title": "Big City Life",
      "Genre": "Pop",
      "Album": "Now That’s What I Call Music! 113",
      "Label": "NOW Music",
      "TrackNumber": "4",
      "Year": "2022",
      "Bpm": "0.689655",
      "Flag": "1"
    },
    "Infos": {
      "SongLength": "146.711701",
      "LastModified": "1746145302",
      "FirstSeen": "1744583194",
      "FirstPlay": "1746062063",
      "LastPlay": "1746145302",
      "PlayCount": "5",
      "Bitrate": "1017",
      "Cover": "1"
    },
    "Scan": {
      "Version": "801",
      "Bpm": "0.689660",
      "AltBpm": "0.517234",
      "Volume": "1.539761",
      "Key": "Eb",
      "Flag": "32768"
    },
    "Poi": [
      {
        "Pos": "44.138321",
        "Type": "beatgrid"
      },
      {
        "Type": "automix",
        "Point": "realStart"
      },
      {
        "Pos": "144.927347",
        "Type": "automix",
        "Point": "realEnd"
      },
      {
        "Pos": "3.10",
        "Type": "automix",
        "Point": "fadeStart"
      },
      {
        "Pos": "143.60",
        "Type": "automix",
        "Point": "fadeEnd"
      },
      {
        "Pos": "44.139683",
        "Type": "automix",
        "Point": "cutStart"
      },
      {
        "Pos": "142.069116",
        "Type": "automix",
        "Point": "cutEnd"
      },
      {
        "Name": "Break 1",
        "Pos": "82.758821",
        "Type": "remix"
      },
      {
        "Name": "End Break 1",
        "Pos": "106.207347",
        "Type": "remix"
      }
    ],
    "FilePath": "C:\\Users\\Foxie\\Music\\Tidal Sets\\Big City Life\\Big City Life - Luude & Mattafix.flac",
    "FileSize": "18755403"
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

### VirtualDJ-Specific Paths
These paths provide additional VirtualDJ-specific data. Note that these paths require remapping in the NowSpinnin' UI to work:
```
/NowSpinnin/additionalData/VirtualDJ/Tags/Author
/NowSpinnin/additionalData/VirtualDJ/Tags/Title
/NowSpinnin/additionalData/VirtualDJ/Tags/Genre
/NowSpinnin/additionalData/VirtualDJ/Tags/Album
/NowSpinnin/additionalData/VirtualDJ/Tags/Label
/NowSpinnin/additionalData/VirtualDJ/Tags/TrackNumber
/NowSpinnin/additionalData/VirtualDJ/Tags/Year
/NowSpinnin/additionalData/VirtualDJ/Tags/Bpm
/NowSpinnin/additionalData/VirtualDJ/Tags/Flag
/NowSpinnin/additionalData/VirtualDJ/Infos/SongLength
/NowSpinnin/additionalData/VirtualDJ/Infos/LastModified
/NowSpinnin/additionalData/VirtualDJ/Infos/FirstSeen
/NowSpinnin/additionalData/VirtualDJ/Infos/FirstPlay
/NowSpinnin/additionalData/VirtualDJ/Infos/LastPlay
/NowSpinnin/additionalData/VirtualDJ/Infos/PlayCount
/NowSpinnin/additionalData/VirtualDJ/Infos/Bitrate
/NowSpinnin/additionalData/VirtualDJ/Infos/Cover
/NowSpinnin/additionalData/VirtualDJ/Scan/Version
/NowSpinnin/additionalData/VirtualDJ/Scan/Bpm
/NowSpinnin/additionalData/VirtualDJ/Scan/AltBpm
/NowSpinnin/additionalData/VirtualDJ/Scan/Volume
/NowSpinnin/additionalData/VirtualDJ/Scan/Key
/NowSpinnin/additionalData/VirtualDJ/Scan/Flag
/NowSpinnin/additionalData/VirtualDJ/Poi/0/Pos
/NowSpinnin/additionalData/VirtualDJ/Poi/0/Type
/NowSpinnin/additionalData/VirtualDJ/Poi/1/Type
/NowSpinnin/additionalData/VirtualDJ/Poi/1/Point
/NowSpinnin/additionalData/VirtualDJ/Poi/2/Pos
/NowSpinnin/additionalData/VirtualDJ/Poi/2/Type
/NowSpinnin/additionalData/VirtualDJ/Poi/2/Point
/NowSpinnin/additionalData/VirtualDJ/Poi/3/Pos
/NowSpinnin/additionalData/VirtualDJ/Poi/3/Type
/NowSpinnin/additionalData/VirtualDJ/Poi/3/Point
/NowSpinnin/additionalData/VirtualDJ/Poi/4/Pos
/NowSpinnin/additionalData/VirtualDJ/Poi/4/Type
/NowSpinnin/additionalData/VirtualDJ/Poi/4/Point
/NowSpinnin/additionalData/VirtualDJ/Poi/5/Pos
/NowSpinnin/additionalData/VirtualDJ/Poi/5/Type
/NowSpinnin/additionalData/VirtualDJ/Poi/5/Point
/NowSpinnin/additionalData/VirtualDJ/Poi/6/Pos
/NowSpinnin/additionalData/VirtualDJ/Poi/6/Type
/NowSpinnin/additionalData/VirtualDJ/Poi/6/Point
/NowSpinnin/additionalData/VirtualDJ/Poi/7/Name
/NowSpinnin/additionalData/VirtualDJ/Poi/7/Pos
/NowSpinnin/additionalData/VirtualDJ/Poi/7/Type
/NowSpinnin/additionalData/VirtualDJ/Poi/8/Name
/NowSpinnin/additionalData/VirtualDJ/Poi/8/Pos
/NowSpinnin/additionalData/VirtualDJ/Poi/8/Type
/NowSpinnin/additionalData/VirtualDJ/FilePath
/NowSpinnin/additionalData/VirtualDJ/FileSize
```