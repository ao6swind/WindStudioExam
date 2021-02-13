import { LinkIcon } from './../enums/link-icon';
/**
 * 連結
 */
export interface Link {
    id?: string;
    /**
     * 名稱
     */
    title?: string;
    /**
     * 網址
     */
    url?: string;
    /**
     * 圖示
     */
    icon?: LinkIcon;
}