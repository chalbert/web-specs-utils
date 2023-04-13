import '@webcomponents/scoped-custom-element-registry';

export default function scenario() {
  document.body.innerHTML = `
  <a href="/">Back</a>
  `;
  const cases = [
    {
      registryCount: 2000,
      sharedElementcount: 200,
      localElementCountAverage: 5,
      isExtending: false
    },
    {
      registryCount: 500,
      sharedElementcount: 50,
      localElementCountAverage: 5,
      isExtending: false
    },
    {
      registryCount: 200,
      sharedElementcount: 20,
      localElementCountAverage: 2,
      isExtending: false
    },
    {
      registryCount: 2000,
      sharedElementcount: 200,
      localElementCountAverage: 5,
      isExtending: true
    },
    {
      registryCount: 500,
      sharedElementcount: 50,
      localElementCountAverage: 5,
      isExtending: true,
    },
    {
      registryCount: 200,
      sharedElementcount: 20,
      localElementCountAverage: 2,
      isExtending: true
    },
  ];
  
  const results: string[] = [];
  
  cases.forEach(({ registryCount, sharedElementcount, localElementCountAverage, isExtending }, caseIndex) => {
    
    const sharedElements: Record<number, typeof HTMLElement> = {};
    
    var start = window.performance.now();
    
    for (let i = 0; i < sharedElementcount; i++) {
      sharedElements[i] = class extends HTMLElement {} 
    }
  
    if (!isExtending) {
      const sharedRegistry = new CustomElementRegistry();
      for (let i = 0; i < sharedElementcount; i++) {      
        sharedRegistry.define(`s-${caseIndex}-shared-el-${i}`, sharedElements[i]);
      }
    }
    
    for (let i = 0; i < registryCount; i++) {
      const registry = new CustomElementRegistry();
      
      if (!isExtending) {
        for (let i = 0; i < sharedElementcount; i++) {
          registry.define(`s-${caseIndex}-shared-el-${i}`, sharedElements[i]);
        }
      }
  
      for (let i = 0; i < localElementCountAverage; i++) {
        registry.define(`s-${caseIndex}-local-el-${i}`, class extends HTMLElement {});
      }
    }
    
    var end = window.performance.now();
  
    results.push(`
      Case ${caseIndex + 1}
      Is extending: ${isExtending}
      Registry count: ${registryCount}
      Shared element count: ${sharedElementcount}
      Local element average count: ${localElementCountAverage}
      Runtime (ms): ${end - start}
    `)
  });
  
  const pre = document.createElement('pre');
  pre.innerHTML = results.join('\n==============\n');
  document.body.appendChild(pre)
}