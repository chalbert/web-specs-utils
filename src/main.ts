import testScopedRegistryPerformance from './scenarios/scoped-registry-performance'

switch (document.location.pathname) {
  case '/scoped-registry-performance':
    testScopedRegistryPerformance();
    break;
}