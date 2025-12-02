import { expect } from '@playwright/test';

export class HomePage {
  // техническое описание страницы

  constructor(page) {
    this.page = page;
    //todo нейминг и селектор
    this.profileName = page.locator('.dropdown-toggle');
    this.articleCreateLink = page.getByRole('link', { name: 'New Article' }); // объявляем локатор
  }

  // бизнесовые действия со страницей

  getProfileNameLocator() {
    return this.profileName;
  }

  async checkUserName(userName) {
    console.log('Проверяем имя авторизованного пользователя');
    await expect(this.getProfileNameLocator()).toContainText(userName);
  }

  async clickArticleCreateLink() {
    console.log('Кликаем по ссылке "New Article"');
    await expect(this.articleCreateLink).toBeVisible(); // ожидаем видимость локатора
    await this.articleCreateLink.click();               // кликаем по локатору
    await this.page.waitForLoadState('domcontentloaded');
  }
}
