import { Option } from './options';
/**
 * 子題
 */
export interface Question {
    id?: number;
    content: string;
    options: Option[];
    comment: string;
}