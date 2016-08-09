let express = require("express");
let app = express();
let request = require("request");
let assets = require("./static/assets.json"); // stores icons in url-encoded data:image/png format

// Just for the heck of it, expose the assets directory too, so people can use that
app.use(express.static('static'));

// Generic function for constructing a badge
function badge(options) {
    // Format for URL
    left = options.left.replace("-", "--").replace("_", "__");
    right = options.right.replace("-", "--").replace("_", "__");
    // If no custom color is there, use Discord's blurple
    if (!options.color) options.color = "7289DA";
    // icon will be an identifier, let's confert it into a data URL
    switch (options.icon) {
        case "1": // No border, just the controller part
            options.icon = assets.iconWhiteShadow;
            break;
        // No default - If there's no match, assume it's a Base64 string to be used as a custom icon
    }
    // Construct
    url = `https://img.shields.io/badge/${options.left}-${options.right}-${options.color}.svg`
    let paramsPart = "?";
    // If an icon is there, use it
    if (options.icon) paramsPart += "logo="+options.icon+"&";
    // If there's a style set, pass that along as well
    if (options.style) paramsPart +="style="+options.style+"&";
    paramsPart = paramsPart.replace(/\&$/, "");
    if (paramsPart === "?") paramsPart = "";
    url += paramsPart;

    return url;
}

// Get total online users from a Discord server
function getOnlineUsers(serverId, callback) {
    request(`https://discordapp.com/api/servers/${serverId}/widget.json`, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            body = JSON.parse(body);
            let onlineCount = body.members.length;
            callback(null, onlineCount);
        } else {
            callback(new Error(response.statusCode));
        }
    });
}

///////////////////////////////
//////// Server badges ////////
///////////////////////////////

// Generic "chat on Discord"
app.get("/badge/discord", (req, res) => {
    res.redirect(badge({
        left: "chat",
        right: "on Discord",
        color: req.query.color,
        icon: req.query.icon,
        style: req.query.style
    }));
});

// "Discord server" on the left, online users on the right
app.get("/badge/discord/online/:serverId", (req, res) => {
    let serverId = req.params.serverId; // The server ID to get members from

    getOnlineUsers(serverId, (err, amount) => {
        // Error means the person doesn't have widgets enabled for their server, fallback to generic
        if (err) res.redirect("/badge/discord");
        // Otherwise, send a badge with the data requested
        res.redirect(badge({
            left: "Discord server",
            right: `${amount} online`,
            color: req.query.color,
            icon: req.query.icon,
            style: req.query.style
        }));
    });
});

// Custom title on the left, online users on the right
app.get("/badge/discord/online/:serverId/:displayName", (req, res) => {
    let serverId = req.params.serverId; // The server ID to get members from
    let displayName = req.params.displayName; // What to show on the right side

    getOnlineUsers(serverId, (err, amount) => {
        // Error means the person doesn't have widgets enabled for their server, fallback to generic
        if (err) res.redirect("/badge/discord");
        // Otherwise, send a badge with the data requested
        res.redirect(badge({
            left: displayName,
            right: `${amount} online`,
            color: req.query.color,
            icon: req.query.icon,
            style: req.query.style
        }));
    });
});

app.listen(80);
