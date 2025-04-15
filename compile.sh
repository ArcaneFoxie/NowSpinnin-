#!/bin/bash

echo "Building TypeScript..."
npx tsc
if [ $? -ne 0 ]; then
    echo "TypeScript compilation failed"
    exit 1
fi

echo "Building with esbuild..."
node build.js
if [ $? -ne 0 ]; then
    echo "Build failed"
    exit 1
fi

echo "Creating single executable..."
node --experimental-sea-config sea-config.json
if [ $? -ne 0 ]; then
    echo "Sea config generation failed"
    exit 1
fi

echo "Copying executable..."
node -e "require('fs').copyFileSync(process.execPath, 'dist/NowSpinnin-')"
if [ $? -ne 0 ]; then
    echo "Executable copy failed"
    exit 1
fi

echo "Removing code signature (macOS)..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    codesign --remove-signature dist/NowSpinnin-
    if [ $? -ne 0 ]; then
        echo "Removing code signature failed"
        exit 1
    fi
fi

echo "Injecting blob..."
npx postject dist/NowSpinnin- NODE_SEA_BLOB dist/sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 --macho-segment-name NODE_SEA 
if [ $? -ne 0 ]; then
    echo "Blob injection failed"
    exit 1
fi

echo "Re-signing binary (macOS)..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    codesign --sign - dist/NowSpinnin-
    if [ $? -ne 0 ]; then
        echo "Re-signing binary failed"
        exit 1
    fi
fi

echo "Setting executable permissions..."
chmod +x dist/NowSpinnin-

echo "Build completed successfully!" 