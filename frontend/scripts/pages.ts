import Benchmarks from '../core/utils/benchmark';
Benchmarks.enable();
Benchmarks.start('All Script');

import './common';
import '../blocks/header/header';
import '../blocks/footer/footer';

Benchmarks.end('All Script');
Benchmarks.info();
