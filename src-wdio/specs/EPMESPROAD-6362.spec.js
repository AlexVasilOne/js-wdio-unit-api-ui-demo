const {getMetrics, setMetrics, validateMetrics} = require('../helpers/metricsHelper');
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
    const buttonStartTest = $('//button[text()="Start Test Campaign"]');
    await expect(buttonStartTest).not.toBeEnabled();
    await $('//h4[text()="hallucination"]').click();
    await expect(buttonStartTest).toBeEnabled();
  });

  it('should use local storage for saving users selected checkboxes', async () => {
    const metrics = await getMetrics();
    await setMetrics(metrics);
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
    let metrics = await getMetrics();
    await setMetrics(metrics); 
    await $('//button[text()="Back"]').click();
    await $('//button[text()="Select Metrics"]').click();
    metrics = await getMetrics();
    await validateMetrics();
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
