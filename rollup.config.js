import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json'

const outputDir = pkg.main.substr(0, pkg.main.indexOf('/')) || 'dist'
const bundle = pkg.main.substring(0, pkg.main.indexOf('.')).replace(`${outputDir}/`, '')
const production = !process.env.ROLLUP_WATCH

const common = {
  input: 'src/index.js',
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_module/**',
    }),
    production && terser(),
  ],
}

const outputs = [
  {
    dir: outputDir,
    entryFileNames: `${bundle}.cjs.js`,
    format: 'cjs',
    sourcemap: true,
  },
  {
    dir: outputDir,
    entryFileNames: `${bundle}.esm.js`,
    format: 'esm',
    sourcemap: true,
  },
  {
    dir: outputDir,
    entryFileNames: `${bundle}.umd.js`,
    format: 'umd',
    name: 'JsStarterKit',
    sourcemap: true,
  },
]

export default outputs.map(output => ({
  ...common,
  output,
}))
