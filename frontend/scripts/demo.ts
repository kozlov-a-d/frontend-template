import Benchmarks from '../core/utils/benchmark';
Benchmarks.enable();
Benchmarks.start('All Script');

import './common';
import '../blocks/header/header';
import '../blocks/footer/footer';
import '../blocks/demo-colors/demo-colors';
import '../blocks/demo-text/demo-text';
import '../blocks/demo-text-invert/demo-text-invert'; 
import '../blocks/demo-buttons/demo-buttons';

Benchmarks.end('All Script');
Benchmarks.info();
