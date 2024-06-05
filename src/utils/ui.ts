import { extractLink } from "./links";

export const composeUi = (content: string[]) => {
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    container.setAttribute('id', 'parent-container');

    const headerDiv = document.createElement('div');
    const title = document.createElement('h2');
    title.setAttribute('class', 'title-input');
    title.innerText = "Link Preview";
    headerDiv.appendChild(title);
    container.appendChild(headerDiv);

    const body = document.createElement('section');
    body.setAttribute('class', 'preview-section');

    // For each lines
    for (const data of content) {
        const linkExtract = extractLink(data);
        const card = composeCard({
            title: 'sample',
            link: 'http://sampole'
        });

        body.appendChild(card);
    }

    container.appendChild(body);

    return container.innerHTML;
}

interface cardProps {
    title: string;
    link: string;
}

const composeCard = (props: cardProps) => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const text = `${props.link}\n${props.link}`;
    card.innerHTML = text;

    return card;
}