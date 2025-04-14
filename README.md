# NowSpinnin'

A powerful and flexible DJ track information display system that captures and shares currently playing track information from various DJ software platforms. Perfect for streamers and DJs who want to display their currently playing tracks in OBS or other broadcasting software.

![image](https://github.com/user-attachments/assets/4baf02dd-8f63-4e1b-8f52-6aa5eff41d4a)

![image](https://github.com/user-attachments/assets/df7c7611-acae-49a9-ac6e-c7ca1a540736)

## Supported Platforms

### Windows
- DJUCED
- Mixxx
- VirtualDJ

### Linux
- Mixxx (Flatpak)

Want to see support for more platforms or operating systems? [Open an issue](https://github.com/ArcaneFoxie/NowSpinnin-/issues) to let us know!

## Features

- 🎵 Real-time track information detection from DJ software
- 🌐 Web API endpoints for track information
- 🎥 OBS integration
  - Ready-to-use display templates
  - Custom visual customization support
- ⚡ Real-time updates via WebSocket
- 🎨 Customizable display options

### Configuration

The application can be configured through the web interface or by modifying the configuration files in the application directory.

## API Endpoints

### REST API

- `GET http://localhost:4578/nowplaying` - Get current track information
  ```json
  {
    "title": "",
    "artist": "",
    "coverArt": "",
    "absolutepath": ""
  }
  ```

### WebSocket

Connect to `ws://localhost:4578` for real-time track updates. The WebSocket sends data in the following format:

```json
{
  "title": "",
  "artist": "",
  "coverArt": "",
  "absolutepath": ""
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
