const shadowElements = new Set<HTMLElement>();

function countShadowRoots() {
  countShadowRootsOnTree(document.body);

  console.log('Total shadow roots:', shadowElements.size);
}

function countShadowRootsOnTree(node: HTMLElement | ShadowRoot) {
  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);

  while (treeWalker.nextNode()) {
    if (treeWalker.currentNode instanceof HTMLElement) {
      if (treeWalker.currentNode.shadowRoot) {
        shadowElements.add(treeWalker.currentNode);
        countShadowRootsOnTree(treeWalker.currentNode.shadowRoot);
      }
    }
  }
}
