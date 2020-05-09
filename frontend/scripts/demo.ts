import Benchmarks from '../core/utils/benchmark';
Benchmarks.enable();
Benchmarks.start('All Script');

import './common';
import '../blocks/header/header';
import '../blocks/footer/footer';
import '../blocks/demo/demo-colors/demo-colors';
import '../blocks/demo/demo-text/demo-text';
import '../blocks/demo/demo-text-invert/demo-text-invert'; 
import '../blocks/demo/demo-buttons/demo-buttons';

Benchmarks.end('All Script');
Benchmarks.info();
