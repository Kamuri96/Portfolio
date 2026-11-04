# Portfolio

中村 美月のポートフォリオサイト。<https://portfolio.nyan-nyaka.workers.dev/>

- Next.js（App Router、`output: "export"` による静的書き出し）+ Tailwind CSS
- Cloudflare Workers（静的アセット + 記事取得用の小さな Worker）

## 開発

```bash
npm install
npm run dev     # 画像を生成してから開発サーバーを起動
npm run build   # 画像生成 → 静的書き出し（out/）
npm run lint
```

## ディレクトリ

| パス | 内容 |
|---|---|
| `src/lib/data.ts` | 作品・プロフィール・経歴・スキルのデータ |
| `src/lib/articles.ts` | note / Qiita / Zenn の RSS 取得・パース（ビルドと Worker で共用） |
| `worker/index.ts` | Cloudflare Worker。`/api/articles` を返し、それ以外は静的アセットへ |
| `assets/img/` | 画像の元ファイル（ここに置く） |
| `scripts/optimize-images.mjs` | `assets/img` から `public/img` に WebP を生成 |

## 画像を追加する

1. 元画像（png / jpg / gif / webp）を `assets/img/<フォルダ>/` に置く
2. コードからは拡張子を `.webp` にしたパスで参照する
   - 例: `assets/img/Foo/bar.png` → `"/img/Foo/bar.webp"`
3. `npm run dev` / `npm run build` の前に自動で変換される（長辺 1600px、品質 80）

`public/img/` は生成物なので Git 管理外。存在しない画像を参照しているとビルドが失敗する。
OGP 用の JPEG も `public/img/og/` に生成される（`src/lib/site.ts` の `ogImage`）。

## 記事一覧の更新

- ビルド時に取得した記事を初期表示し、ブラウザから `/api/articles` を取得して最新の一覧に差し替える
- Worker は RSS を最大 24 時間メモリにキャッシュする（再デプロイ不要で反映）
- フィードの追加・変更は `src/lib/articles.ts` の `FEEDS`

記事が表示されないとき:

1. フィード自体に記事があるか確認（例: `curl https://note.com/kamuri_96/rss`）
2. `/api/articles` を開き `fetchedAt` と記事を確認（503 は全フィードの取得失敗）
3. Cloudflare ダッシュボードの Observability か `npx wrangler tail` で「[articles] … の取得に失敗」を確認
4. API が正しいのに画面が古い場合は、ブラウザの開発者ツールで `/api/articles` のリクエストを確認

## デプロイ

`main` に push すると Cloudflare Workers Builds が `npm run build` → `npx wrangler deploy` を実行する。
手動でデプロイする場合は `npm run build && npm run deploy`（要 `npx wrangler login`）。
