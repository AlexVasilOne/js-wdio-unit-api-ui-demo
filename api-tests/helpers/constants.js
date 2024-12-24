const RAGAS = [
  'answer_correctness',
  'answer_similarity',
  'answer_relevancy',
  'faithfulness',
  'context_precision',
  'context_recall',
  'harmfulness',
];
const DEEP_EVAL = [
  'answer_relevancy',
  'faithfulness',
  'contextual_precision',
  'contextual_recall',
  'contextual_relevancy',
  'hallucination',
  'bias',
  'toxicity',
];

module.exports = {
  RAGAS,
  DEEP_EVAL,
};
