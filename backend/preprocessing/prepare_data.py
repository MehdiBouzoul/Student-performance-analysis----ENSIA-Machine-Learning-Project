import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

CLUSTER_FEATURES = [
    # Raw continuous
    'StudyHours', 'Attendance', 'AssignmentCompletion', 'ExamScore',
    'Age', 'OnlineCourses',
    # Raw ordinal
    'Resources', 'Motivation', 'StressLevel',
    # Raw binary
    'Gender', 'Internet', 'EduTech', 'Extracurricular', 'Discussions',
    # Nominal (encoded)
    'LearningStyle',
    # Engineered
    'EngagementScore', 'AcademicEffort', 'PerformanceGap',
    'StudyEfficiency', 'WellbeingIndex', 'DigitalScore',
    'MotivationXResources', 'AttendanceXStudy', 'ExamXEngagement',
]

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Removes duplicates and flags unrealistic combinations (Section 2)."""
    df = df.drop_duplicates().reset_index(drop=True)

    df['flag_unrealistic'] = (
        ((df['ExamScore'] >= 90) & (df['StudyHours'] < 8)) |
        ((df['AssignmentCompletion'] >= 95) & (df['Attendance'] <= 65)) |
        ((df['FinalGrade'] == 0) & (df['ExamScore'] < 70))
    ).astype(int)

    return df

def select_cluster_features(df: pd.DataFrame) -> pd.DataFrame:
    """Selects only the features used for clustering (Section 5.1)."""
    return df[CLUSTER_FEATURES].copy()

def sanitize(df: pd.DataFrame) -> pd.DataFrame:
    """Handles inf/NaN values (Section 5.2)."""
    df = df.replace([np.inf, -np.inf], np.nan)
    df = df.fillna(df.median())
    return df

def scale_features(df: pd.DataFrame, scaler: StandardScaler = None):
    """
    Applies StandardScaler (Section 5.3).
    If scaler is None, fits a new one (training).
    If scaler is provided, uses it (inference).
    Returns (scaled_array, scaler)
    """
    if scaler is None:
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(df)
    else:
        X_scaled = scaler.transform(df)
    return X_scaled, scaler