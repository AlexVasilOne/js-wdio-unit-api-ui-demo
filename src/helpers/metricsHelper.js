  async function getMetrics() {
    const ragasHarmfulness = await $('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//h4[text()="harmfulness"]');
    const ragasAnswerRelevancy = await $('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//h4[text()="answer_relevancy"]');
    const deepFaithfulness = await $('//h4[text()="Select DeepEval Metrics"]/ancestor::div[1]//h4[text()="faithfulness"]');
    const deepContextualRelevancy = await $('//h4[text()="Select DeepEval Metrics"]/ancestor::div[1]//h4[text()="contextual_relevancy"]');
    return [ragasHarmfulness, ragasAnswerRelevancy, deepFaithfulness, deepContextualRelevancy];
  }
  async function setMetrics(metrics) {
    for (const element of metrics) {
      await element.click();
  }
  }
  // hardcoded should be rewrited
  async function validateMetrics() {
    const ragasHarmfulnessCheckbox = await $('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//h4[text()="harmfulness"]/ancestor::label[1]//input[@type="checkbox"]');
    await expect(ragasHarmfulnessCheckbox).toHaveAttribute('aria-checked', 'true');
    const answer_relevancyCheckbox = await $('//h4[text()="Select RAGAS Metrics"]/ancestor::div[1]//h4[text()="answer_relevancy"]/ancestor::label[1]//input[@type="checkbox"]');
    await expect(answer_relevancyCheckbox).toHaveAttribute('aria-checked', 'true');
    const deepFaithfulnessCheckbox = await $('//h4[text()="Select DeepEval Metrics"]/ancestor::div[1]//h4[text()="faithfulness"]/ancestor::label[1]//input[@type="checkbox"]');
    await expect(deepFaithfulnessCheckbox).toHaveAttribute('aria-checked', 'true');
    const deepContextualRelevancyCheckbox = await $('//h4[text()="Select DeepEval Metrics"]/ancestor::div[1]//h4[text()="contextual_relevancy"]/ancestor::label[1]//input[@type="checkbox"]');
    await expect(deepContextualRelevancyCheckbox).toHaveAttribute('aria-checked', 'true');
  }

module.exports = {
  getMetrics,
  setMetrics,
  validateMetrics
};