// クライアントコンポーネントからも使う、作品の種類の定義（fs を使わないこと）

/** 作品の種類。content/works/<slug>/index.md の category に書く値 */
export const CATEGORIES = ["GAME", "WEB", "DEVICE", "WORKSHOP"] as const;
export type Category = (typeof CATEGORIES)[number];
