FROM python:3.11-slim

WORKDIR /app

COPY Source/BE/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY Source/BE .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
