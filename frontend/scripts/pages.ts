import Benchmarks from '../core/utils/benchmark';
Benchmarks.enable();
Benchmarks.start('All Script');

import './common';
import '../blocks/header/header';
import '../blocks/footer/footer';

import '../blocks/services/services-item/services-item';
import '../blocks/services/services-list/services-list';

Benchmarks.end('All Script');
Benchmarks.info();
