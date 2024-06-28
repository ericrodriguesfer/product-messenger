#!/bin/bash

echo "Starting deconstruction infra to aws environment..."

echo "Starting undoing to local terraform..."
echo "Appling undo terraform declartions to local cloud..."
tflocal destroy -auto-approve

echo "Your infrastructure has been successfully shut down..."