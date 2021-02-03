import { Question } from './question';
/**
 * 題目
 */
export interface QuestionSet {
    id: number;
    source: string;
    tags: string[];
    questions: Question[];
}