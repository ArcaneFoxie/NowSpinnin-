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
    "Tags/Author": "Luude & Mattafix",
    "Tags/Title": "Big City Life",
    "Tags/Genre": "Pop",
    "Tags/Album": "Now That’s What I Call Music! 113",
    "Tags/Label": "NOW Music",
    "Tags/TrackNumber": "4",
    "Tags/Year": "2022",
    "Tags/Bpm": "0.689655",
    "Tags/Flag": "1",
    "Infos/SongLength": "146.711701",
    "Infos/LastModified": "1746141344",
    "Infos/FirstSeen": "1744583194",
    "Infos/FirstPlay": "1746062063",
    "Infos/LastPlay": "1746141344",
    "Infos/PlayCount": "2",
    "Infos/Bitrate": "1017",
    "Infos/Cover": "1",
    "Scan/Version": "801",
    "Scan/Bpm": "0.689660",
    "Scan/AltBpm": "0.517234",
    "Scan/Volume": "1.539761",
    "Scan/Key": "Eb",
    "Scan/Flag": "32768",
    "Poi/0/Pos": "44.138321",
    "Poi/0/Type": "beatgrid",
    "Poi/1/Type": "automix",
    "Poi/1/Point": "realStart",
    "Poi/2/Pos": "144.927347",
    "Poi/2/Type": "automix",
    "Poi/2/Point": "realEnd",
    "Poi/3/Pos": "3.10",
    "Poi/3/Type": "automix",
    "Poi/3/Point": "fadeStart",
    "Poi/4/Pos": "143.60",
    "Poi/4/Type": "automix",
    "Poi/4/Point": "fadeEnd",
    "Poi/5/Pos": "44.139683",
    "Poi/5/Type": "automix",
    "Poi/5/Point": "cutStart",
    "Poi/6/Pos": "142.069116",
    "Poi/6/Type": "automix",
    "Poi/6/Point": "cutEnd",
    "Poi/7/Name": "Break 1",
    "Poi/7/Pos": "82.758821",
    "Poi/7/Type": "remix",
    "Poi/8/Name": "End Break 1",
    "Poi/8/Pos": "106.207347",
    "Poi/8/Type": "remix",
    "FilePath": "C:\\Users\\Foxie\\Music\\Tidal Sets\\Big City Life\\Big City Life - Luude & Mattafix.flac",
    "FileSize": "18645421"
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