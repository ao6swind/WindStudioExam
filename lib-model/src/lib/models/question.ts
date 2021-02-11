import { Option } from './option';
import { QuestionType } from './../enums/question-type';
/**
 * 子題
 */
export interface Question {
    id?: number;
    /**
     * 題目類型
     */
    type: QuestionType,
    /**
     * 題幹
     */
    content?: string;
    /**
     * 選項集合
     */
    options?: Option[];
    /**
     * 註解
     */
    comment?: string;
}