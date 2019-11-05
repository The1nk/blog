./rebuild.ps1
kubectl apply -f blogDeployment.yaml
kubectl rollout status deployment/blog