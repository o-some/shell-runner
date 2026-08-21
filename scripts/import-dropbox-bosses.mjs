import fs from 'node:fs/promises';
import path from 'node:path';

const assets = [
  {
    "path": "assets/bosses/boss-01-pirat-kai.png",
    "url": "https://uc8655c0da3fc905090db784345a.dl.dropboxusercontent.com/cd/0/get/DGm40p600qdIa1BljsSNF8GJWEdaknPF7W_mdzodnbSKtn1z1AYuI1szsJklO7kZNuufaRpXd2pFFsVQ2BozoQMAwtmLPSfjVsH8J6nAF30X8yi0vr9XTNPuK8nBuRw3ehLGECIHwZzZ-34GqKxHL0l4Cvwe69wzcsk1H-9yOxBvEg/file?c_luid=88361d58"
  },
  {
    "path": "assets/bosses/boss-02-kapitaen-brax.png",
    "url": "https://uc847fb65cd13f4152eb7cc59225.dl.dropboxusercontent.com/cd/0/get/DGnLUiL0WxzFdwtFDraRyQSQnKz9IVT37N_q-PDfOkzBk-NXsTGb1q5ml8uPHzWA5QuV8VthacescWrZtT886N0A9pyWP3nmBuie7iABLQ_i51gC0iIYVg6LV46O_1vixor82RJbMV6PmEY1FpimEmEiRrbrr78YHh1QWM8vC2A1zg/file?c_luid=88361d58"
  },
  {
    "path": "assets/bosses/boss-03-blackfinn.png",
    "url": "https://uca185fb991d59db6a295db59fd5.dl.dropboxusercontent.com/cd/0/get/DGnD6qquzlDyyM53hes7If5tffpFvKUOzs3X0675hdFVEg2JKdPEwQ6I0p3HOrAwCLRzt085qNr5xjoodht1gPsZLABqTE6oqJaFEuKwwIXGhaZTqHYvQXtdWZtrAd8p-O27djVOjPo1gpURDDIc3KJs8_UD_RupLLwPeaB7ebWbfQ/file?c_luid=88361d58"
  },
  {
    "path": "assets/bosses/boss-04-alt-kapitaen-roderick.png",
    "url": "https://uc037eee05b138b5637fd2ba06bd.dl.dropboxusercontent.com/cd/0/get/DGlpeUgkwzBi4un8E-UALgI-jYM3oojrZE0fptZZBnu7xZofxodmSLHFRt-POsVR4sxAhNGY5K2nm1e7g9e7bbHpzrySeb_VPseu9_xfAWgdmWvhZY1J4B2xog37EgtLexgpm0h-PYHr1N5YNmG2ODe61XFHqqQiG68Mww_S3ImDgA/file?c_luid=88361d58"
  },
  {
    "path": "assets/bosses/boss-05-piratenbaron-vargas.png",
    "url": "https://uc552c5dcc9188db841542813159.dl.dropboxusercontent.com/cd/0/get/DGmNM2X3V8ZV5EiN5tp_P4612mrB4CLezH-iti-l97Bt4t_uIgUhkt-zXfAc7T7nievWcwuXe5-WWWqGBLl9u9oIWPPmrCCSaR5PDDflCb1yX5uaikLaNYrwo_FCp222FJ0hHzLo92vrpH1zLucKlpPmUDYQzM1TXprqqofw56kumg/file?c_luid=88361d58"
  },
  {
    "path": "assets/bosses/boss-06-kapitaen-ironhook.png",
    "url": "https://uc1640a8ece3b8b2779a7b56b314.dl.dropboxusercontent.com/cd/0/get/DGlet3iFJhkxn91wx3Vhzx9QFseY5xNpxNKpY4sdjSIjmJ-pRGiD-yhm17w-vHm2YyMdTGpBz9XAXrK2p3LfxF1qLcwjvN8exEMd1SoT2lzE70vUN2GWYtZOHR9Td-P_7Bz6Da-CeRhiLHTnqVEWNe1q_Nvw0g2dXmNPyYyCHlXmyQ/file?c_luid=88361d58"
  },
  {
    "path": "assets/bosses/boss-07-admiral-thorne.png",
    "url": "https://ucaac5d25b51f8d3bd47f4cf7e28.dl.dropboxusercontent.com/cd/0/get/DGlLCpm0wH9GuQMQ3_lp0hqy5lzu5gvcBiaWcZ1QvpnIIFxDl7Lrpk7wAr795B55eTXlAr1PVYqT-8Ldpbj_J6CThgUTMiTihj9ollHzOLJohqe4qo4_H5Pbb0y4C6JJEtAxFOE72Yam1-AACUcoEYUM6Xycw0nFhc1w7TlxqeSHWA/file?c_luid=88361d58"
  },
  {
    "path": "assets/bosses/boss-08-kartenmeister-corvin.png",
    "url": "https://uca623083c58ad7a11658fd64dd0.dl.dropboxusercontent.com/cd/0/get/DGlMpCqTOFN6ZMTYzuh2CSiEpDItjQAa8EYIrRxvqUwd-Zx-pkmrmTcvcvxf3CLSoKyM_8228DN5A78GtxHCu7n5t-j_gPZLbw5Snw99xoEiugf_p6Bn_xeST4P_YkdLGL7VmOcWWE-axBuLS0Uu1UBRbb0w6M1C8X_xtMmrm5yq6g/file?c_luid=88361d58"
  },
  {
    "path": "assets/bosses/boss-09-schattenfuerst-azrak.png",
    "url": "https://ucc0797e8fd39f670a255153ad67.dl.dropboxusercontent.com/cd/0/get/DGmFbyZ2ZzINlcTr-S7nMqI7JPmfE5TwJflk3ZMeP3mrqhwjmtpf33K6c0aMAQ_qtQ9r6d-T2QEAkkENxgWRKZt8zoifIAQC22mFl8KsRM-uMugWGJZBhrq9u7Am6RSSZ2jg759SQQCWwWrQrFnrhCv22RqdiZQiidvRmeZUyaZltQ/file?c_luid=88361d58"
  },
  {
    "path": "assets/bosses/boss-10-piratenkoenig-varkos.png",
    "url": "https://uc43ef0d3ceb375865fd7f366ffe.dl.dropboxusercontent.com/cd/0/get/DGn00gyZYEzo42quAo2t9BOw4MXPcKKcuxHNX-3m66nFMSoHVtnF--qQpvH2j3on2VePHMnqgp5OP1ZwQx6y9FhtH50xvxo95Wn-FshAIQl7YA77fFX8S5oeasQ5PXD3cTbRGhPnOhcrLKO2kvFKTPJ8XycX6IkujMZxqGHZ0p5irA/file?c_luid=88361d58"
  }
];

const pngSignature = Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]);

async function validPng(filePath) {
  try {
    const handle = await fs.open(filePath, 'r');
    const header = Buffer.alloc(8);
    await handle.read(header, 0, 8, 0);
    await handle.close();
    return header.equals(pngSignature);
  } catch {
    return false;
  }
}

await fs.mkdir('assets/bosses', { recursive: true });

for (const asset of assets) {
  if (await validPng(asset.path)) {
    console.log('Boss asset already present:', asset.path);
    continue;
  }
  const response = await fetch(asset.url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Boss asset download failed ${response.status}: ${asset.path}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 8 || !bytes.subarray(0, 8).equals(pngSignature)) {
    throw new Error(`Downloaded boss asset is not a PNG: ${asset.path}`);
  }
  await fs.mkdir(path.dirname(asset.path), { recursive: true });
  await fs.writeFile(asset.path, bytes);
  console.log('Imported Dropbox boss asset:', asset.path, bytes.length, 'bytes');
}
