"""
GET /clusters        — Returns summary of all 3 clusters (labels + descriptions + recommendations)
GET /clusters/{id}   — Returns detail for a specific cluster
"""
from fastapi import APIRouter
from config import CLUSTER_LABELS, CLUSTER_DESCRIPTIONS, CLUSTER_RECOMMENDATIONS

router = APIRouter()

@router.get("/clusters")
def get_clusters():
    return [
        {
            "cluster_id": cid,
            "label": CLUSTER_LABELS[cid],
            "description": CLUSTER_DESCRIPTIONS[cid],
            "recommendations": CLUSTER_RECOMMENDATIONS[cid]
        }
        for cid in sorted(CLUSTER_LABELS.keys())
    ]

@router.get("/clusters/{cluster_id}")
def get_cluster(cluster_id: int):
    return {
        "cluster_id": cluster_id,
        "label": CLUSTER_LABELS[cluster_id],
        "description": CLUSTER_DESCRIPTIONS[cluster_id],
        "recommendations": CLUSTER_RECOMMENDATIONS[cluster_id]
    }