import * as urlMetaData from 'url-metadata';

/**
 * isLink - checks if the given line is a valid link syntax of Markdown
 * @param line - a line from a note
 * @returns IsLinkResponse
 */
export const isLink = (line: string): IsLinkResponse => {
    const linkRegex = /\[([^\]]*)\]\((https?:\/\/)[^)]+\)/gm;
    if (line === null || line === undefined || line === "") return { isValid: false, validStrings: [] as unknown as RegExpMatchArray };
    const regexpRes = line.match(linkRegex);
    return regexpRes != null ? { isValid:  regexpRes.length != 0, validStrings: regexpRes } : { isValid: false, validStrings: regexpRes };
}

interface IsLinkResponse {
    isValid: boolean;
    validStrings: RegExpMatchArray;
}

/**
 * extractLink - gets the label and the link from a Markdown valid link
 * @param line - a line from a valid Markdown Link
 * @returns ExtractLinkResponse
 */
export const extractLink = (line: string): ExtractLinkResponse => {
    const regexpExtract = /\[([^\]]+)\]\(([^)]+)\)/;
    const regexpRes = regexpExtract.exec(line);
    return {
        label: regexpRes[1],
        link: regexpRes[2]
    };
}

interface ExtractLinkResponse {
    label: string;
    link: string;
}

export const getMetaData = async (link: string) => {
    try {
        const metaData = await urlMetaData(link);
        console.log(`Debugging getMetadata: ${link} - `, metaData);
        return metaData;
    } catch (err) {
        throw err;
    }
}