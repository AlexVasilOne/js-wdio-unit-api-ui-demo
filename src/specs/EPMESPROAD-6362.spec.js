const FileLoadHelper = require('../helpers/fileLoadHelper');
const LoginHelper = require('../helpers/loginHelper');
const MetricsHelper = require('../helpers/metricsHelper');

describe('Verify that "Select all metrics" checkbox set/unset all others check-boxes', () => {
  //setting all checkboxes as a global vars for test suite
  let checkboxesRagas;
  let checkboxesDeepEval;

  before(async () => {
    await LoginHelper.login(browser, process.env.TOKEN_CURRENT_USER);
    await $('//button[text()="+ Upload New Dataset"]').click();
    await FileLoadHelper.loadFile('sample-file.csv');
    // navigating to the "Select Metrics" page
    await $('//button[text()="Preview File"]').click();
    await $('//button[text()="Select Metrics"]').click();
    checkboxesRagas = await $$('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//input[@type="checkbox"]');
    checkboxesDeepEval = await $$('//h4[text()="Select DeepEval Metrics"]/ancestor::div[1]//input[@type="checkbox"]');
  });

  it('should set/unset all checkboxes in RAGAS block', async () => {
    // Selecting all metrics checkboxes within RAGAS block
    const checkboxSelectAllRagas = await $('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//div[text()="Select All Metrics"]');
    checkboxSelectAllRagas.click();
    // Ragas checkboxes are set
    checkboxesRagas.forEach(async (element) => {
      await expect(element).toHaveAttribute('aria-checked', 'true');
    });
    // DEEPEVAL checkboxes are unset
    checkboxesDeepEval.forEach(async (element) => {
      await expect(element).toHaveAttribute('aria-checked', 'false');
    });
    // UNselecting all metrics checkboxes within RAGAS block
    checkboxSelectAllRagas.click();
    // Ragas checkboxes are unset
    checkboxesRagas.forEach(async (element) => {
      await expect(element).toHaveAttribute('aria-checked', 'false');
    });
    // DEEPEVAL checkboxes are still unset
    checkboxesDeepEval.forEach(async (element) => {
      await expect(element).toHaveAttribute('aria-checked', 'false');
    });
  });

  it('Verify while at least one checkbox is not set button "Start test" is not available', async () => {
    const buttonStartTest = $('//button[text()="Start Test Campaign"]');
    await expect(buttonStartTest).not.toBeEnabled();
    await $('//h4[text()="hallucination"]').click();
    await expect(buttonStartTest).toBeEnabled();
    await $('//h4[text()="hallucination"]').click();
  });

  it('should use local storage for saving users selected checkboxes', async () => {
    const metrics = await MetricsHelper.getMetrics();
    await MetricsHelper.setMetrics(metrics);
    const selectedDeepEvalMetrics = await browser.execute(() => {
      return window.localStorage.getItem('individualDeepEvalMetrics');
    });
    const selectedRagasMetrics = await browser.execute(() => {
      return window.localStorage.getItem('individualRagasMetrics');
    });
    //verify that metrics were saved in the local storage
    expect(JSON.parse(selectedDeepEvalMetrics).sort()).toEqual(['contextual_relevancy', 'faithfulness']);
    expect(JSON.parse(selectedRagasMetrics).sort()).toEqual(['answer_relevancy', 'harmfulness']);
    // reset merics
    await MetricsHelper.setMetrics(metrics);
  });
  it('should save metrics state when serfing pages back and forward', async () => {
    let metrics = await MetricsHelper.getMetrics();
    await MetricsHelper.setMetrics(metrics);
    await $('//button[text()="Back"]').click();
    await $('//button[text()="Select Metrics"]').click();
    metrics = await MetricsHelper.getMetrics();
    await MetricsHelper.validateMetrics();
    // reset metrics
    await MetricsHelper.setMetrics(metrics);
  })
});
