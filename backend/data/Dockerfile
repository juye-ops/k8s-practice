FROM python:3

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /root

COPY . .

RUN pip install -r requirements.txt

CMD [ "python3", "app.py"]