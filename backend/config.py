import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model/artifacts/gmm_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "model/artifacts/scaler_std.pkl")
FEATURE_COLS_PATH = os.path.join(BASE_DIR, "model/artifacts/feature_columns.json")
DATA_PATH = os.path.join(BASE_DIR, "../data/student_performance.csv")
CLUSTER_OUTPUT_DIR = os.path.join(BASE_DIR, "../data/clustering_results")

CLUSTER_LABELS = {
    0: "Consistent Average Performers",
    1: "Last-Minute High Performers",
    2: "Struggling / At-Risk Students"
}

CLUSTER_DESCRIPTIONS = {
    0: "Balanced students with average performance. Invest moderate time and effort, achieving consistent but improvable results.",
    1: "Low effort but high results due to study efficiency. Strategic learners who rely on last-minute preparation.",
    2: "Actively engaged but struggling students. Above-average attendance yet below-average exam performance."
}

CLUSTER_RECOMMENDATIONS = {
    0: [
        "Introduce structured study plans to improve consistency",
        "Encourage active learning techniques (practice tests, group discussions)",
        "Provide performance feedback dashboards to track progress",
        "Offer skill-building workshops (time management, exam strategies)"
    ],
    1: [
        "Encourage continuous learning habits instead of last-minute preparation",
        "Introduce advanced or enrichment materials to challenge students",
        "Promote deep learning approaches (conceptual understanding over memorization)",
        "Engage students in peer tutoring or mentoring roles"
    ],
    2: [
        "Provide personalized academic support (tutoring, mentoring)",
        "Offer study skills training (how to learn effectively)",
        "Implement early warning systems to monitor performance decline",
        "Use adaptive learning tools tailored to student needs",
        "Provide psychological and motivational support if needed"
    ]
}