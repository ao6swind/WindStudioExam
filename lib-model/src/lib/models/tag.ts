/**
 * 標籤
 */
export interface Tag {
    id: number;
    /**
     * 階層
     */
    level: number;
    /**
     * 文字
     */
    text: string;
    tags: Tag[];
}