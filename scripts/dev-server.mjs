import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rawArgs = process.argv.slice(2);
let port = process.env.PORT || '3000';
let hostname = process.env.HOSTNAME || '0.0.0.0';
const passthroughArgs = [];

for (let i = 0; i < rawArgs.length; i += 1) {
  const arg = rawArgs[i];
  if (arg === '--port' || arg === '-p') {
    if (rawArgs[i + 1]) {
      port = rawArgs[i + 1];
      i += 1;
    }
  } else if (arg.startsWith('--port=')) {
    port = arg.slice('--port='.length) || port;
  } else if (arg === '--host' || arg === '--hostname' || arg === '-H') {
    if (rawArgs[i + 1]) {
      hostname = rawArgs[i + 1];
      i += 1;
    }
  } else if (arg.startsWith('--host=')) {
    hostname = arg.slice('--host='.length) || hostname;
  } else if (arg.startsWith('--hostname=')) {
    hostname = arg.slice('--hostname='.length) || hostname;
  } else if (arg === '--') {
    continue;
  } else {
    passthroughArgs.push(arg);
  }
}

const lockFile = path.resolve(process.cwd(), '.next', 'dev', 'lock');
try {
  if (fs.existsSync(lockFile)) {
    fs.unlinkSync(lockFile);
  }
} catch {
  // ignore lock cleanup errors
}

const nextBin = path.resolve(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next');
const child = spawn(
  process.execPath,
  [nextBin, 'dev', '-p', String(port), '-H', String(hostname), ...passthroughArgs],
  {
    stdio: 'inherit',
    env: process.env,
  }
);

const forwardSignal = (signal) => {
  if (!child.killed) {
    child.kill(signal);
  }
};

process.on('SIGINT', () => forwardSignal('SIGINT'));
process.on('SIGTERM', () => forwardSignal('SIGTERM'));

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
