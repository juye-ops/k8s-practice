FROM python:3

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /root

COPY ./requirements.txt /root/

RUN pip install -r requirements.txt

WORKDIR /root/backend