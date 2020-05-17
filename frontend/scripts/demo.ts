import Benchmarks from '../core/utils/benchmark';
// Benchmarks.enable();
Benchmarks.start('All Script');

Benchmarks.start('Common Scripts');
import './common';
Benchmarks.end('Common Scripts');

import '../blocks/header/header';
import '../blocks/footer/footer';

import '../blocks/demo/demo-colors/demo-colors';
import '../blocks/demo/demo-text/demo-text';
import '../blocks/demo/demo-text-invert/demo-text-invert'; 
import '../blocks/demo/demo-buttons/demo-buttons';

import '../blocks/demo/demo-component-spoiler/demo-component-spoiler';

Benchmarks.end('All Script');
Benchmarks.info();
