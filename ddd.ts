import https from 'https';
import http from 'http';
import fs from 'fs';
//const axios = require('axios');
//import {Send} from 'express-serve-static-core';


const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  ca: fs.readFileSync('ca.pem')
};


import { Send } from 'express-serve-static-core';
import Express from 'express';


export interface TransactionTargetResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}

/*type TransactionTargetResponse {
  chainId: string;
  method: "eth_sendTransaction";
  attribution?: boolean;
  params: [];
}*/

var app = Express();
app.use(Express.static('public'));
app.use(Express.json());

app.get('/',async(req,res)=>{ 
  res.send(`<!DOCTYPE html><html><head>
    <title>Glo Dollar Donation Frame</title>
    <meta property="og:image" content="https://glodollar.cryptocheckout.co/intro.png" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://glodollar.cryptocheckout.co/intro.png" />
    <meta property="fc:frame:button:1" content="Yes" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:button:1:post_url" content="https://glodollar.cryptocheckout.co/poll" />
    <meta property="fc:frame:button:1:target" content="https://glodollar.cryptocheckout.co/poll" />
    <meta property="fc:frame:button:2" content="No" />
    <meta property="fc:frame:button:2:action" content="post" />
    <meta property="fc:frame:button:2:post_url" content="https://glodollar.cryptocheckout.co/outro" />
    <meta property="fc:frame:button:2:target" content="https://glodollar.cryptocheckout.co/outro" />
    </head></html>`);
});
app.post('/',async(req,res)=>{ 

  res.send(`<!DOCTYPE html><html><head>
    <title>Glo Dollar Donation Frame</title>
    <meta property="og:image" content="https://glodollar.cryptocheckout.co/intro.png" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://glodollar.cryptocheckout.co/intro.png" />
    <meta property="fc:frame:button:1" content="Yes" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:button:1:post_url" content="https://glodollar.cryptocheckout.co/poll" />
    <meta property="fc:frame:button:2" content="No" />
    <meta property="fc:frame:button:2:action" content="post" />
    <meta property="fc:frame:button:2:post_url" content="https://glodollar.cryptocheckout.co/outro" />
    </head></html>`);
});
app.post('/outro',async(req,res)=>{

  res.send(`<!DOCTYPE html><html><head>
    <title>Glo Dollar Donation Frame</title>
    <meta property="og:image" content="https://glodollar.cryptocheckout.co/outro.png" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://glodollar.cryptocheckout.co/outro.png" />
    <meta property="fc:frame:post_url" content="https://glodollar.cryptocheckout.co" />
    <meta property="fc:frame:button:1" content="Restart" />
    <meta property="fc:frame:button:1:action" content="post" />
    </head></html>`);
});
app.post('/poll',async(req,res)=>{ 

  res.send(`<!DOCTYPE html><html><head>
    <title>Glo Dollar Donation Frame</title>
    <meta property="og:image" content="https://glodollar.cryptocheckout.co/select.png" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://glodollar.cryptocheckout.co/select.png" />
    <meta property="fc:frame:button:1" content="💸 Give Directly" />
    <meta property="fc:frame:button:1:action" content="tx" />
    <meta property="fc:frame:button:1:target" content="https://glodollar.cryptocheckout.co/get_tx_data" />
    <meta property="fc:frame:button:1:post_url" content="https://glodollar.cryptocheckout.co/tx_callback" />
    <meta property="fc:frame:button:2" content="🌳 Giving Green" />
    <meta property="fc:frame:button:2:action" content="tx" />
    <meta property="fc:frame:button:2:target" content="https://glodollar.cryptocheckout.co/get_tx_data" />
    <meta property="fc:frame:button:2:post_url" content="https://glodollar.cryptocheckout.co/tx_callback" />
    <meta property="fc:frame:button:3" content="🐹 Animal Charity Evaluators" />
    <meta property="fc:frame:button:3:action" content="tx" />
    <meta property="fc:frame:button:3:target" content="https://glodollar.cryptocheckout.co/get_tx_data" />
    <meta property="fc:frame:button:3:post_url" content="https://glodollar.cryptocheckout.co/tx_callback" />
    <meta property="fc:frame:button:4" content="✌️ UNHCR" />
    <meta property="fc:frame:button:4:action" content="tx" />
    <meta property="fc:frame:button:4:target" content="https://glodollar.cryptocheckout.co/get_tx_data" />
    <meta property="fc:frame:button:4:post_url" content="https://glodollar.cryptocheckout.co/tx_callback" />
    <meta property="fc:frame:input:text" content="Please enter amount in USDGLO" />
    
    </head></html>`);
});

app.post('/get_tx_data',async(req,res:TransactionTargetResponse<{chainId: string;
  method: "eth_sendTransaction";
  attribution?: boolean;
  params: [];}>)=>{ 

  console.log(req.body);
  res.status(200).json({ chainId: "eip155:10",
    method: "eth_sendTransaction",
    params: {
      abi: [], // JSON ABI of the function selector and any errors
      to: "0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D",
      data: "0x783a112b0000000000000000000000000000000000000000000000000000000000000e250000000000000000000000000000000000000000000000000000000000000001",
      value: "984316556204476",
    } });  //if(req.body.untrustedData.buttonIndex !== '' && parseFloat(req.body.untrustedData.inputText) > 0 ){
    //res.set('Content-Type','application/json');
      /*res.send(JSON.stringify(type TransactionTargetResponse {
        chainId: "eip155:10",
        method: "eth_sendTransaction",
        params: {
          abi: [], // JSON ABI of the function selector and any errors
          to: "0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D",
          data: "0x783a112b0000000000000000000000000000000000000000000000000000000000000e250000000000000000000000000000000000000000000000000000000000000001",
          value: "984316556204476",
        },
      }))*/
  //}  
});
app.post('/tx_callback',async(req,res)=>{ 
  console.log(req.body);
  res.send(`<!DOCTYPE html><html><head>
    <title>Glo Dollar Donation Frame</title>
    <meta property="og:image" content="https://glodollar.cryptocheckout.co/select.png" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://glodollar.cryptocheckout.co/select.png" />
    <meta property="fc:frame:button:1" content="Yes" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:button:1:post_url" content="https://glodollar.cryptocheckout.co/poll" />
    <meta property="fc:frame:button:2" content="No" />
    <meta property="fc:frame:button:2:action" content="post" />
    <meta property="fc:frame:button:2:post_url" content="https://glodollar.cryptocheckout.co/outro" />
    </head></html>`);
});
https.createServer( options, app).listen(443); 
//http.createServer(app).listen(80);