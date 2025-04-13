@echo off
echo Building TypeScript...
call npx tsc
if errorlevel 1 (
    echo TypeScript compilation failed
    exit /b 1
)

echo Building with esbuild...
node build.js
if errorlevel 1 (
    echo Build failed
    exit /b 1
)

echo Creating single executable...
node --experimental-sea-config sea-config.json
if errorlevel 1 (
    echo Sea config generation failed
    exit /b 1
)

echo Copying executable...
node -e "require('fs').copyFileSync(process.execPath, 'dist/NowSpinnin-.exe')"
if errorlevel 1 (
    echo Executable copy failed
    exit /b 1
)

echo Injecting blob...
npx postject dist/NowSpinnin-.exe NODE_SEA_BLOB dist/sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
if errorlevel 1 (
    echo Blob injection failed
    exit /b 1
)

echo Build completed successfully! 