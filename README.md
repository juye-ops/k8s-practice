# k8s-practice
Kubernetes를 이용한 마이크로 서비스 아키텍처 설계

## 환경 구성(Minikube)
### 설치
[minikube start](https://minikube.sigs.k8s.io/docs/start/)

### minikube 실행
```bash
minikube start
eval $(minikube docker-env)
```

### 이미지 빌드
```bash
docker build -t k8s-frontend-main ./frontend
docker build -t k8s-backend-data ./backend/data
docker build -t k8s-backend-signup ./backend/signup
```

### k8s Ingress 구축
베어메탈 버전 ingress 설치 [Docs: k8s-nginx/Baremetal](https://kubernetes.github.io/ingress-nginx/deploy/#bare-metal-clusters)

### k8s 클러스터 구축
```bash
cd k8s
kubectl create -f namespace.yaml,ingress.yaml,frontend.yaml,input_data.yaml,signup.yaml
```

## 사전 준비
### 포트 식별
```bash
kubectl get svc -n ingress-nginx
```
```
NAME                                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             NodePort    10.107.244.35   <none>        80:31374/TCP,443:32186/TCP   2d1h
ingress-nginx-controller-admission   ClusterIP   10.102.10.158   <none>        443/TCP                      2d1h
```

### IP 식별
```bash
kubectl get ingress -n msa
```
```
NAME          CLASS   HOSTS   ADDRESS        PORTS   AGE
k8s-ingress   nginx   *       192.168.49.2   80      34m
```

## 실습
### 웹 접근
1. 브라우저에 http://192.168.49.2:80/로 접근
2. 각 form에 대해 데이터 입력
   - ID, PW는 signup service의 `FastAPI`를 거쳐 `MongoDB`에 저장
   - Name, Content는 data service의 `FastAPI`를 거쳐 `Redis`에 저장
3. 우측 상단의 call 버튼을 통해 입력한 데이터 출력

### 클러스터 일괄 제거
```bash
kubectl delete ns msa
```