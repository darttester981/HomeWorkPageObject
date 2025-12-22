export class TagPage {
  constructor(page) {
    this.page = page;
    this.reclameTag = page.getByRole('button', { name: 'реклама' });
  }

  async firstTagClick() {
    await this.reclameTag.click();
  }
}