import { expect } from '@playwright/test';

export class HomePage {
  // техническое описание страницы

  constructor(page) {
    this.page = page;
    this.profileName = page.locator('.dropdown-toggle');
    this.articleCreateLink = page.locator('a', { hasText: 'New Article' });
  }

  // бизнесовые действия со страницей

  // кликаем по локатору
  async clickArticleCreateLink() {
    await this.articleCreateLink.click();               
  }

   getProfileNameLocator() {
    return this.profileName;
  }
}

