#!/bin/bash

echo "Starting push infra to aws environment..."

echo "Initing setup to local terraform..."
tflocal init

echo "Appling terraform declartions to local cloud..."
tflocal apply -var-file="local.tfvars" -auto-approve

echo "Your infrastrucuture is successfully standing..."