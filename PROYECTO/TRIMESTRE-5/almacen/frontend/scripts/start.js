const net = require('net');
const { spawn } = require('child_process');

const port = 3000;

const startReact = () => {
  const reactScripts = require.resolve('react-scripts/scripts/start.js');
  const child = spawn(process.execPath, [reactScripts], {
    env: { ...process.env, PORT: String(port) },
    stdio: 'inherit',
  });

  child.on('exit', (code, signal) => {
    process.exit(code ?? (signal ? 1 : 0));
  });
};

const waitForExistingServer = () => {
  console.log(`El frontend ya está ejecutándose en http://localhost:${port}`);
  setInterval(() => {
    const check = net.createConnection({ host: '127.0.0.1', port });
    check.once('connect', () => check.destroy());
    check.once('error', () => {
      check.destroy();
      process.exit(0);
    });
  }, 1000);
};

const probe = net.createConnection({ host: '127.0.0.1', port });

probe.once('connect', () => {
  probe.destroy();
  waitForExistingServer();
});

probe.once('error', () => {
  probe.destroy();
  startReact();
});