import Express from 'express';
import https from 'https';
import fs from 'fs';
import { Send, Query } from 'express-serve-static-core';
import { ethers } from "ethers";
import {encodeFunctionData, erc20Abi} from "viem"; 


const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    ca: fs.readFileSync('ca.pem')
};



let app: Express.Application | undefined = undefined;
const PORT = 443;




export interface TransactionTargetResponse <ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}



// *************************************************
// Setup Express
// *************************************************

app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('public'));
app.use(Express.json());
app.get('/glodollar',async(req,res)=>{ 
    res.send(`<!DOCTYPE html><html><head>
      <title>Glo Dollar Donation Frame</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/glodollar-intro.png" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/glodollar-intro.png" />
      <meta property="fc:frame:button:1" content="Yes" />
      <meta property="fc:frame:button:1:action" content="post" />
      <meta property="fc:frame:button:1:post_url" content="https://frames.cryptocheckout.co/glodollar/poll" />
      <meta property="fc:frame:button:1:target" content="https://frames.cryptocheckout.co/glodollar/poll" />
      <meta property="fc:frame:button:2" content="No" />
      <meta property="fc:frame:button:2:action" content="post" />
      <meta property="fc:frame:button:2:post_url" content="https://frames.cryptocheckout.co/glodollar/outro" />
      <meta property="fc:frame:button:2:target" content="https://frames.cryptocheckout.co/glodollar/outro" />
      </head></html>`);
  });
  app.post('/glodollar',async(req,res)=>{ 
  
    res.send(`<!DOCTYPE html><html><head>
      <title>Glo Dollar Donation Frame</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/glodollar-intro.png" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/glodollar-intro.png" />
      <meta property="fc:frame:button:1" content="Yes" />
      <meta property="fc:frame:button:1:action" content="post" />
      <meta property="fc:frame:button:1:post_url" content="https://frames.cryptocheckout.co/glodollar/poll" />
      <meta property="fc:frame:button:2" content="No" />
      <meta property="fc:frame:button:2:action" content="post" />
      <meta property="fc:frame:button:2:post_url" content="https://frames.cryptocheckout.co/glodollar/outro" />
      </head></html>`);
  });
  app.post('/glodollar/outro',async(req,res)=>{
  
    res.send(`<!DOCTYPE html><html><head>
      <title>Glo Dollar Donation Frame</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/glodollar-outro.png" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/glodollar-outro.png" />
      <meta property="fc:frame:post_url" content="https://frames.cryptocheckout.co" />
      <meta property="fc:frame:button:1" content="Restart" />
      <meta property="fc:frame:button:1:action" content="post" />
      </head></html>`);
  });
  app.post('/glodollar/poll',async(req,res)=>{ 
  
    res.send(`<!DOCTYPE html><html><head>
      <title>Glo Dollar Donation Frame</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/glodollar-select.png" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/glodollar-select.png" />
      <meta property="fc:frame:button:1" content="💸 Give Directly" />
      <meta property="fc:frame:button:1:action" content="tx" />
      <meta property="fc:frame:button:1:target" content="https://frames.cryptocheckout.co/glodollar/get_tx_data" />
      <meta property="fc:frame:button:1:post_url" content="https://frames.cryptocheckout.co/glodollar/tx_callback" />
      <meta property="fc:frame:button:2" content="🌳 Giving Green" />
      <meta property="fc:frame:button:2:action" content="tx" />
      <meta property="fc:frame:button:2:target" content="https://frames.cryptocheckout.co/glodollar/get_tx_data" />
      <meta property="fc:frame:button:2:post_url" content="https://frames.cryptocheckout.co/glodollar/tx_callback" />
      <meta property="fc:frame:button:3" content="🐹 Animal Charity Evaluators" />
      <meta property="fc:frame:button:3:action" content="tx" />
      <meta property="fc:frame:button:3:target" content="https://frames.cryptocheckout.co/glodollar/get_tx_data" />
      <meta property="fc:frame:button:3:post_url" content="https://frames.cryptocheckout.co/glodollar/tx_callback" />
      <meta property="fc:frame:button:4" content="✌️ UNHCR" />
      <meta property="fc:frame:button:4:action" content="tx" />
      <meta property="fc:frame:button:4:target" content="https://frames.cryptocheckout.co/glodollar/get_tx_data" />
      <meta property="fc:frame:button:4:post_url" content="https://frames.cryptocheckout.co/glodollar/tx_callback" />
      <meta property="fc:frame:input:text" content="Please enter amount in USDGLO" />
      
      </head></html>`);
  });
  
 
  app.post('/glodollar/tx_callback',async(req,res)=>{ 
    console.log(req.body);
    res.send(`<!DOCTYPE html><html><head>
      <title>Glo Dollar Donation Frame</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/glodollar-share.png" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/glodollar-share.png" />
      <meta property="fc:frame:button:1" content="Share" />
      <meta property="fc:frame:button:1:action" content="link" />
      <meta property="fc:frame:button:1:post_url" content="https://warpcast.com/~/compose?text=Hello%20world!" />
      <meta property="fc:frame:button:2" content="Mint" />
      <meta property="fc:frame:button:2:action" content="mint" />
      <meta property="fc:frame:button:2:target" content="eip155:8453:0xf5a3b6dee033ae5025e4332695931cadeb7f4d2b:1" />
      </head></html>`);
  });
  import { Abi, Hex} from 'viem';
  type EthSendTransactionParams = {
    abi: Abi | [];
    to: Hex;
    value?: string;
    data?: Hex;
    gasPrice?: Number;
    maxPriorityFeePerGas?: Number
  }  
app.post('/glodollar/get_tx_data',async function (_req: Express.Request, res: TransactionTargetResponse <{chainId: string;
    method: "eth_sendTransaction";
    attribution?: boolean;
    params: EthSendTransactionParams 
  }>) {
     console.log(_req.body);
    const network = "optimism";
    const USDGLO_ADDRESS = "0x4F604735c1cF31399C6E711D5962b2B3E0225AD3";
    const provider = ethers.getDefaultProvider(network, { alchemy: "BdptFAC-8nMGC0SjwY38mJ9A_b-A7Enj"});
    const ERC20ABI = require('./ERC20ABI.json');
      /*const USDGLO = new ethers.Contract(USDGLO_ADDRESS, ERC20ABI, provider);
      const USDGLO_TX = USDGLO.connect(provider).transfer("0x7380A42137D16a0E7684578d8b3d32e1fbD021B5",100);*/
    const tx_calldata = encodeFunctionData({
      abi: ERC20ABI,
      functionName: "transfer",
      args: ["0xaa6659efc2165d8ff121c616d9f1039ec1781f12", _req.body.untrustedData.inputText],
    });
      //console.log(USDGLO);
console.log(tx_calldata);
    res.status(200).json({ chainId: "eip155:10",
        method: "eth_sendTransaction",
        params: {
          abi: erc20Abi,
          to: "0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D",
          value: "0",
          data: tx_calldata,
          gasPrice: 60792669,
          maxPriorityFeePerGas: 10261173218615
        } });

});


// *************************************************
// Add 404 handler
// *************************************************

app.use(function (_req: Express.Request, res: Express.Response) {
    res.status(404).send("Not found");
});

// *************************************************
// Start server
// *************************************************

https.createServer(options, app).listen(PORT, () => console.log(`Webserver running at http://localhost:${PORT}/`));

