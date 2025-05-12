#!/bin/bash

set -e

echo "HomeKube: install started"

# 1. Install Docker
echo "[+] Installing Docker..."
curl -fsSL https://get.docker.com | sh

# 2. Install k3s (with supported Docker)
echo "[+] Checking k3s..."
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--docker" sh -

# 3. Checking status
echo "[+] Checking installing..."
kubectl get nodes

# 4. Install Traefik (built in k3s by deafault)
echo "[+] Traefik installed by deafault (k3s)"

# 5. Deploy backend + frontend
echo "[+] Deploy HomeKube..."
kubectl apply -f ./deployments/backend.yaml
kubectl apply -f ./deployments/frontend.yaml

echo "[✓] HomeKube has been successfully installed!"