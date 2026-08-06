export function updateSeoMeta({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url?: string;
}) {
  document.title = title;

  const setMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, attributeValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setMetaTag('meta[name="description"]', 'name', 'description', description);
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  if (url) {
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
  }
}
