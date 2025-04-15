import { chmod } from 'fs/promises'
import { platform } from 'os'
import { join } from 'path'

async function setupPlatform() {
    const currentPlatform = platform()
    const isUnixLike = currentPlatform === 'linux' || currentPlatform === 'darwin'
    
    if (isUnixLike) {
        try {
            // Make compile.sh executable
            await chmod('compile.sh', 0o755)
            console.log('Set executable permissions for compile.sh')
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error('Error setting permissions:', error)
            }
        }
    }
}

setupPlatform().catch(error => {
    console.error('Setup error:', error)
    process.exit(1)
}); 