import { HabitPage } from './app.po';

describe('habit App', function() {
  let page: HabitPage;

  beforeEach(() => {
    page = new HabitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
