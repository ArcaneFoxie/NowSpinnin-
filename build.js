import esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['dist/src/index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
  platform: 'node',
  target: 'node18', // or whatever you're using
  format: 'cjs',
  external: [], // if you want to exclude some modules
}).catch(() => process.exit(1));
