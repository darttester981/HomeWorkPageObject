import { expect } from '@playwright/test';

// Страница просмотра статьи
export class ArticleViewPage {
    constructor(page) {
        this.page = page;
        this.articleTitle = page.locator('.article-page .banner h1');
        this.articleContent = page.locator('.article-content');
        this.articleBody = page.locator('.article-content p');
        this.tagList = page.locator('.tag-list');
        this.tagItems = page.locator('.tag-list li');
    }
}
