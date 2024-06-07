import { extractLink, getMetaData } from "./links";

export const composeUi = async (content: string[]) => {
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    container.setAttribute('id', 'parent-container');

    const headerDiv = document.createElement('div');
    headerDiv.setAttribute('class', 'container');
    const title = document.createElement('label');
    title.setAttribute('class', 'panel-title');
    title.innerText = "Link Preview";
    headerDiv.appendChild(title);
    container.appendChild(headerDiv);

    const body = document.createElement('section');
    body.setAttribute('class', 'preview-section');

    // For each lines
    const cardsPromises: Promise<HTMLDivElement>[] = [];
    for (const data of content) {
        const linkExtract = extractLink(data);
        cardsPromises.push(composeCard({
            title: linkExtract.label,
            link: linkExtract.link
        }));
    }

    const cardsResults: HTMLDivElement[] = await Promise.all(cardsPromises);

    for (const card of cardsResults) {
        body.appendChild(card);
    }

    container.appendChild(body);

    return container.innerHTML;
}

interface cardProps {
    title: string;
    link: string;
}

const composeCard = async (props: cardProps) => {
    const urlMetaData = await getMetaData(props.link);

    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'container');

    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    // const label = document.createElement('label');
    // label.setAttribute('class', 'card-label');
    // label.innerHTML = props.title;

    const cardImage = document.createElement('img');
    cardImage.setAttribute('src', urlMetaData['og:image']);

    const cardTitleDescDiv = document.createElement('div');

    const cardTitle = document.createElement('h3');
    cardTitle.innerHTML = urlMetaData['og:title'];

    const cardDesc = document.createElement('p');
    cardDesc.innerHTML = urlMetaData['og:description'];

    cardTitleDescDiv.appendChild(cardTitle);
    cardTitleDescDiv.appendChild(cardDesc);
    
    card.append(cardImage);
    card.append(cardTitleDescDiv);

    // cardDiv.append(label);
    cardDiv.append(card);

    return cardDiv;
}