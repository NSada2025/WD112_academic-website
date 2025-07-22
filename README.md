# Academic Website

研究者としての学術的アイデンティティを表現するプロフェッショナルなポートフォリオサイト

## 概要

このウェブサイトは、起業家・スタートアップ人材としての側面と分離し、純粋に研究者としてのアイデンティティを提示することを目的としています。[Academic Pages](https://academicpages.github.io/)テンプレートをベースに、ミニマルでプロフェッショナルなデザインでカスタマイズされています。

## 主な機能

### 実装済み機能
- **研究タイムライン**: インタラクティブな研究成果の可視化
- **論文リスト**: 査読付き論文・学会発表の一覧
- **CV（履歴書）**: 詳細な学術経歴
- **ペーパーグラフ**: 研究論文間の関連性をネットワークで可視化
- **ブログ**: 研究活動や学術的な考察の記録

### 今後の実装予定
- **影響を受けた論文ページ**: 研究に影響を与えた重要論文の紹介
- **研究テーマ総括**: 主要研究テーマを論文形式（イントロ、先行研究、Gap）でまとめる
- **ティーチングポートフォリオ**: 教育実績の詳細

### プレゼンテーションスライド
- **presentations/**: プレゼンテーション資料・スライド管理
  - Manus AI用のMarkdown形式スライド
  - Discord Bot Guide
  - GitHub Actions Guide  
  - GitHub CLI Guide

## 技術スタック

- **静的サイトジェネレータ**: Jekyll 4.3.2
- **テーマ**: Academic Pages (Minimal Mistakes ベース)
- **ホスティング**: GitHub Pages
- **可視化**: D3.js (ペーパーグラフ、研究タイムライン)
- **スタイリング**: SCSS with カスタムテーマ

## ローカル開発環境のセットアップ

### 必要条件
- Ruby 2.5以上
- Bundler
- Git

### インストール手順

```bash
# リポジトリのクローン
git clone [repository-url]
cd WD112_academic-website

# 依存関係のインストール
bundle install

# ローカルサーバーの起動
bundle exec jekyll serve

# ブラウザで確認
# http://localhost:4000/academic-website/
```

### ビルドコマンド

```bash
# プロダクションビルド
JEKYLL_ENV=production bundle exec jekyll build

# 開発ビルド（ドラフト含む）
bundle exec jekyll build --drafts
```

## ディレクトリ構造

```
WD112_academic-website/
├── _data/              # サイト設定・ナビゲーションデータ
├── _includes/          # 再利用可能なHTMLコンポーネント
├── _layouts/           # ページレイアウトテンプレート
├── _pages/             # 静的ページ（About、CV等）
├── _posts/             # ブログ記事
├── _publications/      # 論文情報
├── _sass/              # カスタムスタイルシート
├── _talks/             # 学会発表情報
├── _teaching/          # 教育実績
├── assets/             # 画像、CSS、JavaScript
├── files/              # ダウンロード可能なファイル
└── _config.yml         # Jekyll設定ファイル
```

## コンテンツの追加方法

### 新しい論文を追加
1. `_publications/`ディレクトリに新しいMarkdownファイルを作成
2. 以下のフロントマターを含める：

```yaml
---
title: "論文タイトル"
collection: publications
permalink: /publication/[年]-[月]-[日]-[短いタイトル]
excerpt: '論文の要約'
date: [年]-[月]-[日]
venue: 'ジャーナル名'
paperurl: 'http://論文のURL'
citation: '引用形式での記載'
---
```

### 新しいブログ記事を追加
`_posts/`ディレクトリに`YYYY-MM-DD-title.md`形式でファイルを作成

### ペーパーグラフの更新
`_pages/paper-graph.md`内のJavaScriptデータを編集してノードとエッジを追加

## カスタマイズ

### テーマカラーの変更
`_sass/_custom-variables.scss`でカラーパレットを調整：
- Blue（デフォルト）
- Zinc
- Rose
- Green
- Violet

### フォントの変更
`_sass/_custom-styles.scss`でフォントファミリーを指定

## デプロイ

GitHub Pagesへの自動デプロイが設定されています。`main`ブランチへのプッシュで自動的に更新されます。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。

## 更新履歴

- 2025年6月2日: プロジェクト再開
- 2025年6月29日: README充実化、論文紹介ページ実装予定
 
