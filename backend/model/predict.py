"""
Loads saved GMM model + scaler and predicts the cluster for a new student.
"""
import pickle
import json
import numpy as np
import pandas as pd

from config import MODEL_PATH, SCALER_PATH, FEATURE_COLS_PATH, CLUSTER_LABELS, CLUSTER_DESCRIPTIONS, CLUSTER_RECOMMENDATIONS
from preprocessing.feature_engineering import engineer_features
from preprocessing.prepare_data import select_cluster_features, sanitize, scale_features

def load_artifacts():
    with open(MODEL_PATH, "rb") as f:
        gmm = pickle.load(f)
    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)
    with open(FEATURE_COLS_PATH) as f:
        feature_cols = json.load(f)
    return gmm, scaler, feature_cols

def predict_student(student_data: dict) -> dict:
    """
    Takes a dict of raw student input (original 12 features),
    runs the full pipeline, returns cluster prediction + metadata.
    """
    gmm, scaler, feature_cols = load_artifacts()

    df = pd.DataFrame([student_data])

    df = engineer_features(df)
    df_cluster = select_cluster_features(df)
    df_cluster = sanitize(df_cluster)

    X_scaled, _ = scale_features(df_cluster, scaler=scaler)

    cluster_id = int(gmm.predict(X_scaled)[0])
    probabilities = gmm.predict_proba(X_scaled)[0].tolist()

    return {
        "cluster_id": cluster_id,
        "cluster_label": CLUSTER_LABELS[cluster_id],
        "cluster_description": CLUSTER_DESCRIPTIONS[cluster_id],
        "recommendations": CLUSTER_RECOMMENDATIONS[cluster_id],
        "probabilities": {
            CLUSTER_LABELS[i]: round(p, 4) for i, p in enumerate(probabilities)
        }
    }