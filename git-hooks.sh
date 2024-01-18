#!/bin/sh

pre_push_script="#!/bin/sh\n\ncd frontend\nnpm install\nnpm run lint\nnpm run build\n"

echo $pre_push_script > .git/hooks/pre-push


post_merge_script="#!/bin/sh\n\ncd frontend\nnpm install\n"

echo $post_merge_script > .git/hooks/post-merge


chmod 777 .git/hooks/pre-push .git/hooks/post-merge

echo "Script installati correttamente"
