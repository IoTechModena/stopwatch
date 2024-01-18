#!/bin/sh

pre_push_script="#!/bin/sh

cd frontend
npm install
npm run lint
npm run build"

echo $pre_push_script > .git/hooks/pre-push


post_merge_script="#!/bin/sh

cd frontend
npm install"

echo $post_merge_script > .git/hooks/post-merge

chmod 777 .git/hooks/pre-push .git/hooks/post-merge

echo "Script installati correttamente"
