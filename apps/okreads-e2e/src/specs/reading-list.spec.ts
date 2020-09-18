import { $, $$, browser, by, element, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
});

// setup
describe('When: I use the search feature', () => {
  it('Then: I should add books to reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const wantToReadButtons = await element.all(by.cssContainingText('span',' Want to Read '));
    wantToReadButtons[0].click();

    const count = await $('[id^="mat-badge-content-"]');
    expect(count.getText()).toBeGreaterThan(0);
  });
});

describe('When: Use the mark a book as finished feature', () => {
  it('Then: I should mark the book ad finished', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    // before finished clicked
    const messageLocator = '#finished > span';
    const labels = await $$(messageLocator);
    expect(labels[0].getText()).toEqual('Finished');

    // after finished clicked
    const finishedIcon = await $$('#finished > mat-icon');
    finishedIcon[0].click();
    const labelsWithFinishedDate = await $$(messageLocator);
    expect(labelsWithFinishedDate[0].getText()).toContain(new Date().getDate());
  });
});
