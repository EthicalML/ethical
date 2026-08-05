export type SurveySectionId =
  'ml-context' | 'platforms-tools' | 'organisation-operations' | 'respondent-profile';

export interface SurveyOptionAggregate {
  label: string;
  count: number;
  share: number;
}

export interface SurveyQuestionAggregate {
  id: string;
  number: number;
  section: SurveySectionId;
  label: string;
  multiChoice: boolean;
  responseCount: number;
  options: SurveyOptionAggregate[];
}

export interface SurveyReportData {
  responseRows: number;
  questions: SurveyQuestionAggregate[];
}

interface QuestionDefinition {
  id: string;
  section: SurveySectionId;
  source: string;
  label?: string;
  multiChoice?: boolean;
}

// Merge only unambiguous spelling, casing, punctuation, or accepted-abbreviation variants of the same tool.
// Keys are alphabetised so every cleanup remains easy to audit.
export const SURVEY_RESPONSE_ALIASES: Readonly<Record<string, string>> = {
  'AWS lambda': 'AWS Lambda',
  'Azure ai search': 'Azure AI Search',
  'azure ai search': 'Azure AI Search',
  'Azure managed online endpoints': 'Azure Managed Online Endpoints',
  'Azure ml': 'Azure ML',
  'Azure ML pipelines': 'Azure ML Pipelines',
  Catboost: 'CatBoost',
  clearml: 'ClearML',
  databricks: 'Databricks',
  'Databricks workflows': 'Databricks Workflows',
  ElasticSearch: 'Elasticsearch',
  Faiss: 'FAISS',
  'Github actions': 'GitHub Actions',
  Langchain: 'LangChain',
  langchain: 'LangChain',
  LGBM: 'LightGBM',
  Lightgbm: 'LightGBM',
  lightgbm: 'LightGBM',
  MLFlow: 'MLflow',
  Opensearch: 'OpenSearch',
  Pgvector: 'pgvector',
  PGVector: 'pgvector',
  Postgresql: 'PostgreSQL',
  Sklearn: 'scikit-learn',
  triton: 'Triton',
  'Triton inference server': 'Triton Inference Server',
};

const QUESTION_DEFINITIONS: readonly QuestionDefinition[] = [
  {
    id: 'primary-ml-library',
    section: 'ml-context',
    source: 'Which machine library do you use the most?',
  },
  {
    id: 'modalities',
    section: 'ml-context',
    source: 'Which areas or modality of machine learning / science does your team work on?',
    multiChoice: true,
  },
  {
    id: 'use-cases',
    section: 'ml-context',
    source: 'Which use-cases does your team use machine learning for?',
    multiChoice: true,
  },
  {
    id: 'time-to-production',
    section: 'ml-context',
    source:
      'How long does it take your team to productionise a model (including data ingestion, etc)?',
  },
  {
    id: 'cloud-platform',
    section: 'ml-context',
    source: 'Which cloud platform do you use the most?',
  },
  {
    id: 'production-challenges',
    section: 'ml-context',
    source:
      'Select the top 3 biggest challenges that you face when productionising your machine learning models',
    multiChoice: true,
  },
  {
    id: 'experiment-tracking',
    section: 'platforms-tools',
    source:
      "For Model Registry and/or Experiment tracking, what tool do you use the most? Skip this question if you don't use any.",
    label: 'For model registry and/or experiment tracking, what tool do you use the most?',
  },
  {
    id: 'feature-store',
    section: 'platforms-tools',
    source:
      "For Feature Store, what tool do you use the most? Skip this question if you don't use any.",
    label: 'For feature stores, what tool do you use the most?',
  },
  {
    id: 'vector-database',
    section: 'platforms-tools',
    source:
      "For Vector Database, what tool do you use the most? Skip this question if you don't use any.",
    label: 'For vector databases, what tool do you use the most?',
  },
  {
    id: 'workflow-orchestrator',
    section: 'platforms-tools',
    source:
      "For ETL / Workflow Orchestrator, what tool do you use the most? Skip this question if you don't use any.",
    label: 'For ETL and workflow orchestration, what tool do you use the most?',
  },
  {
    id: 'training-platform',
    section: 'platforms-tools',
    source:
      "For Model Training and Experimentation Platform, what tool do you use the most? Skip this question if you don't use any.",
    label: 'For model training and experimentation, what platform do you use the most?',
  },
  {
    id: 'real-time-serving',
    section: 'platforms-tools',
    source:
      "For Real Time Model Serving, what tool do you use the most? Skip this question if you don't use any.",
    label: 'For real-time model serving, what tool do you use the most?',
  },
  {
    id: 'model-monitoring',
    section: 'platforms-tools',
    source:
      "For Model Monitoring, what tool do you use the most? Skip this question if you don't use any.",
    label: 'For model monitoring, what tool do you use the most?',
  },
  {
    id: 'central-data-platform',
    section: 'platforms-tools',
    source:
      "For Central Data Platform / Data Lake, what tool do you use the most? Skip this question if you don't use any.",
    label: 'For a central data platform or data lake, what tool do you use the most?',
  },
  {
    id: 'managed-foundation-model',
    section: 'platforms-tools',
    source:
      "For Managed Foundation Model / LLM Api Services, what tool do you use the most? Skip this question if you don't use any.",
    label: 'For managed foundation model or LLM API services, what tool do you use the most?',
  },
  {
    id: 'industry',
    section: 'organisation-operations',
    source: 'Which industry are you in?',
  },
  {
    id: 'organisation-size',
    section: 'organisation-operations',
    source: 'How large is your organisation?',
  },
  {
    id: 'models-in-production',
    section: 'organisation-operations',
    source:
      "How models does your organisation have in production? This can be a guesstimate and doesn't have to be an accurate number.",
    label: 'How many models does your organisation have in production?',
  },
  {
    id: 'models-planned',
    section: 'organisation-operations',
    source:
      "In 12 months from today, how many models does your organisation plan to have in production by then? This can be a guesstimate and doesn't have to be an accurate number.",
    label: 'In 12 months, how many models does your organisation plan to have in production?',
  },
  {
    id: 'organisation-setup',
    section: 'organisation-operations',
    source: 'Select which of the following your organisation has set up:',
    label: 'Which of the following has your organisation set up?',
    multiChoice: true,
  },
  {
    id: 'real-time-inference',
    section: 'organisation-operations',
    source: 'What approximate percentage of your models run real-time INFERENCE instead of batch?',
    label: 'What approximate percentage of your models run real-time inference instead of batch?',
  },
  {
    id: 'deployment-methods',
    section: 'organisation-operations',
    source:
      'When productionising a machine learning model, does your infrastructure enable any of the following deployment methods?',
    multiChoice: true,
  },
  {
    id: 'job-family',
    section: 'organisation-operations',
    source: 'What is the "job family" of your role?',
    label: 'What is the job family of your role?',
  },
  {
    id: 'role-level',
    section: 'respondent-profile',
    source: 'How would you describe your role?',
  },
  {
    id: 'age',
    section: 'respondent-profile',
    source: 'What is your age?',
  },
  {
    id: 'country',
    section: 'respondent-profile',
    source: 'What is your country of residence?',
  },
  {
    id: 'self-identification',
    section: 'respondent-profile',
    source: 'How do you self identify?',
  },
];

const METADATA_HEADERS = new Set([
  'Timestamp',
  'Name of your company / employer',
  'Score',
  'Email address',
  'Email Address',
]);

function parseCsv(csvText: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  const finishField = () => {
    row.push(field);
    field = '';
  };

  const finishRow = () => {
    finishField();
    if (row.length > 1 || row[0] !== '') rows.push(row);
    row = [];
  };

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];

    if (character === '"') {
      if (quoted && csvText[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (!quoted && character === ',') {
      finishField();
      continue;
    }

    if (!quoted && (character === '\n' || character === '\r')) {
      if (character === '\r' && csvText[index + 1] === '\n') index += 1;
      finishRow();
      continue;
    }

    field += character;
  }

  if (quoted) throw new Error('Survey CSV ends inside a quoted field.');
  if (field !== '' || row.length > 0) finishRow();

  return rows;
}

function splitMultiChoice(value: string): string[] {
  const options: string[] = [];
  let option = '';
  let parenthesisDepth = 0;

  for (const character of value) {
    if (character === '(') parenthesisDepth += 1;
    if (character === ')' && parenthesisDepth > 0) parenthesisDepth -= 1;

    if (character === ',' && parenthesisDepth === 0) {
      options.push(option);
      option = '';
    } else {
      option += character;
    }
  }

  options.push(option);
  return options;
}

function cleanAnswer(value: string): string {
  const cleaned = value.trim().replace(/\s+/g, ' ');
  return SURVEY_RESPONSE_ALIASES[cleaned] ?? cleaned;
}

export function buildSurveyReport(csvText: string): SurveyReportData {
  const parsedRows = parseCsv(csvText);
  if (parsedRows.length === 0) throw new Error('Survey CSV is empty.');

  const [rawHeaders, ...dataRows] = parsedRows;
  const headers = rawHeaders.map((header, index) =>
    index === 0 ? header.replace(/^\uFEFF/, '').trim() : header.trim(),
  );
  const duplicateHeaders = headers.filter((header, index) => headers.indexOf(header) !== index);
  if (duplicateHeaders.length > 0)
    throw new Error(
      `Survey CSV has duplicate headers: ${[...new Set(duplicateHeaders)].join(', ')}`,
    );

  const expectedQuestions = new Set(QUESTION_DEFINITIONS.map((question) => question.source));
  const actualQuestions = headers.filter((header) => !METADATA_HEADERS.has(header));
  const missingQuestions = [...expectedQuestions].filter(
    (question) => !actualQuestions.includes(question),
  );
  const unexpectedQuestions = actualQuestions.filter(
    (question) => !expectedQuestions.has(question),
  );

  if (missingQuestions.length > 0 || unexpectedQuestions.length > 0) {
    throw new Error(
      `Survey question headers do not match the report model. Missing: ${missingQuestions.join(' | ') || 'none'}. Unexpected: ${unexpectedQuestions.join(' | ') || 'none'}.`,
    );
  }

  const rows = dataRows.map((values, rowIndex) => {
    if (values.length !== headers.length) {
      throw new Error(
        `Survey CSV row ${rowIndex + 2} has ${values.length} fields; expected ${headers.length}.`,
      );
    }
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });

  const questions = QUESTION_DEFINITIONS.map((question, index): SurveyQuestionAggregate => {
    const answers = rows.map((row) => row[question.source].trim()).filter(Boolean);
    const counts = new Map<string, number>();

    for (const answer of answers) {
      const rawOptions = question.multiChoice ? splitMultiChoice(answer) : [answer];
      const options = new Set(rawOptions.map(cleanAnswer).filter(Boolean));
      for (const option of options) counts.set(option, (counts.get(option) ?? 0) + 1);
    }

    return {
      id: question.id,
      number: index + 1,
      section: question.section,
      label: question.label ?? question.source,
      multiChoice: question.multiChoice ?? false,
      responseCount: answers.length,
      options: [...counts.entries()]
        .map(([label, count]) => ({ label, count, share: (count / answers.length) * 100 }))
        .sort(
          (first, second) => second.count - first.count || first.label.localeCompare(second.label),
        ),
    };
  });

  return { responseRows: rows.length, questions };
}
