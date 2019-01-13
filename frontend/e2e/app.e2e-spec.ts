import { LessonPage } from './app.po';

describe('lesson App', function() {
  let page: LessonPage;

  beforeEach(() => {
    page = new LessonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
