FROM python:3.10-alpine
# pull the offcicla base image

WORKDIR /app

# install psycopg2 depandecies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev

# install python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# copy over the project itself
COPY . .




