"""
Full training pipeline — mirrors the notebook flow end to end.
Run this once to train and save the GMM model + scaler.
"""
import os
import json
import pickle
import pandas as pd
from sklearn.mixture import GaussianMixture

from preprocessing.feature_engineering import engineer_features
from preprocessing.prepare_data import (
    clean_data, select_cluster_features, sanitize, scale_features, CLUSTER_FEATURES
)
from config import MODEL_PATH, SCALER_PATH, FEATURE_COLS_PATH, DATA_PATH, BASE_DIR

def train():
    print("Loading data...")
    df = pd.read_csv(DATA_PATH)

    print("Cleaning data...")
    df = clean_data(df)

    print("Engineering features...")
    df = engineer_features(df)

    print("Selecting cluster features...")
    df_cluster = select_cluster_features(df)
    df_cluster = sanitize(df_cluster)

    print("Scaling features...")
    X_scaled, scaler = scale_features(df_cluster)

    print("Training GMM (n_components=3)...")
    gmm = GaussianMixture(n_components=3, random_state=42, n_init=10)
    gmm.fit(X_scaled)

    print("Saving artifacts...")
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(gmm, f)

    with open(SCALER_PATH, "wb") as f:
        pickle.dump(scaler, f)

    with open(FEATURE_COLS_PATH, "w") as f:
        json.dump(CLUSTER_FEATURES, f)
        
    # Export cluster CSVs
    labels = gmm.predict(X_scaled)
    df_original = pd.read_csv(DATA_PATH)
    df_original = clean_data(df_original)
    df_original = engineer_features(df_original)
    df_original['GMM_Cluster'] = labels

    output_dir = os.path.join(BASE_DIR, '../data/clustering_results')
    os.makedirs(output_dir, exist_ok=True)

    for cluster_id in range(3):
        cluster_df = df_original[df_original['GMM_Cluster'] == cluster_id]
        cluster_df.to_csv(os.path.join(output_dir, f'gmm_cluster_{cluster_id}.csv'), index=False)
        print(f"Cluster {cluster_id}: {len(cluster_df)} students")

    print("Training complete. Artifacts saved.")

if __name__ == "__main__":
    train()