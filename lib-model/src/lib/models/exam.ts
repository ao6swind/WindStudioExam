import { Session } from './session';
/**
 * 測驗
 */
export interface Exam {
    id?: string;
    /**
     * 測驗名稱
     */
    title?: string;
    /**
     * 官方網站
     */
    url?: string;
    /**
     * 梯次
     */
    sessions?: Session[];
}