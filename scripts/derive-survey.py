#!/usr/bin/env python3
"""Derive the validated survey collection from its two source CSV files."""

import csv
import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    "y2024": ROOT / "src/data/survey-2024.csv",
    "y2025": ROOT / "src/data/survey-2025.csv",
}
OUTPUT = ROOT / "src/content/survey/questions.yaml"

QUESTIONS = {
    "frameworks": {
        "label": "Primary ML library",
        "question": "Which machine library do you use the most?",
        "multi": False,
        "answers": {
            "PyTorch / Lightning / Fast.ai": ["PyTorch/Lightning/Fast.ai"],
            "scikit-learn": ["Sklearn"],
            "XGBoost": ["XGBoost"],
            "TensorFlow": ["TensorFlow"],
            "CatBoost": ["Catboost"],
            "LightGBM": ["LightGBM", "Lightgbm", "lightgbm", "LGBM"],
        },
    },
    "modalities": {
        "label": "Modalities",
        "question": "Which areas or modality of machine learning / science does your team work on?",
        "multi": True,
        "answers": {
            "LLMs": ["LLMs"],
            "Time series / forecasting": ["Time Series / Forecasting"],
            "Tabular": ["Tabular"],
            "Text / NLP (non-LLM)": ["Text / NLP (Non-LLM)"],
            "Recommender systems": ["Recommender Systems"],
            "Image / computer vision": ["Image / Computer Vision"],
        },
    },
    "cloud": {
        "label": "Cloud platform",
        "question": "Which cloud platform do you use the most?",
        "multi": False,
        "answers": {
            "Amazon Web Services": ["Amazon Web Services"],
            "Microsoft Azure": ["Azure"],
            "Google Cloud Platform": ["Google Cloud Platform"],
            "On-premise / self-hosted": ["On-prem", "Self Hosting"],
            "Databricks": ["Databricks"],
        },
    },
    "challenges": {
        "label": "Production challenges",
        "question": "Select the top 3 biggest challenges that you face when productionising your machine learning models",
        "multi": True,
        "answers": {
            "Monitoring & observability": ["Machine learning monitoring and observability"],
            "Access to training data": ["Access to relevant data for training"],
            "Production-grade pipelines": ["Building production-grade machine learning and data pipelines"],
            "Inconsistent environments": ["Inconsistency of training and experimentation environments"],
            "Tooling gaps": ["Gaps in tooling and support for model productionisation"],
            "Business impact": ["Showcasing business impact and business value"],
        },
    },
    "tracking": {
        "label": "Experiment tracking",
        "question": "For Model Registry and/or Experiment tracking, what tool do you use the most? Skip this question if you don't use any.",
        "multi": False,
        "answers": {
            "MLflow": ["MLFlow"],
            "Custom in-house tool": ["Custom Built In-house tool"],
            "Weights & Biases": ["Weights & Biases"],
            "Spreadsheets": ["Spreadsheets"],
            "DVC": ["Data Version Control (DVC)"],
            "ClearML": ["ClearML"],
        },
    },
    "deployment": {
        "label": "Deployment methods",
        "question": "When productionising a machine learning model, does your infrastructure enable any of the following deployment methods?",
        "multi": True,
        "answers": {
            "CI/CD": ["CI/CD for continuous deployment"],
            "Development / staging / production": ["Development-Staging-Production Environments"],
            "A/B tests": ["A/B Tests for Models"],
            "Canary deployments": ["Canary Deployments"],
            "Progressive rollouts": ["Progressive Rollouts"],
        },
    },
}


def read_rows(path):
    with path.open(newline="", encoding="utf-8-sig") as source:
        return list(csv.DictReader(source))


def counts_for(rows, question):
    answered = [row[question["question"]].strip() for row in rows if row[question["question"]].strip()]
    aliases = {
        alias.casefold(): label
        for label, values in question["answers"].items()
        for alias in values
    }
    counts = Counter()
    for response in answered:
        values = response.split(",") if question["multi"] else [response]
        matched = {aliases[value.strip().casefold()] for value in values if value.strip().casefold() in aliases}
        counts.update(matched)
    return counts, len(answered)


def percentage(count, denominator):
    return round(count * 100 / denominator) if denominator else 0


def main():
    rows = {year: read_rows(path) for year, path in SOURCES.items()}
    output = {}
    for key, question in QUESTIONS.items():
        counts_2024, answered_2024 = counts_for(rows["y2024"], question)
        counts_2025, answered_2025 = counts_for(rows["y2025"], question)
        output[key] = {
            "label": question["label"],
            "meta": f"Q: {question['question'].upper()}",
            "n2024": answered_2024,
            "n2025": answered_2025,
            "rows": [
                {
                    "label": label,
                    "y2024": percentage(counts_2024[label], answered_2024),
                    "y2025": percentage(counts_2025[label], answered_2025),
                    "note": "",
                }
                for label in question["answers"]
            ],
        }
    OUTPUT.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Derived {len(output)} questions from {len(rows['y2024'])} 2024 rows and {len(rows['y2025'])} 2025 rows.")
    for question in output.values():
        print(f"- {question['label']}: n={question['n2024']} (2024), n={question['n2025']} (2025)")


if __name__ == "__main__":
    main()
