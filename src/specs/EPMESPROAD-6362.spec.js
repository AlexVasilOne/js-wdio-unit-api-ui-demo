const path = require('path');

describe('Verify that "Select all metrics" checkbox set/unset all others check-boxes', () => {
  before(async () => {
    // navigating to the "Select Metrics" page
    const filePath = path.join(process.cwd(), 'test-data/sample-file.csv');
    await browser.url('/assure');
    await $('//button[text()="+ Upload New Dataset"]').click();
    await $('input[type="file"]').addValue(filePath);
    await $('//button[text()="Preview File"]').click();
    await $('//button[text()="Select Metrics"]').click();
  });

  it('should set/unset all checkboxes in RAGAS block', async () => {
    // Selecting all metrics checkboxes within RAGAS block
    const checkboxSelectAllRagas = await $('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//div[text()="Select All Metrics"]');
    checkboxSelectAllRagas.click();
    // Getting array of checkboxes from both DEEPEVAL and Ragas block
    const checkboxesRagas = await $$('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//input[@type="checkbox"]');
    const checkboxesDeepEval = await $$('//h4[text()="Select DeepEval Metrics"]/ancestor::div[1]//input[@type="checkbox"]');
    // Ragas checkboxes are set
    for (const elem of checkboxesRagas) {
      await expect(elem).toHaveAttribute('aria-checked', 'true');
    }
    // DEEPEVAL checkboxes are unset
    for (const elem of checkboxesDeepEval) {
      await expect(elem).toHaveAttribute('aria-checked', 'false');
    }
    // UNselecting all metrics checkboxes within RAGAS block
    checkboxSelectAllRagas.click();
    // Ragas checkboxes are unset
    for (const elem of checkboxesRagas) {
      await expect(elem).toHaveAttribute('aria-checked', 'false');
    }
    // DEEPEVAL checkboxes are still unset
    for (const elem of checkboxesDeepEval) {
      await expect(elem).toHaveAttribute('aria-checked', 'false');
    }
  });

  it('Verify while at least one checkbox is not set button "Start test" is not available', async () => {
    const buttonStartTest = $('//button[text()="Start Test Campaign"]');
    await expect(buttonStartTest).not.toBeEnabled();
    await $('//h4[text()="hallucination"]').click();
    await expect(buttonStartTest).toBeEnabled();
  });
});
