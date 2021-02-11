/**
 * 測驗梯次
 */
export interface Session {
    id?: number;
    /**
     * 報名開始
     */
    registStart: string;
    /**
     * 報名結束
     */
    registEnd: string;
    /**
     * 測驗日期
     */
    examDate: string;
}