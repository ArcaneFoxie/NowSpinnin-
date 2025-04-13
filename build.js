import esbuild from 'esbuild'

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['src/index.ts'],  // Changed to directly use TypeScript source
      bundle: true,
      outfile: 'dist/bundle.js',
      platform: 'node',
      target: 'node18',
      format: 'cjs',
      external: [],
      sourcemap: true,
      minify: true,
      treeShaking: true,
    })
    console.log('Build completed successfully!')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

build()
