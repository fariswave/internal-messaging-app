import { createDirectus, rest, staticToken } from '@directus/sdk';

// Ganti URL dengan URL Directus kamu (biasanya http://127.0.0.1:8055)
const DIRECTUS_URL = 'http://127.0.0.1:8055'; 

// Ganti dengan Static Token Admin/User yang kamu buat di Directus
const DIRECTUS_TOKEN = 'bdMKvbBZec_w0Wg6iBZhmpeYSmi74Xwn'; 

const directus = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());

export default directus;