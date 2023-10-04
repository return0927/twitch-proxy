import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());

app.get('/usher.ttvnw.net/*', async (req, res) => {
  const URL = 'https://' + req.originalUrl.slice(1);
  const response = await fetch(URL);
  const body = await response.text();
  res.setHeader('content-type', 'application/vnd.apple.mpegurl');
  res.send(body);
});

app.get('/video-weaver.*', async (req, res) => {
  const HLSURL = 'https://' + req.path.slice(1);
  const proxyURL = `https://${req.get('host').split(':')[0]}/${btoa(HLSURL)}.m3u8`;
  res.redirect(proxyURL);
});

app.get('/video-edge-*', async (req, res) => {
  const HLSURL = 'https://' + req.path.slice(1);
  const proxyURL = `https://${req.get('host').split(':')[0]}/${btoa(HLSURL)}.ts`;
  res.redirect(proxyURL);
});

app.listen(3000);
