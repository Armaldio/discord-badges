# Custom Discord badges

A web server that generates badges based on Discord servers, using [shields.io](http://shields.io/) and [Express](https://expressjs.com).

## Types

Type | Example | URL
-----|---------|----
Generic | ![Generic](http://discord-badges.ddns.net/badge/discord) | `/badge/discord`
Online server members | ![Online count](http://discord-badges.ddns.net/badge/discord/online/136501988941758464) | `/badge/discord/online/<server id>`
Online members w/ custom title | ![](http://discord-badges.ddns.net/badge/discord/online/136501988941758464/custom server title) | `/badge/discord/online/<server_id>/<title>`

## Other properties

These query parameters can be used on the end of any badge.

Name | Description
-----|------------
`color` | The color for the right side of the badge, in hexadecimal, with no leading `#`. Default is Discord's Blurple (`7289DA`).
`icon` | The icon to use on the left of the badge. Can be a numeric value for one of the built-in icons, or a data URL for a custom icon.
`style` | The style value from shields.io. Can be `plastic`, `flat`, or `flat-square`. Defaults to `flat`.

## Built-in icons

Currently, only 1 icon is supported: `?icon=1` ![](http://discord-badges.ddns.net/badge/discord/online/136501988941758464?icon=1)

# Other random notes

- The `static/` folder contains a `.json` file with URL-encoded data URLs for each PNG inside. The keys of the JSON file match the name of the PNG file it's associated with, but the PNGs themselves are never featured in the code. They're just the decoded version that I work with when making changes.
- In order to use the "online members" badges for your server, you must enable the widget from the server's server settings (Server settings > Widget > Enable widget). If it's not (or if a bad server ID is specified), the server will produce the generic server badge as a fallback.
- Currently running on `discord-badges.ddns.net`, try it out there! **Note that this location is subject to change.**
