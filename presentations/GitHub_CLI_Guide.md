# GitHub CLI ガイド

---

## Git と GitHub の違い

### Git
- 分散型バージョン管理システム
- ローカルで動作
- 2005年にLinus Torvaldsが開発

### GitHub
- Gitリポジトリのホスティングサービス
- Web上のプラットフォーム
- コラボレーション機能

### 図解
```
[ローカルPC] ←Git→ [GitHub]
   (Git)           (サービス)
```

---

## 基本的な Git の流れ

### 3つのエリア
```
作業ディレクトリ → ステージング → リポジトリ
    (edit)          (add)         (commit)
```

### 基本コマンド
1. `git add` - 変更をステージング
2. `git commit` - 変更を記録
3. `git push` - リモートに送信
4. `git pull` - リモートから取得

---

## リモートリポジトリの概念

### origin とは？
- デフォルトのリモート名
- cloneしたリポジトリのURL
- 変更可能

### 図解：push/pull
```
[ローカル]          [GitHub]
  main     push→     main
           ←pull
```

---

## git clone の仕組み

### コマンド
```bash
git clone https://github.com/NSada2025/repo.git
```

### 何が起きるか
1. リポジトリ全体をダウンロード
2. `.git`ディレクトリ作成
3. originを自動設定
4. デフォルトブランチをチェックアウト

### 図解
```
GitHub
  ↓ clone
ローカルPC
├── .git/     (履歴)
├── README.md (ファイル)
└── src/      (ディレクトリ)
```

---

## git push の詳細

### 基本形
```bash
git push origin main
```

### 初回push
```bash
git push -u origin main
# -u: 上流ブランチを設定
```

### 図解：pushの流れ
```
1. ローカル変更
2. git add .
3. git commit -m "message"
4. git push
   ↓
GitHub に反映！
```

---

## git pull の詳細

### pullの実態
```
git pull = git fetch + git merge
```

### 図解
```
[fetch]
GitHub → ローカル(.git)
        (履歴を取得)

[merge]
.git → 作業ディレクトリ
      (ファイルを更新)
```

### コンフリクトの可能性
- 同じファイルの同じ箇所を編集
- 手動でマージが必要

---

## GitHub CLI (gh) の導入

### 通常のgit vs gh
```bash
# 通常のgit
git clone https://github.com/user/repo.git

# GitHub CLI
gh repo clone user/repo
```

### 主な利点
- 認証が簡単
- GitHub機能を直接操作
- APIアクセス不要

---

## gh の認証

### 初回セットアップ
```bash
gh auth login
```

### 認証フロー
1. GitHub.com を選択
2. HTTPS を選択
3. ブラウザで認証
4. トークン自動保存

### 図解
```
gh auth login
    ↓
ブラウザ起動
    ↓
認証完了！
```

---

## gh の便利なコマンド

### リポジトリ操作
```bash
# クローン
gh repo clone NSada2025/repo

# 作成
gh repo create my-project --public

# フォーク
gh repo fork
```

### PR操作
```bash
# PR作成
gh pr create

# PR一覧
gh pr list

# PRマージ
gh pr merge
```

---

## Issue とPRの連携

### Issue作成
```bash
gh issue create --title "バグ報告"
```

### PRでIssueを参照
```bash
gh pr create --body "Fixes #123"
```

### 図解：ワークフロー
```
Issue作成 → ブランチ作成 → 作業
    ↓
PR作成 (Fixes #123)
    ↓
マージでIssue自動クローズ
```

---

## ブランチ戦略

### Git Flow
```
main
 ├── develop
 │    ├── feature/A
 │    └── feature/B
 └── hotfix
```

### GitHub Flow（シンプル）
```
main
 ├── feature/A
 ├── feature/B
 └── bugfix/C
```

### コマンド例
```bash
# ブランチ作成＆切り替え
git checkout -b feature/new-feature

# プッシュ
git push -u origin feature/new-feature
```

---

## コンフリクトの解決

### 発生条件
- 同じファイルの同じ行を編集
- マージ時に自動解決不可

### 解決手順
1. `git pull`でコンフリクト検出
2. ファイルを手動編集
3. `git add`で解決をマーク
4. `git commit`で完了

### 図解
```
<<<<<<< HEAD
あなたの変更
=======
他の人の変更
>>>>>>> branch-name
```

---

## 実践：Discord Bot開発

### 初期設定
```bash
# リポジトリ作成
gh repo create discord-bot --public

# クローン
gh repo clone NSada2025/discord-bot

# 初期コミット
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 開発フロー
```bash
# 機能開発
git checkout -b feature/slash-commands
# ... 開発 ...
git add .
git commit -m "Add slash commands"
gh pr create
```

---

## ベストプラクティス

### 1. コミットメッセージ
```
良い例：
- Add user authentication
- Fix memory leak in bot.py
- Update Discord.js to v14

悪い例：
- Fixed stuff
- asdf
- WIP
```

### 2. .gitignore
```
.env
node_modules/
*.log
__pycache__/
```

### 3. ブランチ名
```
feature/user-auth
bugfix/memory-leak
hotfix/security-patch
```

---

## セキュリティ注意事項

### 絶対にpushしない
- パスワード
- APIキー
- トークン
- 個人情報

### もし間違えたら
1. 即座にトークンを無効化
2. git履歴から削除
3. force pushが必要

### 予防策
- .gitignore活用
- 環境変数使用
- git-secretsツール

---

## トラブルシューティング

### Permission denied
```bash
# SSH鍵の設定
ssh-keygen -t ed25519
gh ssh-key add
```

### Large files
```bash
# Git LFS使用
git lfs track "*.zip"
git add .gitattributes
```

### 間違ったコミット
```bash
# 直前のコミット修正
git commit --amend

# 歴史改変（注意！）
git reset --hard HEAD~1
```

---

## まとめ

### Git/GitHubの重要性
- 📝 バージョン管理
- 👥 チーム開発
- 🔄 CI/CD連携
- 📊 プロジェクト管理

### 学習の順序
1. Git基本コマンド習得
2. GitHub機能の理解
3. gh CLI導入
4. 自動化への応用

---

## 参考リソース

### 公式ドキュメント
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [GitHub CLI Manual](https://cli.github.com/manual/)

### 学習サイト
- Pro Git（無料電子書籍）
- GitHub Skills
- Atlassian Git Tutorial

### 作成者
- NSada2025
- 2025年7月作成