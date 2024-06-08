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
    card.setAttribute('link-for', props.link);

    // details
    const cardDetails = document.createElement('div');
    cardDetails.classList.add('card-details');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    const cardTitleContent = document.createElement('h3');
    cardTitleContent.innerHTML = urlMetaData['og:title'];
    cardTitle.appendChild(cardTitleContent);
    cardDetails.appendChild(cardTitle);

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card-description');
    const cardDescriptionContent = document.createElement('p');
    cardDescriptionContent.innerHTML = urlMetaData['og:description'];
    cardDescription.appendChild(cardDescriptionContent);
    cardDetails.appendChild(cardDescription);
    
    card.appendChild(cardDetails);

    // image
    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    cardImage.setAttribute('style', `background-image: url(${urlMetaData['og:image']})`);

    card.appendChild(cardImage)

    cardDiv.append(card);

    return cardDiv;
}