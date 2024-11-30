const loadFile = require('../helpers/fileLoadHelper');
const login = require('../helpers/loginHelper');
const {getMetrics, setMetrics, validateMetrics} = require('../helpers/metricsHelper');
const welcomePage = require('./../po/pages/welcome.page');

describe('Verify check-boxes on metrics page', () => {
  //setting all checkboxes as a global vars for test suite
  let checkboxesRagas;
  let checkboxesDeepEval;

  before(async () => {
    await welcomePage.open();
    await login(browser, process.env.TOKEN_CURRENT_USER);
    await welcomePage.btnUploadNewDataset.click();
    await loadFile('sample-file.csv');
    // navigating to the "Select Metrics" page
    await $('//button[text()="Preview File"]').click();
    await $('//button[text()="Select Metrics"]').click();
    await $('//section//h4[text()="Select RAGAS Metrics"]').waitForDisplayed();
    checkboxesRagas = await $$('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//input[@type="checkbox"]');
    checkboxesDeepEval = await $$('//h4[text()="Select DeepEval Metrics"]/ancestor::div[1]//input[@type="checkbox"]');
  });
  //to makee all tests independent we should reset checkboxes
  afterEach(async () => {
    await $('//section//h4[text()="Select RAGAS Metrics"]').waitForDisplayed();
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
    const checkboxSelectAllRagas = await $('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//div[text()="Select All Metrics"]');
    checkboxSelectAllRagas.click();
    // Ragas checkboxes are set
    await checkboxesRagas.map((el) => expect(el).toHaveAttribute('aria-checked', 'true'));
    await checkboxesDeepEval.map((el) => expect(el).toHaveAttribute('aria-checked', 'false'));
    // UNselecting all metrics checkboxes within RAGAS block
    checkboxSelectAllRagas.click();
    // Ragas checkboxes are unset
    await checkboxesRagas.map((el) => expect(el).toHaveAttribute('aria-checked', 'false'));
    // DEEPEVAL checkboxes are still unset
    await checkboxesDeepEval.map((el) => expect(el).toHaveAttribute('aria-checked', 'false'));
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
