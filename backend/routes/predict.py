"""
POST /predict
Accepts student feature values, returns cluster label + recommendations.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from model.predict import predict_student

router = APIRouter()

class StudentInput(BaseModel):
    StudyHours: float
    Attendance: float
    AssignmentCompletion: float
    ExamScore: float
    Age: int
    OnlineCourses: int
    Resources: int        # 0=Low, 1=Medium, 2=High
    Motivation: int       # 0=Low, 1=Medium, 2=High
    StressLevel: int      # 0=Low, 1=Medium, 2=High
    LearningStyle: int    # 0=Visual, 1=Auditory, 2=Kinesthetic, 3=Reading/Writing
    Gender: int           # 0=Female, 1=Male
    Internet: int         # 0=No, 1=Yes
    EduTech: int          # 0=No, 1=Yes
    Extracurricular: int  # 0=No, 1=Yes
    Discussions: int      # 0=No, 1=Yes

@router.post("/predict")
def predict(student: StudentInput):
    result = predict_student(student.dict())
    return result