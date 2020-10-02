module.exports = (content, length, delim, appendix) => {
  if (content.length <= length) return content;

  let trimmedContent = content.substr(0, length + delim.length);

  const lastDelimIndex = trimmedContent.lastIndexOf(delim);

  if (lastDelimIndex >= 0)
    trimmedContent = trimmedContent.substr(0, lastDelimIndex);

  if (trimmedContent) trimmedContent += appendix;

  return trimmedContent;
};
