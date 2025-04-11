#!/bin/sh

# コンテナ停止・削除
docker compose down

# 最新コード取得
git pull

# コンテナ再ビルド（キャッシュなし）
docker compose build --no-cache

# コンテナ起動（デタッチモード）
docker compose up -d
