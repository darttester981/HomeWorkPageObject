import { expect } from '@playwright/test';

export class ArticleCreatePage {
    // техническое описание страницы
    
    constructor(page) {
        this.page = page;
        this.titleInput = page.getByPlaceholder('Article Title');
        this.descriptionInput = page.getByPlaceholder("What's this article about?");
        this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
        this.tagInput = page.getByPlaceholder('Enter tags');
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    }

     // Заполнение полей при создании статьи
  
    async fillArticleFields(title, description, body, tags) {

        // Заполняем Заголовок статьи
        await this.titleInput.fill(title);
        await expect(this.titleInput).toHaveValue(title);

        // Заполняем Описание статьи
        await this.descriptionInput.fill(description);
        await expect(this.descriptionInput).toHaveValue(description);

        // Заполняем Содержание статьи
        await this.bodyInput.fill(body);
        await expect(this.bodyInput).toHaveValue(body);

        // Заполняем Тэги
        await this.tagInput.fill(tags);
        await expect(this.tagInput).toHaveValue(tags);
    }

    // Нажимаем кнопку "Publish Article"
     
    async clickPublishButton() {
        console.log('Нажимаем кнопку "Publish Article"');
        await this.publishButton.click();
    }


     // Создание и публикация новой статьи
     // Объединяет заполнение полей и публикацию статьи
    
    async createAndPublishArticle(title, description, body, tags) {
        console.log('Создаем и публикуем новую статью');
        
        // Заполняем все поля статьи
        await this.fillArticleFields(title, description, body, tags);
        
        // Публикуем статью
        await this.clickPublishButton();
        
        // Ждем загрузки страницы после публикации
        await this.page.waitForLoadState('domcontentloaded');
    }
}