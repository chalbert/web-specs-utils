const customElementsSet = new Set<HTMLElement>();
const uniqueCustomElementNames = new Set<string>();

function countCustomElements() {
  countCustomElementsOnTree(document.body);

  console.log('Total custom elements:', customElementsSet.size);
  console.log('Unique custom elements:', uniqueCustomElementNames.size);
}

function countCustomElementsOnTree(node: HTMLElement | ShadowRoot) {
  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);

  while (treeWalker.nextNode()) {
    if (treeWalker.currentNode instanceof HTMLElement) {
      if (treeWalker.currentNode.localName.includes('-')) {
        customElementsSet.add(treeWalker.currentNode);
        uniqueCustomElementNames.add(treeWalker.currentNode.localName);
      }

      if (treeWalker.currentNode.shadowRoot) {
        countCustomElementsOnTree(treeWalker.currentNode.shadowRoot);
      }
    }
  }
}
