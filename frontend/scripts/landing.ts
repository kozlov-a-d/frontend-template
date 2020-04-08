import Benchmarks from '../core/utils/benchmark';
Benchmarks.enable();
Benchmarks.start('All Script');

import './common';
import '../blocks/header-landing/header-landing';
import '../blocks/hero-usp/hero-usp';
import '../blocks/footer/footer';

Benchmarks.end('All Script');
Benchmarks.info();


