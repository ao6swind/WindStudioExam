import { Question } from './question';
/**
 * 題目
 */
export interface QuestionSet {
    id?: string;
    /**
     * 來源
     */
    source?: string;
    /**
     * 網址
     */
    url?: string;
    /**
     * 分類標籤
     */
    tags?: string[];
    /**
     * 題組前文
     */
    content?: string;
    /**
     * 子題集合
     */
    questions?: Question[];
}