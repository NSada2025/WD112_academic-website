# WD112 Academic Website Style Guide

## クラス命名規則

### 1. BEM (Block Element Modifier) を基本とする
- **Block**: コンポーネントの基本単位
- **Element**: Block内の要素 (`__`で区切る)
- **Modifier**: 状態やバリエーション (`--`で区切る)

### 2. 命名パターン

#### 既存のMinimal Mistakesクラス
そのまま維持:
- `.page__content`
- `.archive__item`
- `.author__bio`

#### 新規カスタムクラス
BEMに統一:
- `.hero` → `.hero-section`
- `.hero-section__title`
- `.hero-section__subtitle`
- `.hero-section--minimal`

#### UIコンポーネント
- `.theme-switcher`
- `.theme-switcher__toggle`
- `.theme-switcher__panel`
- `.color-picker`
- `.color-picker__option`
- `.color-picker__option--active`

### 3. 段階的移行計画

#### Phase 1: 新規追加分の統一
- 新しく追加するクラスはBEMに従う
- 既存のMinimal Mistakesクラスは変更しない

#### Phase 2: カスタムクラスの整理
- ✅ `.minimal-hero` → `.hero-section` (PR#24で完了)
- `.gradient-bg` → `.background--gradient`
- `.fade-in` → `.animation--fade-in`

#### Phase 3: JavaScriptセレクタの更新
- クラス名変更に伴うJS側の修正

## コンテンツ改善方針

### 1. 一貫性
- 日付フォーマット統一
- 見出しレベルの統一
- リンクスタイルの統一

### 2. アクセシビリティ
- 適切なalt属性
- ARIAラベル
- キーボードナビゲーション

### 3. パフォーマンス
- 画像の最適化
- 不要なアニメーションの削減
- Critical CSSの検討

## 実装優先順位

1. **高**: セマンティックでないクラス名の改善
2. **中**: コンテンツの一貫性向上
3. **低**: パフォーマンス最適化

---
作成日: 2024-07-30