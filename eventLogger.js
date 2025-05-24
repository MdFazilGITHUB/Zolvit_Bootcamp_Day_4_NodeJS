
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('userAction', (data) => {
  const logMessage = `User performed action: ${data.action} at ${new Date().toISOString()}\n`;
  console.log(logMessage);

  const logFilePath = path.join(__dirname, 'user-actions.log');
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
});

myEmitter.emit('userAction', { action: 'login' });
myEmitter.emit('userAction', { action: 'add_to_cart', item: 'Product A' });
myEmitter.emit('userAction', { action: 'checkout' });
myEmitter.emit('userAction', { action: 'logout' });

console.log('User action events emitted. Check user-actions.log for details.');
