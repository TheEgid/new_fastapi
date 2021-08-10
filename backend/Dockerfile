FROM python:3.9.6-buster

RUN apt-get update

RUN apt-get install -qy \
    apt-utils \
    python3-pip \
    wget python3-psycopg2

ENV PYTHONUNBUFFERED 1

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-`dpkg --print-architecture`-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-`dpkg --print-architecture`-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-`dpkg --print-architecture`-$DOCKERIZE_VERSION.tar.gz

RUN mkdir -p /opt/services/backend
WORKDIR /opt/services/backend

COPY ./requirements.txt /opt/services/backend

RUN pip install -r requirements.txt

COPY . /opt/services/backend

EXPOSE 80

CMD ["gunicorn", "-c", "gunicorn_conf.conf", "--bind", "0.0.0.0:80", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app"]
