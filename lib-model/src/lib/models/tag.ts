/**
 * 分類標籤
 */
export interface Tag {
    id?: string;
    /**
     * 階層
     */
    level?: number;
    /**
     * 文字
     */
    text?: string;
    /**
     * 子分類標籤集合
     */
    tags?: Tag[];
}