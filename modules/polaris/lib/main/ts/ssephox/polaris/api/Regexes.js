/*
  The RegEx parses the following components (https://www.rfc-editor.org/rfc/rfc3986.txt):

    scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]

          foo://example.com:8042/over/there?name=ferret#nose
          \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
        scheme     authority       path        query   fragment

  Originally from:
    http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without-the

  Modified to:
  - include port numbers
  - allow full stops in email addresses
  - allow [-.~*+=!&;:'%@?^${}(),\/\w] after the #
  - allow [-.~*+=!&;:'%@?^${}(),\/\w] after the ?
  - move allow -_.~*+=!&;:'%@?^${}() in email usernames to the first @ match (TBIO-4809)
  - enforce domains to be [A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)* so they can't end in a period (TBIO-4809)
  - removed a bunch of escaping, made every group non-capturing (during TBIO-4809)
  - colons are only valid when followed directly by // or some text and then @ (TBIO-4867)
  - only include the fragment '#' if it has 1 or more trailing matches
  - only include the query '?' if it has 1 or more trailing matches
  - allow commas in URL path
  - exclude trailing comma and period in URL path
  - allow up to 15 character schemes including all valid characters from the spec https://url.spec.whatwg.org/#url-scheme-string (TINY-5074)
  - changed instances of 0-9 to be \d (TINY-5074)
  - reduced duplication (TINY-5074)
  - allow [*!;:'@$] in the path segment as they are valid characters per the spec: https://url.spec.whatwg.org/#url-path-segment-string (TINY-8069)

(?:
  (?:
    [A-Za-z][A-Za-z\d.+-]{0,14}:\/\/(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?
    | www\.
    | [-;:&=+$,.\w]+@
  )
  [A-Za-z\d-]+
  (?:\.[A-Za-z\d-]+)*
)
(?::\d+)?
(?:
  \/
  (?:
     [-.~*+=!;:'%@$(),\/\w]*[-~*+=%@$()\/\w]
   )?
)?
(?:
  \?
  (?:
    [-.~*+=!&;:'%@?^${}(),\/\w]+
  )
)?
(?:
  #
  (?:
    [-.~*+=!&;:'%@?^${}(),\/\w]+
  )
)?
*/
const link = () => 
// eslint-disable-next-line max-len
/(?:[A-Za-z][A-Za-z\d.+-]{0,14}:\/\/(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?|www\.|[-;:&=+$,.\w]+@)[A-Za-z\d-]+(?:\.[A-Za-z\d-]+)*(?::\d+)?(?:\/(?:[-.~*+=!;:'%@$(),\/\w]*[-~*+=%@$()\/\w])?)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?/g;
const autolink = () => {
    /*
     * Takes the link regex, and makes two additions:
     *
     * - allows punctuation at the end (so it can be used for TBIO autolink macro)
     * - wraps the link regex in a group so that match[1] returns the desired contents
     *
     * We may need to inline the link regex if this refactoring technique causes
     * performance issues; we're assuming browsers can optimise the above regex
     * but not this style.
     * TBIO calls this method every time space or enter is pressed.
     */
    const linksource = link().source;
    return new RegExp('(' + linksource + ')[-.~*+=!&;:\'%@?#^${}(),]*', 'g');
};
const tokens = (value, parameters) => value.replace(/\{(\d+)\}/g, (match, contents) => {
    const index = parseInt(contents, 10);
    if (parameters[index] === undefined) {
        throw new Error('No value for token: ' + match + ' in translation: ' + value);
    }
    return parameters[index];
});
export { tokens, link, autolink };
//# sourceMappingURL=Regexes.js.map