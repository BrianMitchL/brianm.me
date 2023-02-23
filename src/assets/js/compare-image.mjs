import { CompareImage } from 'svelte-compare-image';

/**
 *
 * @param rootElement {HTMLElement}
 * @returns CompareImage
 */
export function createImageCompare(rootElement) {
  return new CompareImage({
    target: rootElement,
    props: {
      imageLeftSrc: rootElement.dataset.imageLeftSrc,
      imageLeftAlt: rootElement.dataset.imageLeftAlt,
      imageRightSrc: rootElement.dataset.imageRightSrc,
      imageRightAlt: rootElement.dataset.imageRightAlt,
    },
  });
}
