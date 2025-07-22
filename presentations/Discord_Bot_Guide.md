# Discord Bot ガイド

---

## Discord Bot とは？

### 基本概念
- **Bot** = 自動化されたDiscordユーザー
- プログラムで制御可能
- 24時間365日稼働可能

### 図解
```
[Discord Server]
    ↓
[Bot Application]
    ↓
[Your Code (Python/JS)]
```

---

## Discord Bot の3要素

### 1. アプリケーション
- Discord Developer Portalで作成
- 固有のClient ID

### 2. Botユーザー
- アプリケーション内で作成
- 「BOT」タグ付き

### 3. トークン
- 認証情報（パスワード）
- **絶対に公開禁止！**

### 重要な関係
```
1つのアプリケーション = 1つのBot = 1つのトークン
```

---

## Bot作成の流れ

### ステップ1: Developer Portal
1. https://discord.com/developers
2. 「New Application」をクリック
3. アプリケーション名を入力

### ステップ2: Botユーザー作成
1. 左メニュー「Bot」
2. 「Add Bot」をクリック
3. トークンをコピー

### ステップ3: 権限設定
1. 「OAuth2」→「URL Generator」
2. 必要な権限を選択
3. 招待URLを生成

---

## 現在のBotシステム構成

### 稼働中のBot一覧

| Bot名 | 機能 | 状態 |
|-------|------|------|
| Claude Code Controller | Claude連携 | ✅ オンライン |
| Schedule Manager | スケジュール管理 | ✅ オンライン |
| Agent Controller | tmux制御 | ❌ トークン競合 |

### 問題点
- 同一トークンの重複使用
- セッション競合

---

## トークン管理のベストプラクティス

### ❌ 悪い例
```python
TOKEN = "MTM5NzIy..."  # ハードコーディング
```

### ✅ 良い例
```python
TOKEN = os.getenv('DISCORD_BOT_TOKEN')
```

### 環境変数の設定
```bash
export DISCORD_BOT_TOKEN='your-token-here'
```

---

## スラッシュコマンドの実装

### Python (discord.py)
```python
@bot.tree.command(name="hello")
async def hello(interaction: discord.Interaction):
    await interaction.response.send("Hello!")
```

### JavaScript (discord.js)
```javascript
client.on('interactionCreate', async interaction => {
    if (commandName === 'hello') {
        await interaction.reply('Hello!');
    }
});
```

---

## Agent Controller Bot の特徴

### 実装済み機能
- ✅ yes/no自動応答
- ✅ tmuxセッション制御
- ✅ コマンド実行結果返信

### 主要コマンド
- `/exec` - bashコマンド実行
- `/tmux_list` - セッション一覧
- `/tmux_send` - コマンド送信
- `/status` - システム状態

---

## セキュリティ考慮事項

### 1. トークン保護
- 環境変数使用
- .gitignoreに追加
- 定期的な再生成

### 2. 権限最小化
- 必要最小限の権限のみ
- Administrator権限は慎重に

### 3. コマンド制限
- 危険なコマンドの禁止
- 実行権限の確認

---

## トラブルシューティング

### Bot がオフライン
1. トークンの確認
2. 同一トークンの重複チェック
3. ネットワーク接続確認

### コマンドが動作しない
1. 権限の確認
2. スラッシュコマンドの同期
3. エラーログの確認

### 図解：デバッグフロー
```
問題発生
  ↓
ログ確認
  ↓
権限チェック
  ↓
トークン確認
  ↓
解決！
```

---

## まとめ

### Discord Bot開発のポイント
- 📌 1Bot = 1トークン
- 🔒 セキュリティ第一
- 📝 適切なログ記録
- 🚀 段階的な機能追加

### 次のステップ
1. 独自のBotアプリケーション作成
2. 基本機能の実装
3. エラーハンドリング追加
4. 本番環境へのデプロイ

---

## 参考リソース

### 公式ドキュメント
- [Discord Developer Portal](https://discord.com/developers/docs)
- [discord.py Documentation](https://discordpy.readthedocs.io/)
- [discord.js Guide](https://discordjs.guide/)

### コミュニティ
- Discord API Server
- Reddit r/discordapp
- Stack Overflow

### 作成者
- NSada2025
- 2025年7月作成