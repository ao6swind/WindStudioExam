/**
 * 選項
 */
export interface Option {
    id?: string;
    /**
     * 是否為答案
     */
    isAnswer?: boolean;
    /**
     * 選項內容
     */
    content?: string;
}