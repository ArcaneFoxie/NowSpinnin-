import { spawn } from 'child_process';
import { platform } from 'os';

const isWindows = platform() === 'win32';

async function compile() {
    const command = isWindows ? 'compile.bat' : 'bash';
    const args = isWindows ? [] : ['compile.sh'];
    
    const process = spawn(command, args, {
        stdio: 'inherit',
        shell: true
    });

    return new Promise((resolve, reject) => {
        process.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Compilation failed with code ${code}`));
            }
        });

        process.on('error', (err) => {
            reject(err);
        });
    });
}

compile().catch((error) => {
    console.error('Compilation error:', error);
    process.exit(1);
}); 