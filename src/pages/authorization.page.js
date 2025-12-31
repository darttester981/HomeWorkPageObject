export class AuthorizationPage {
  // техническое описание страницы

  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signupButton = page.getByRole('button', { name: 'Login' });
  }



  // бизнесовые действия со страницей

  // логин под существующим юзером
  async login(email, password) {
    await this.emailInput.click();
    await this.emailInput.fill(email);

    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    await this.loginButton.click();
}
  
  // авторизация
  async authorize(email, password) {
    await this.emailInput.click();
    await this.emailInput.fill(email);

    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    await this.signupButton.click();
  }
}