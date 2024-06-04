/**
 * isLink - checks if the given line is a valid link syntax of Markdown
 * @param line - a line from a note
 * @returns boolean
 */
export const isLink = (line: string): boolean => {
    if (line === null || line === undefined || line === "") return false;

    const linkRegex = /\[([^\]]*)\]\((https?:\/\/)[^)]+\)/gm;
    const regexpRes = line.match(linkRegex);
    console.log(`Debugging ${line}`, regexpRes);
    return regexpRes != null ? regexpRes.length != 0 : false;
}