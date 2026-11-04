# Portfolio

kamuri（中村 美月）のポートフォリオサイト。<https://portfolio.nyan-nyaka.workers.dev/>

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
| `content/works/<slug>/` | 作品 1 つ分（`index.md` と画像）。フォルダ名が URL（`/works/<slug>`）になる |
| `content/illustrations/` | イラストギャラリーの画像と `list.yaml`（載せる絵の一覧） |
| `content/profile.yaml` | 名前・自己紹介・経歴・スキル |
| `src/lib/content.ts` | `content/` の読み込みと書式チェック |
| `src/lib/articles.ts` | note / Qiita / Zenn の RSS 取得・パース（ビルドと Worker で共用） |
| `worker/index.ts` | Cloudflare Worker。`/api/articles` を返し、それ以外は静的アセットへ |
| `assets/img/` | 作品以外の画像（アイコンなど）の元ファイル |
| `scripts/optimize-images.mjs` | `assets/img` と `content/` の画像から `public/img` に WebP を生成 |
| `public/_redirects` | 旧 URL（`/works/w1` など）から作品名の URL への転送 |

## 作品を追加する

1. `content/works/<slug>/` を作る（slug は半角英小文字・数字・ハイフン。URL になる）
2. 画像（png / jpg / gif / webp）を同じフォルダに入れる
3. `index.md` を書く（既存の作品をコピーして書き換えるのが早い）

```md
---
title: 作品名
category: GAME          # GAME / WEB / DEVICE / WORKSHOP
date: 2025-04           # 並び順に使う開始年月（「2025」だけでも可）
period: 2025.4 ~ 5      # 表示用の期間
client: 個人制作
role: [企画, 実装]
tech: [Unity, C#]
cover: cover.png        # 一覧やトップに使う画像（同じフォルダのファイル名）
gallery:
  - src: play.png
    alt: プレイ画面
links:
  - label: unityroom
    href: https://unityroom.com/...
---

本文（概要）。空行で段落を分け、段落内の改行はそのまま表示される。
```

作品は `date` の新しい順に並ぶ。書き間違い（種類名・年月の書式・存在しない画像など）があると、
`npm run build` / `npm run dev` がファイル名と項目名を表示して止まる。

経歴やスキルは `content/profile.yaml` の一覧の末尾に追記する。

## イラストを追加する

1. 画像を `content/illustrations/` に入れる（できるだけ大きいサイズのまま）
2. `content/illustrations/list.yaml` に 1 件書き足す（上から順に表示されるので、新しいものを上に）

```yaml
- file: new.png              # このフォルダ内のファイル名
  title: 題名
  year: 2026
  category: キャラクター      # ギャラリーの絞り込みに使う
  tools: [Clip Studio Paint] # 任意
  description: ひとこと説明   # 任意
  work: all-vtuber-plan      # 関連する作品のフォルダ名（任意）
```

並べ替えは項目ごと上下を入れ替え、削除は項目と画像を消す。
一覧用（長辺 800px）と拡大表示用（長辺 2400px）の画像は自動で作られる。

## 画像について

- 元画像は `npm run dev` / `npm run build` の前に自動で WebP に変換される（長辺 1600px、品質 80）
- 作品以外の画像は `assets/img/` に置き、コードから拡張子を `.webp` にしたパスで参照する（例: `"/img/icon.webp"`）
- `public/img/` は生成物なので Git 管理外。OGP 用の JPEG も `public/img/og/` に生成される
- macOS は大文字・小文字を区別しないが、ビルド環境（Linux）は区別する。ファイル名の大文字・小文字の食い違いはビルド時に検出される

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
