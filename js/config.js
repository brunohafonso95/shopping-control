function setConfig() {
    let texts = {
        title: "Shopping Control"
    };
    document.title = texts.title;
    document.getElementById('navTitle').textContent = texts.title;
}

setConfig();