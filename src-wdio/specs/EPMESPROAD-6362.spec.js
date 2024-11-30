const checkBoxPage = require('./../po/pages/checkboxes.page');

describe('Verify check-boxes on metrics page', () => {
  before(async () => {
    await checkBoxPage.open();
    await checkBoxPage.ragasBlock.header.waitForDisplayed();
  });
  //to makee all tests independent we should reset checkboxes
  afterEach(async () => {
    await checkBoxPage.ragasBlock.header.waitForDisplayed();
    const checkboxes = await $$('label[class*="checkbox"]');
    for (const el of checkboxes) {
      const ariaChecked = await el.$('input[type="checkbox"]').getAttribute("aria-checked");
      if (ariaChecked === 'true') {
        await el.click();
      }
    };
  });

  it('should set/unset all checkboxes in RAGAS block', async () => {
    // Selecting all metrics checkboxes within RAGAS block
    await checkBoxPage.ragasBlock.btnSelectAll.click();
    // Ragas checkboxes are set
    await checkBoxPage.ragasBlock.allIputs.map((el) => expect(el).toHaveAttribute('aria-checked', 'true'));
    await checkBoxPage.deepEvalBlock.allIputs.map((el) => expect(el).toHaveAttribute('aria-checked', 'false'));
    // UNselecting all metrics checkboxes within RAGAS block
    await checkBoxPage.ragasBlock.btnSelectAll.click();
    // Ragas checkboxes are unset
    await checkBoxPage.ragasBlock.allIputs.map((el) => expect(el).toHaveAttribute('aria-checked', 'false'));
    // DEEPEVAL checkboxes are still unset
    await checkBoxPage.deepEvalBlock.allIputs.map((el) => expect(el).toHaveAttribute('aria-checked', 'false'));
  });

  it('Verify while at least one checkbox is not set button "Start test" is not available', async () => {
    await expect(checkBoxPage.button('start')).not.toBeEnabled();
    await checkBoxPage.deepEvalBlock.getCheckBoxHeader('hallucination').click();
    await expect(checkBoxPage.button('start')).toBeEnabled();
  });

  it('should use local storage for saving users selected checkboxes', async () => {
    await checkBoxPage.deepEvalBlock.getCheckBoxHeader('contextual_relevancy').click();
    await checkBoxPage.deepEvalBlock.getCheckBoxHeader('faithfulness').click();
    await checkBoxPage.ragasBlock.getCheckBoxHeader('answer_relevancy').click();
    await checkBoxPage.ragasBlock.getCheckBoxHeader('harmfulness').click();

    const selectedDeepEvalMetrics = await browser.execute(() => {
      return window.localStorage.getItem('individualDeepEvalMetrics');
    });
    const selectedRagasMetrics = await browser.execute(() => {
      return window.localStorage.getItem('individualRagasMetrics');
    });
    //verify that metrics were saved in the local storage
    expect(JSON.parse(selectedDeepEvalMetrics).sort()).toEqual(['contextual_relevancy', 'faithfulness']);
    expect(JSON.parse(selectedRagasMetrics).sort()).toEqual(['answer_relevancy', 'harmfulness']);
  });

  it('should save metrics state when serfing pages back and forward', async () => {
    await checkBoxPage.deepEvalBlock.getCheckBoxHeader('hallucination').click();
    await checkBoxPage.deepEvalBlock.getCheckBoxHeader('bias').click();
    await checkBoxPage.ragasBlock.getCheckBoxHeader('answer_similarity').click();
    await checkBoxPage.ragasBlock.getCheckBoxHeader('harmfulness').click();

    await $('//button[text()="Back"]').click();
    await $('//button[text()="Select Metrics"]').click();

    await expect(checkBoxPage.deepEvalBlock.getCheckBoxInput('hallucination')).toHaveAttribute('aria-checked', 'true');
    await expect(checkBoxPage.deepEvalBlock.getCheckBoxInput('bias')).toHaveAttribute('aria-checked', 'true');
    await expect(checkBoxPage.ragasBlock.getCheckBoxInput('answer_similarity')).toHaveAttribute('aria-checked', 'true');
    await expect(checkBoxPage.ragasBlock.getCheckBoxInput('harmfulness')).toHaveAttribute('aria-checked', 'true');
  });

  it('checkbox should change border-color when hovering', async () => {
    const checkboxes = await $$('div[class*="checkbox"]');
    for (const checkbox of checkboxes) {
      await checkbox.moveTo();
      const color = await checkbox.getCSSProperty('border-color');
      expect(color.parsed.hex).toEqual('#095ed9');
    }
  });
});
