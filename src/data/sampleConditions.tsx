import { ConditionItem } from '../types';

export const sampleConditions: ConditionItem[] = [
  {
    title: '重要事項',
    content: (
      <div className="border border-red-200 p-4 bg-red-50 mb-6">
        <p>旅行代金は 大人1名を表示しています。（ ）内料金は子供旅行代金です。</p>
        <p>年齢区分 大人〇〇歳～、子供〇〇歳～、幼児〇〇歳～〇〇歳</p>
        <p>設定期間 2025年〇月〇〇日～2025年〇月〇〇日</p>
      </div>
    ),
  },
  // 他の項目も同様に続けて記載
];
