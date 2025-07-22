# GitHub Actions ガイド

---

## CI/CD とは？

### Continuous Integration / Continuous Deployment
- **CI**: コードの統合を自動化
- **CD**: デプロイメントを自動化

### 図解：従来 vs CI/CD
```
[従来]
開発 → 手動テスト → 手動デプロイ
  ↓ エラー多発！

[CI/CD]
開発 → 自動テスト → 自動デプロイ
  ↓ 高速・高品質！
```

---

## GitHub Actions の基本

### 特徴
- GitHubに統合されたCI/CDツール
- YAMLで記述
- 豊富なマーケットプレイス

### 料金
- パブリックリポジトリ：**無料**
- プライベートリポジトリ：月2,000分無料

---

## ワークフローの構造

### 基本構成
```yaml
name: ワークフロー名
on: トリガーイベント
jobs:
  ジョブ名:
    runs-on: 実行環境
    steps:
      - ステップ
```

### 図解
```
[Event] → [Workflow] → [Job] → [Steps]
         （YAMLファイル）
```

---

## トリガーイベント

### 主なトリガー
- `push` - コードがプッシュされた時
- `pull_request` - PRが作成された時
- `schedule` - 定期実行
- `workflow_dispatch` - 手動実行

### 例：複数トリガー
```yaml
on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '0 0 * * *'
```

---

## 実例：NSada2025のsnake.yml

### コード解説
```yaml
name: Generate Snake
on:
  schedule:
    - cron: "0 15 * * *"  # 毎日0時(JST)
  workflow_dispatch:      # 手動実行も可
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: Platane/snk@v3  # アクション使用
```

### 動作
1. 毎日自動実行
2. コントリビューショングラフ生成
3. SVGを出力ブランチに保存

---

## ジョブとステップ

### ジョブ
- 並列実行可能
- 異なる環境で実行可能
- 依存関係の設定可能

### ステップ
- 順次実行
- コマンドまたはアクション
- 環境変数の共有

### 図解
```
Job1 ━━━ Step1 → Step2 → Step3
Job2 ━━━ Step1 → Step2
（並列実行）
```

---

## よく使うアクション

### 1. Checkout
```yaml
- uses: actions/checkout@v3
```

### 2. Setup言語環境
```yaml
- uses: actions/setup-node@v3
  with:
    node-version: '18'
```

### 3. キャッシュ
```yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node
```

---

## シークレットの使用

### 設定方法
1. Settings → Secrets
2. 「New repository secret」
3. 名前と値を入力

### 使用方法
```yaml
env:
  TOKEN: ${{ secrets.DISCORD_TOKEN }}
  API_KEY: ${{ secrets.API_KEY }}
```

### ⚠️ 注意
- ログに出力されない
- PRからアクセス不可

---

## Discord Bot のCI/CD例

### ワークフロー
```yaml
name: Discord Bot Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Server
        env:
          TOKEN: ${{ secrets.DISCORD_TOKEN }}
        run: |
          # デプロイスクリプト
```

---

## マトリックスビルド

### 複数環境でテスト
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [16, 18, 20]
runs-on: ${{ matrix.os }}
```

### 図解
```
       Ubuntu  Windows
Node16   ✓      ✓
Node18   ✓      ✓
Node20   ✓      ✓
```

---

## ワークフロー最適化

### 1. 条件付き実行
```yaml
if: github.event_name == 'push'
```

### 2. 並列化
```yaml
jobs:
  test:
    # テストジョブ
  build:
    # ビルドジョブ（並列）
  deploy:
    needs: [test, build]  # 依存
```

### 3. キャッシュ活用
- 依存関係のキャッシュ
- ビルド成果物の保存

---

## デバッグテクニック

### 1. デバッグログ有効化
```yaml
env:
  ACTIONS_RUNNER_DEBUG: true
```

### 2. ステップのデバッグ
```yaml
- name: Debug
  run: |
    echo "Event: ${{ github.event_name }}"
    echo "Branch: ${{ github.ref }}"
```

### 3. 問題の切り分け
- ローカルで動作確認
- 最小構成から始める

---

## ベストプラクティス

### 1. セキュリティ
- シークレット使用
- 最小権限の原則
- 依存関係の更新

### 2. パフォーマンス
- キャッシュ活用
- 不要なトリガー削除
- ジョブの並列化

### 3. メンテナンス
- わかりやすい命名
- コメント追加
- バージョン固定

---

## まとめ

### GitHub Actionsの利点
- 🚀 自動化で開発効率UP
- 🔒 シークレット管理
- 🌍 多様な実行環境
- 💰 パブリックは無料

### 次のステップ
1. 簡単なワークフロー作成
2. 既存プロジェクトに追加
3. 複雑な自動化に挑戦

---

## 参考リソース

### 公式ドキュメント
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Workflow syntax](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Marketplace](https://github.com/marketplace?type=actions)

### 学習リソース
- GitHub Learning Lab
- YouTube tutorials
- Community forums

### 作成者
- NSada2025
- 2025年7月作成