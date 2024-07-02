export default function getUploadedNestedFiles(
  uploadedFiles,
  parentKeyName,
  isDoubleNested = false,
) {
  if (Array.isArray(uploadedFiles)) {
    const regex = isDoubleNested
      ? /([a-zA-Z0-9_-]+)(\[)+([a-zA-Z0-9_-]+)(\])(\[)+([a-zA-Z0-9_-]+)(\])?/g
      : /([a-zA-Z0-9_-]+)(\[)+([a-zA-Z0-9_-]+)(\])?/g;

    const files = uploadedFiles.reduce((filtered, file) => {
      const matches = [...file.fieldname.matchAll(regex)];

      if (matches.length) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [
          fullMatch,
          key,
          bracketStart,
          nestedKey,
          bracketEnd,
          secondBracketStart,
          nestedSecondKey,
          secondBracketEnd,
        ] = matches[0];
        //

        if (nestedKey && key === parentKeyName) {
          if (isDoubleNested) {
            filtered.push([nestedKey, nestedSecondKey, file]);
          } else {
            filtered.push([nestedKey, file]);
          }
        }

        return filtered;
      }

      return filtered;
    }, []);

    return files;
  }

  return [];
}
