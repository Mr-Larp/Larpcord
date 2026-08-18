let unpatch;

const onLoad = () => {
    const { findByProps } = vendetta.metro;
    const { after } = vendetta.patcher;

    const extraPropsMod = findByProps("getExtraProperties");
    if (extraPropsMod) {
        unpatch = after("getExtraProperties", extraPropsMod, (_, res) => {
            if (!res) return res;
            res.os = "Windows";
            res.browser = "Discord Client";
            res.os_version = "10.0.19045";
            res.browser_user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Discord/1.0.9013 Chrome/120.0.6099.291 Electron/28.2.10 Safari/537.36";
            res.client_build_number = 300000;
            return res;
        });
    }

    const socketMod = findByProps("getSocket");
    const socket = socketMod?.getSocket();
    if (socket) {
        socket.sessionId = null;
        socket.close(4000, "PlatformSpoofer reconnect");
    }
};

const onUnload = () => {
    if (unpatch) unpatch();

    const socketMod = vendetta?.metro?.findByProps("getSocket");
    const socket = socketMod?.getSocket();
    if (socket) {
        socket.sessionId = null;
        socket.close(4000, "PlatformSpoofer reconnect");
    }
};

exports.onLoad = onLoad;
exports.onUnload = onUnload;
