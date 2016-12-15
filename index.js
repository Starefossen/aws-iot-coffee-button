'use strict';

const https = require('https');
const url = require('url');

const HIPCHAT_WEBHOOK_URI = process.env.HIPCHAT_WEBHOOK_URI;

exports.handler = (event, context, callback) => {
  console.log('Received event:', event);

  // Build the post string from an object
  const post_data = JSON.stringify({
    color: 'green',
    message: 'Ny kaffe er på vei (coffee)',
    notify: false,
    message_format: 'text',
  });

  console.log('Post data:', post_data);

  // An object of options to indicate where to post to
  const post_options = url.parse(HIPCHAT_WEBHOOK_URI);
  post_options.method = 'POST';
  post_options.headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(post_data)
  };

  // Set up the request
  const post_req = https.request(post_options, function(res) {
    console.log('Response status:', res.statusCode);
    res.on('end', callback);
  });

  // Post data and exit
  post_req.write(post_data);
  post_req.end();
};

const event = {
  serialNumber: 'G030JF0564135BLQ',
  batteryVoltage: '1487mV',
  clickType: 'SINGLE'
};

const context = {};

exports.handler(event, context, () => {
  console.log('end');
});
