import fs from 'node:fs/promises';
import path from 'node:path';

const assets = [
  {
    url: 'https://uc6b530f5dc4cb1adc312f5eda13.dl.dropboxusercontent.com/cd/0/get/DGmDPGML4Q0IatCRDLJidWofi7Kf_1fROT99dC36wytDIr9yaLG5xcgAkgWP0ZMlZ6AIKjuDZXiKzg73wGVmCyP715H2ADJZpVJ0-EqYRuhJbuP4gKGHkJflwaNNC6NWV1qoZDe1ReFbm9lPF31eDST2Zf4FMFTH7Ka2rLXYBJkw3w/file?c_luid=88361d58',
    dest: 'assets/characters/tula-celebrating.webp',
    minBytes: 100000
  },
  {
    url: 'https://ucb2ff18c66d76370067cdf48182.dl.dropboxusercontent.com/cd/0/get/DGk9VMKRp1hIEvnP9flvPWV370T4t4rm8KYT66b8MoZcIGmiIpndx4fE7bXatiSWe7-I43O3rvfnrjMoB-GVbWApiodshD5ZYJXkJ7LcBuLVA5XnsFbJ8E53Bj6NNy475SThDy8Oct9I5vXIA1FBrl7NInmpYunXFl5V8kMpXl3gkw/file?c_luid=88361d58',
    dest: 'assets/characters/tula-surprised.webp',
    minBytes: 100000
  }
];

for (const asset of assets) {
  await fs.mkdir(path.dirname(asset.dest), { recursive: true });
  const response = await fetch(asset.url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Tula reaction download failed ${response.status}: ${asset.dest}`);
  const data = Buffer.from(await response.arrayBuffer());
  if (data.length < asset.minBytes) throw new Error(`Tula reaction asset too small: ${asset.dest}`);
  if (data.toString('ascii', 0, 4) !== 'RIFF' || data.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error(`Invalid WEBP reaction asset: ${asset.dest}`);
  }
  await fs.writeFile(asset.dest, data);
  console.log(`Imported ${asset.dest} (${data.length} bytes)`);
}
