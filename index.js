const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const cron = require('node-cron');

// Create a new WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth() // This will save authentication data locally
});

// Generate a QR code for WhatsApp authentication
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with WhatsApp');
});

// Log when the client is authenticated and ready
client.on('ready', () => {
    console.log('WhatsApp client is ready!');

    // Schedule the message to be sent periodically (e.g., every day at 10 AM)
    cron.schedule('0 6 * * *', () => {
        sendMessage('+6280000000000', 'Hello, this is a periodic message sent using Node.js!');
    });
});

// Function to send a message to a specific number
function sendMessage(number, message) {
    const chatId = `${number.replace(/\D/g, '')}@c.us`; // WhatsApp format for sending messages
    client.sendMessage(chatId, message).then(response => {
        console.log('Message sent successfully:', response);
    }).catch(err => {
        console.error('Failed to send message:', err);
    });
}

// Start the client
client.initialize();
