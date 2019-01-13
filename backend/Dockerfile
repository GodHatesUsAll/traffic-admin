FROM python:3.7
ADD . /app
WORKDIR /app


RUN apt-get update
RUN apt-get install python3-dev -y

RUN pip install -r requirements.txt

ENV MYSQL_USERNAME='root' \
    MYSQL_PASSWORD='' \
    MYSQL_HOST_WIFI='192.168.0.103' \
    MYSQL_HOST='192.168.1.2' \
    MYSQL_DB='cf' \
    PYTHONUNBUFFERED=0
EXPOSE 3306

CMD ["python", "server.py"]