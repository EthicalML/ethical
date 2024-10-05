
# Add title description
find . -path "./_*" -prune -o -name "*.html"  -exec perl -i -0777 -pe 's/<!DOCTYPE(.*|\n)*<html>/---\ntitle: The Institute for Ethical AI & Machine Learning\ndescription: The Institute for Ethical AI & Machine Learning is a Europe-based research centre that brings togethers technologists, academics and policy-makers to develop industry frameworks that support the responsible development, design and operation of machine learning systems.\n---\n<html>/g' {} +

# Replace header
find . -path "./_*" -prune -o -name "*.html"  -exec perl -i -0777 -pe 's/<title>(.*|\n)*itemprop="image.*>/{% include header.html %}/g' {} +

# Remove scripts from header
find . -path "./_*" -prune -o -name "*.html"  -exec perl -i -0777 -pe 's/<script(.*|\n)*main.js"><\/script>//g' {} +


