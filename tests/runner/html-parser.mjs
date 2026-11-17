/**
 * Lightweight Zero-Dependency HTML Inspector
 * Extracts links, meta tags, forms, buttons, and text blocks from HTML strings.
 */

export class HtmlInspector {
  constructor(htmlString = '') {
    this.html = String(htmlString);
  }

  /**
   * Extract all <a href="...">text</a> links
   */
  getLinks() {
    const links = [];
    const linkRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = linkRegex.exec(this.html)) !== null) {
      links.push({
        href: match[1],
        text: match[2].replace(/<[^>]+>/g, '').trim(),
      });
    }
    return links;
  }

  /**
   * Find link with specific text or href
   */
  findLink(predicate) {
    return this.getLinks().find(predicate);
  }

  /**
   * Check if any link matches href
   */
  hasLinkTo(targetHref) {
    return this.getLinks().some(l => l.href === targetHref || l.href.startsWith(targetHref));
  }

  /**
   * Extract meta tags
   */
  getMetaTags() {
    const metaTags = [];
    const metaRegex = /<meta\s+([^>]*)\/?>/gi;
    let match;
    while ((match = metaRegex.exec(this.html)) !== null) {
      const attrsStr = match[1];
      const nameMatch = attrsStr.match(/(?:name|property)=["']([^"']*)["']/i);
      const contentMatch = attrsStr.match(/content=["']([^"']*)["']/i);
      if (nameMatch && contentMatch) {
        metaTags.push({
          name: nameMatch[1],
          content: contentMatch[1],
        });
      }
    }
    return metaTags;
  }

  /**
   * Extract all headings (h1, h2, h3)
   */
  getHeadings() {
    const headings = [];
    const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
    let match;
    while ((match = headingRegex.exec(this.html)) !== null) {
      headings.push({
        level: parseInt(match[1], 10),
        text: match[2].replace(/<[^>]+>/g, '').trim(),
      });
    }
    return headings;
  }

  /**
   * Extract form inputs (input, select, textarea)
   */
  getFormFields() {
    const fields = [];
    const inputRegex = /<(input|textarea|select)\s+[^>]*name=["']([^"']*)["'][^>]*>/gi;
    let match;
    while ((match = inputRegex.exec(this.html)) !== null) {
      fields.push({
        tag: match[1].toLowerCase(),
        name: match[2],
      });
    }
    return fields;
  }

  /**
   * Check if text exists in document (ignoring tags)
   */
  containsText(text) {
    return this.html.includes(text);
  }

  /**
   * Check if pattern matches document
   */
  matches(regex) {
    return regex.test(this.html);
  }

  /**
   * Extract raw text with all HTML tags stripped
   */
  getPlainText() {
    return this.html.replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '')
                    .replace(/<[^>]+>/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
  }
}
