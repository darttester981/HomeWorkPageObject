import { test} from '@playwright/test';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../src/pages/home.page.js';
import { MainPage } from '../src/pages/main.page.js';
import { RegisterPage } from '../src/pages/register.page.js';
import { AuthorizationPage } from '../src/pages/authorization.page.js';
import { ArticleCreatePage } from '../src/pages/articleCreate.page.js';
import { ArticleViewPage } from '../src/pages/articleView.page.js';
import { users } from '/Users/glushenkovdd/playwright/fixtures/users.js';

// Генерация рандомного юзера
const user0 = {
  email: faker.internet.email({ provider: 'qa.guru' }),
  name: faker.person.fullName(), // 'Allen Brown'
  password: faker.internet.password({ length: 10 }),
  method() {},
};

const url = 'https://realworld.qa.guru/';

test('Регистрация нового юзера', async ({ page }) => {
  const { email, name, password } = user0;

  const homePage = new HomePage(page);
  const mainPage = new MainPage(page);
  const registerPage = new RegisterPage(page);

  await mainPage.open(url);
  await mainPage.gotoRegister();
  await registerPage.register(name, email, password);

  await expect(homePage.profileName).toContainText(user0.name);
});

// Использование существующего юзера
const user1 = {
  email: 'glushenkov1994@inbox.ru',
  password: '123456',
  method() {},
};

test('Авторизация', async ({ page }) => {
  const { email, password } = user1;

  const homePage = new HomePage(page);
  const mainPage = new MainPage(page);
  const authorizationPage = new AuthorizationPage(page);

  await mainPage.open(url);
  await mainPage.gotoLogin();
  await authorizationPage.authorize(email, password);

  await expect(homePage.profileName).toContainText('Dany748');
});


// ЛОГИН ВЫНЕСТИ В ДРУГОЕ МЕСТО
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
  await homePage.checkUserName(userName);
}





test('Создание статьи', async ({ page }) => {
  const homePage = new HomePage(page);
  const articleCreatePage = new ArticleCreatePage(page);
  const articleViewPage = new ArticleViewPage(page);

  let title = faker.lorem.sentence();
  let description = faker.lorem.paragraph();
  let body = faker.lorem.paragraphs(3);
  let tags = '123';

  const user = {
    email: users.testUserEmail,
    password: users.testUserPassword,
    name: users.testUserName,
  };

  // Авторизуемся
  await login(page, url, user.email, user.password, user.name);

  // Переходим на страницу создания статьи
  await homePage.clickArticleCreateLink();

  // Заполняем поля статьи
  await articleCreatePage.createAndPublishArticle(title, description, body, tags);

  // Проверяем, что статья создана
  await articleViewPage.checkArticleIsOpenedByTitle(title);
});
