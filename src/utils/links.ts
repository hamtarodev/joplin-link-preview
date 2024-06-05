/**
 * isLink - checks if the given line is a valid link syntax of Markdown
 * @param line - a line from a note
 * @returns boolean
 */
export const isLink = (line: string): boolean => {
    const linkRegex = /\[([^\]]*)\]\((https?:\/\/)[^)]+\)/gm;
    if (line === null || line === undefined || line === "") return false;
    const regexpRes = line.match(linkRegex);
    console.log(`isLink Debugging: `, line, regexpRes);
    return regexpRes != null ? regexpRes.length != 0 : false;
}

export const extractLink = (line: string) => {
    const regexpExtract = /\[([^\]]+)\]\(([^)]+)\)/;
    const regexpRes = regexpExtract.exec(line);
    console.log(`Debugging: `, regexpRes);
    return regexpRes;
}