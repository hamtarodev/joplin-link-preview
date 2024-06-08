webviewApi.onMessage((payload) => {
    if (payload.message == "init") {
        const cards = document.querySelectorAll('.card');
        for (const card of cards) {
            const linkFor = card.getAttribute('link-for');
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(linkFor, "_blank");
            })
        }
    }
});