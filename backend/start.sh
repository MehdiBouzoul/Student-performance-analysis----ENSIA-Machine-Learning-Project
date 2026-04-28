#!/bin/bash
python -m model.train
uvicorn app:app --host 0.0.0.0 --port $PORT