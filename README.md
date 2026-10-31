# bh-previews
Private, noindex previews for Benchmark Heaven releases (encrypted bundle, same server as explainer-pages).
Pages live under /p/<unguessable-slug>/. `node pack.js pages bundle.enc` with the key from ~/.config/bh-previews/bundle.key.

## Artifact identifiers

`artifacts.manifest.json` maps stable UI sections to IDs allocated by the artifact registry.
The muted `a#` badges copy their identifier by click, Enter or Space. Local badge code
uses no external requests and preserves the existing access controls and content policy.
`server.js` stamps decrypted HTML responses and serves only the two local badge
assets alongside each private page. Encrypted bundles and unguessable page links are
unchanged. Content-Length and byte ranges use the stamped representation.
