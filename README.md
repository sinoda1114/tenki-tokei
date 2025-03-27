# Tokei2 Maked 

## 概要
時計ウィジェットアプリケーション

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# テストの実行
npm test
```

## デプロイ
このプロジェクトはCloudflare Pagesにデプロイされます。
mainブランチへのプッシュで自動的にデプロイが開始されます。

## 環境変数
- 開発環境: `.env.development`
- 本番環境: `.env.production`

## ディレクトリ構造
- `/config` - 設定ファイル
- `/main` - メインアプリケーション
- `/src` - ソースコード
- `/tests` - テストファイル
- `/scripts` - ユーティリティスクリプト 
