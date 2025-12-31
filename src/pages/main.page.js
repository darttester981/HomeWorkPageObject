import { expect } from '@playwright/test';

export class MainPage {
  // техническое описание страницы

  constructor(page) {
    this.page = page;

    this.signupLink = page.getByRole('link', { name: 'Sign up' });

    this.loginLink = page.getByRole('link', { name: 'Login' })};

  
  // бизнесовые действия со страницей

  // переход на страницу логина
  async gotoLogin() {
    this.loginLink.click();
  }
  // переход на страницу регистрации
  async gotoRegister() {
    this.signupLink.click();
  }

  // открыть страницу 
  async open(url) {
    await this.page.goto(url);
  }
}

