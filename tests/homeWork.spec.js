import { test } from '@playwright/test';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/home.page.js';
import { MainPage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/main.page.js';
import { RegisterPage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/register.page.js';
import { AuthorizationPage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/authorization.page.js';
import { ArticleCreatePage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/articleCreate.page.js';
import { ArticleViewPage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/articleView.page.js';
import { TagPage } from '../src/pages/tag.page';


/*
// Генерация рандомного юзера
const user = {
  email: faker.internet.email({ provider: 'qa.guru' }),
  name: faker.person.fullName(), // 'Allen Brown'
  password: faker.internet.password({ length: 10 }),
  method() {},
};
*/

const baseUrl = 'https://realworld.qa.guru/';

// Логин отдельной функцией
async function login(page, baseUrl, email, password, userName) {
  const mainPage = new MainPage(page);
  const authorizationPage = new AuthorizationPage(page);
  const homePage = new HomePage(page);

  // Открываем главную страницу
  await mainPage.open(baseUrl);
  // Переходим на страницу авторизации
  await mainPage.gotoLogin();
  // Аутентифицируемся
  await authorizationPage.authorize(email, password);
  // Проверяем, что пользователь авторизован
  await homePage.getProfileNameLocator(userName);
}

test.describe('5 тестов', () => {

test('1.Проверка имени авторизованного юзера', async ({ page }) => {
  const homePage = new HomePage(page);
  const mainPage = new MainPage(page);

  await login(page, baseUrl, 'glushenkov1994@inbox.ru', '123456', 'Dany748')
  await expect(homePage.profileName).toContainText('Dany748');
});

 test('2.Фильтрация статей по тегу', async ({ page }) => {
    const mainPage = new MainPage(page);
    const tagPage = new TagPage(page);

    await login(page, baseUrl, 'glushenkov1994@inbox.ru', '123456', 'Dany748')
    await tagPage.firstTagClick();

    await expect(page.getByRole('button', { name: ' реклама' })).toBeVisible();
    });


test('3.Создание статьи', async ({ page }) => {
  const homePage = new HomePage(page);
  const mainPage = new MainPage(page)
  const articleCreatePage = new ArticleCreatePage(page);
  const articleViewPage = new ArticleViewPage(page);

  // переменные для создания статьи
  let title = faker.lorem.sentence();
  let description = faker.lorem.paragraph();
  let body = faker.lorem.paragraphs(3);
  let tags = '123';

  // Логин
  await login(page, baseUrl, 'glushenkov1994@inbox.ru', '123456', 'Dany748')
  // Переходим на страницу создания статьи
  await homePage.clickArticleCreateLink();
  // Заполняем поля статьи
  await articleCreatePage.createAndPublishArticle(title, description, body, tags);
  // Клик по кнопке создания статьи
  await homePage.clickArticleCreateLink()
  // Проверяем, что статья создана
  await expect(articleViewPage.articleTitle).toBeVisible();
  await expect(articleViewPage.articleTitle).toHaveText(title);
    });


});