import pandas as pd
import numpy as np

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Applies all feature engineering from Section 4 of the notebook.
    Input:  raw student dataframe (original 12 columns)
    Output: dataframe with all engineered features added
    """
    df = df.copy()

    # --- Composite Score Features (Section 4.1) ---
    df['EngagementScore'] = (
        df['Attendance'] * 0.4 +
        df['AssignmentCompletion'] * 0.4 +
        df['Discussions'] * 10 +
        df['Extracurricular'] * 10
    )

    df['AcademicEffort'] = df['StudyHours'] + df['OnlineCourses'] * 0.5

    df['PerformanceGap'] = df['ExamScore'] - df['AssignmentCompletion']

    df['StudyEfficiency'] = df['ExamScore'] / df['StudyHours']

    df['WellbeingIndex'] = df['Resources'] + df['Motivation'] - df['StressLevel']

    df['DigitalScore'] = df['Internet'] + df['EduTech'] + df['OnlineCourses'] * 0.1

    # --- Interaction Features (Section 4.3) ---
    df['MotivationXResources'] = df['Motivation'] * df['Resources']
    df['AttendanceXStudy'] = (df['Attendance'] / 100) * df['StudyHours']
    df['ExamXEngagement'] = df['ExamScore'] * (df['EngagementScore'] / df['EngagementScore'].max())

    return df