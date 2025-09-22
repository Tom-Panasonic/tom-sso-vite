# ベースイメージ
FROM nginx:alpine

# ビルドしたファイルをNginxの公開ディレクトリにコピー
COPY dist /usr/share/nginx/html

# ポート80を公開
EXPOSE 80
