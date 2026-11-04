import type { WorkItem } from "@/lib/data";

/** 一覧や詳細に表示する種類名（data.ts の tag と対応） */
export const CATEGORY_LABEL: Record<WorkItem["tag"], string> = {
  ALL: "ALL",
  GAME: "GAME",
  WEB: "WEB",
  PRODUCT: "DEVICE",
  OTHER: "WORKSHOP",
};

/** period（"2023.7" や "2025.1 ~" など）から制作年を取り出す */
export function yearOf(period: string): string {
  return period.match(/\d{4}/)?.[0] ?? "";
}
